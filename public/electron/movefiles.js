// folder.js

const fs = require('fs');
const path = require('path');

const moveFilesToParentFolder = (folders) => {
  const fileExtensions = ['.mkv', '.avi', '.wmv'];

  folders.forEach((folder) => {
    fs.readdir(folder, (err, files) => {
      if (err) {
        console.error(`Error reading folder: ${folder}`, err);
        return;
      }

      files.forEach((file) => {
        const ext = path.extname(file);
        if (fileExtensions.includes(ext)) {
          const oldPath = path.join(folder, file);
          const newPath = path.join(folder, '..', file);

          fs.rename(oldPath, newPath, (err) => {
            if (err) {
              console.error(`Error moving file: ${file}`, err);
            } else {
              console.log(`Moved ${file} to the parent folder`);
            }
          });
        }
      });
    });
  });
};


module.exports = { moveFilesToParentFolder };