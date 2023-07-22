const path = require("path");

const uploadFile = (validExtensions = [], file, collection = "") =>
  new Promise((resolve, rej) => {
    let finalName = "";

    if (!file) {
      return rej("No files were uploaded.");
    }

    const extension = file.name.split(".").pop();
    finalName = `${file.md5}.${extension}`;
    const uploadPath = path.join(
      __dirname,
      "../uploads/",
      collection,
      finalName
    );
    if (!validExtensions.includes(extension)) {
      return rej(`Bad extension: ${extension}`);
    }
    file.mv(uploadPath, function (err) {
      if (err) {
        return rej("Some error");
      }
    });

    return resolve(finalName);
  });

module.exports = uploadFile;
