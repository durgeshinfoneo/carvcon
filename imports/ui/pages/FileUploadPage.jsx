import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Images from '../../api/files/files';

import IndividualFile from '../components/FileIndividualFile';

const debug = require('debug')('demo:file');

class FileUploadComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploading: [],
      progress: 0,
      inProgress: false,
      photos: [],
    };

    this.uploadIt = this.uploadIt.bind(this);
  }

  uploadIt(e) {
    e.preventDefault();

    const self = this;

    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      // We upload only one file, in case
      // there was multiple files selected
      const files = e.currentTarget.files;
      const total = files.length;
      const photos = [];
      for (let i = 0; i < total; i++) {
        const file = files[i];
        const uploadInstance = Images.insert(
          {
            file,
            meta: {
              locator: self.props.fileLocator,
              userId: Meteor.userId(), // Optional, used to check on server for file tampering
            },
            streams: 'dynamic',
            chunkSize: 'dynamic',
            allowWebWorkers: true, // If you see issues with uploads, change this to false
          },
          false,
        );

        // These are the event functions, don't need most of them,
        // it shows where we are in the process
        uploadInstance.on('start', function() {
          console.log('==========Starting=========');
        });

        uploadInstance.on('end', function(error, fileObj) {
          console.log('On end File Object: ', fileObj._id);
          console.log('photos: ', photos);
          if (error) {
            console.log('========upload error================', error);
          } else {
            photos.push(fileObj._id);

            console.log('===========paths==000=====', photos.length, total);
            if (photos.length === total) {
              console.log('===========paths=======', photos);
            }
          }
        });

        uploadInstance.on('uploaded', function(error, fileObj) {
          console.log('uploaded: ', fileObj.path);

          // Remove the filename from the upload box
          // self.refs.fileinput.value = '';
        });

        uploadInstance.on('error', function(error, fileObj) {
          console.log(`Error during upload: ${error}`);
        });

        uploadInstance.on('progress', function(progress, fileObj) {
          console.log(`Upload Percentage: ${progress}`);
          // Update our progress bar
          self.setState({
            progress,
          });
        });

        uploadInstance.start(); // Must manually start the upload
        // Reset our state for the next file
        // self.setState({
        //   uploading: [],
        //   progress: 0,
        //   inProgress: false,
        // });
      }
    }
  }

  // This is our progress bar, bootstrap styled
  // Remove this function if not needed
  showUploads() {
    console.log('**********************************', this.state.uploading);

    if (!_.isEmpty(this.state.uploading)) {
      return (
        <div>
          {this.state.uploading.file.name}

          <div className="progress progress-bar-default">
            <div
              style={{ width: `${this.state.progress}%` }}
              aria-valuemax="100"
              aria-valuemin="0"
              aria-valuenow={this.state.progress || 0}
              role="progressbar"
              className="progress-bar"
            >
              <span className="sr-only">{this.state.progress}% Complete (success)</span>
              <span>{this.state.progress}%</span>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    debug('Rendering FileUpload', this.props.docsReadyYet);
    console.log('=========Rendering FileUpload========', this.props);
    if (this.props.docsReadyYet) {
      const fileCursors = this.props.files;

      // Run through each file that the user has stored
      // (make sure the subscription only sends files owned by this user)
      const display = fileCursors.map((aFile, key) => {
        // console.log('A file: ', aFile.link(), aFile.get('name'))
        const link = Images.findOne({ _id: aFile._id }).link(); // The "view/download" link

        // Send out components that show details of each file
        return (
          <div key={`file${key}`}>
            <IndividualFile
              fileName={aFile.name}
              fileUrl={link}
              fileId={aFile._id}
              fileSize={aFile.size}
            />
          </div>
        );
      });

      return (
        <div>
          <div className="row">
            <div className="col-md-12">
              <p>Upload New File:</p>
              <input
                type="file"
                id="fileinput"
                multiple
                disabled={this.state.inProgress}
                ref="fileinput"
                onChange={this.uploadIt}
              />
            </div>
          </div>

          <div className="row m-t-sm m-b-sm">
            <div className="col-md-6">{this.showUploads()}</div>
            <div className="col-md-6" />
          </div>

          {display}
        </div>
      );
    }
    return <div>Loading file list</div>;
  }
}

//
// This is the HOC - included in this file just for convenience, but usually kept
// in a separate file to provide separation of concerns.
//
export default withTracker((props) => {
  const filesHandle = Meteor.subscribe('files.images.all');
  const docsReadyYet = filesHandle.ready();
  const files = Images.find({}, { sort: { name: 1 } }).fetch();

  return {
    docsReadyYet,
    files,
  };
})(FileUploadComponent);
