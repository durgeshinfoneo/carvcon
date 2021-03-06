import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import templateToText from './handlebarsEmailToText';
// import templateToHTML from './handlebarsEmailToHtml';

const sendEmail = (options, { resolve, reject }) => {
  try {
    Meteor.defer(() => {
      Email.send(options);
      resolve();
    });
  } catch (exception) {
    reject(exception);
  }
};

export default ({
  text, html, template, templateVars, ...rest
}) => {
  if (text || html || template) {
    return new Promise((resolve, reject) => {
      sendEmail({
        ...rest,
        text: template ? templateToText(Assets.getText(`email-templates/${template}.txt`), (templateVars || {})) : text,
        // html: template ? templateToHTML(Assets.getText(`email-templates/${template}.html`), (templateVars || {})) : html,
      }, { resolve, reject });
    });
  }
  throw new Error('Please pass an HTML string, text, or template name to compile for your message\'s body.');
};
