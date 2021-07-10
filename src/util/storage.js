const { Storage } = require("@google-cloud/storage");
const path = require("path");
require("dotenv").config();

const initBucket = () => {
  const gc = new Storage({
    keyFilename: path.join(__dirname, process.env.GCP_KEY),
    projectId: process.env.GCP_PROJECT,
  });

  return gc.bucket("books-management");
};

module.exports = {
  initBucket,
};
