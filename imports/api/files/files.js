import { FilesCollection } from 'meteor/ostrio:files';
import SimpleSchema from 'simpl-schema';

const Images = new FilesCollection({
  storagePath: 'assets/app/uploads/Images',
  downloadRoute: '/files/images',
  collectionName: 'Images',
  permissions: 0o755,
  allowClientCode: false,
  cacheControl: 'public, max-age=31536000',
  onbeforeunloadMessage() {
    return 'Upload is still in progress! Upload will be aborted if you leave this page!';
  },
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    // Note: You should never trust to extension and mime-type here
    // as this data comes from client and can be easily substitute
    // to check file's "magic-numbers" use `mmmagic` or `file-type` package
    // real extension and mime-type can be checked on client (untrusted side)
    // and on server at `onAfterUpload` hook (trusted side)
    if (file.size <= 10485760 && /png|jpe?g/i.test(file.ext)) {
      return true;
    }
    return 'Please upload image, with size equal or less than 10MB';
  },
  downloadCallback(fileObj) {
    if (this.params.query.download === 'true') {
      // Increment downloads counter
      Images.update(fileObj._id, { $inc: { 'meta.downloads': 1 } });
    }
    // Must return true to continue download
    return true;
  },
  // protected(fileObj) {
  //   // Check if current user is owner of the file
  //   if (fileObj.meta.owner === this.userId) {
  //     return true;
  //   }
  //   return false;
  // },
});

Images.collection.attachSchema(new SimpleSchema(Images.schema));
// Export FilesCollection instance, so it can be imported in other files
export default Images;
