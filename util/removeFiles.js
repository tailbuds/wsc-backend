const fsp = require('fs').promises;
const path = require('../util/path');

exports.deleteOldFiles = (days) => {
  const deletedFiles = [];
  const today = new Date();
  const cutOff = new Date(today.setDate(today.getDate() - +days));
  return new Promise((resolve, reject) => {
    fsp
      .readdir(path + '/archive/')
      .then((files) => {
        files.map((file) => {
          const fileDate = new Date(file.split('T')[0]);
          if (fileDate < cutOff) {
            deletedFiles.push(file);
            return fsp.unlink(path + '/archive/' + file);
          }
        });
        return deletedFiles;
      })
      .then((df) => resolve(df))
      .catch((err) => reject(err));
  });
};
