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

module.exports = {
  initBucket,
  uploadImage,
};
