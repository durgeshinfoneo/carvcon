/* eslint-disable no-multi-assign, consistent-return, no-param-reassign, prefer-rest-params */
const winston = require('winston');
const fs = require('fs');
const path = require('path');
require('winston-daily-rotate-file');

const PROJECT_ROOT = path.join(__dirname, '..', '..');
const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

winston.level = 'debug';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const tsFormat = () => (new Date()).toLocaleTimeString();
const logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      colorize: true,
      handleExceptions: true,
      humanReadableUnhandledException: true,
      json: false,
      timestamp: tsFormat,
    }),
    new (winston.transports.DailyRotateFile)({
      filename: `${logDir}/-results.log`,
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      handleExceptions: true,
      humanReadableUnhandledException: true,
      level: env === 'development' ? 'verbose' : 'info',
    }),
  ],
  exceptionHandlers: [
    new (winston.transports.DailyRotateFile)({
      filename: `${logDir}/-errors.log`,
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      level: env === 'development' ? 'verbose' : 'info',
    }),
  ],
  exitOnError: false,
});

// this allows winston to handle output from express' morgan middleware
logger.stream = {
  write (message) {
    logger.info(message);
  },
};

/**
 * Parses and returns info about the call stack at the given index.
 */
function getStackInfo (stackIndex) {
  // get call stack, and analyze it
  // get all file, method, and line numbers
  const stacklist = (new Error()).stack.split('\n').slice(3);

  // stack trace format:
  // http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
  // do not remove the regex expresses to outside of this method (due to a BUG in node.js)
  const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
  const stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi;

  const s = stacklist[stackIndex] || stacklist[0];
  const sp = stackReg.exec(s) || stackReg2.exec(s);

  if (sp && sp.length === 5) {
    return {
      method: sp[1],
      relativePath: path.relative(PROJECT_ROOT, sp[2]),
      line: sp[3],
      pos: sp[4],
      file: path.basename(sp[2]),
      stack: stacklist.join('\n'),
    };
  }
}

/**
 * Attempts to add file and line number info to the given log arguments.
 */
function formatLogArguments (args) {
  args = Array.prototype.slice.call(args);

  const stackInfo = getStackInfo(1);

  if (stackInfo) {
    // get file path relative to project root
    const calleeStr = `(${stackInfo.relativePath}:${stackInfo.line})`;

    if (typeof (args[0]) === 'string') {
      args[0] = `${calleeStr} ${args[0]}`;
    } else {
      args.unshift(calleeStr);
    }
  }

  return args;
}

// A custom logger interface that wraps winston, making it easy to instrument
// code and still possible to replace winston in the future.

module.exports.debug = module.exports.log = function () {
  logger.debug(...formatLogArguments(arguments));
};

module.exports.info = function () {
  logger.info(...formatLogArguments(arguments));
};

module.exports.warn = function () {
  logger.warn(...formatLogArguments(arguments));
};

module.exports.error = function () {
  logger.error(...formatLogArguments(arguments));
};

module.exports.stream = logger.stream;
