const { Storage } = require("@google-cloud/storage");
const path = require("path");
require("dotenv").config();

const initBucket = () => {
  const gc = new Storage({
    keyFilename: path.join(__dirname, "../../" + process.env.GCP_KEY),
    projectId: process.env.GCP_PROJECT,
  });

  return gc.bucket("books-management");
};

const uploadImage = async (bucket, destination, image, contentType) => {
  const file = bucket.file(destination);
  await file.save(image, { contentType: contentType });
  return file.publicUrl();
};

const uploadMultiple = async (bucket, id, files) => {
  var fileLinks = [];

  for (var i = 0; i < files.length; i++) {
    var url = await uploadImage(
      bucket,
      `${id}/${i}-${files[i].originalname}`,
      files[i].buffer,
      files[i].mimetype
    );
    fileLinks.push(url);
  }

  return fileLinks;
};

module.exports = {
  initBucket,
  uploadImage,
  uploadMultiple,
};
