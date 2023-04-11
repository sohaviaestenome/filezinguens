const fs = require('fs');
const path = require('path');

const moveFilesToParentFolder = async (folders) => {
  for (const folder of folders) {
    const parentFolder = path.dirname(folder);

    fs.readdir(folder, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        return;
      }

      files.forEach((file) => {
        const filePath = path.join(folder, file);
        const fileExtension = path.extname(file).toLowerCase();

        if (
          ['.mkv', '.avi', '.wmv'].includes(fileExtension) &&
          fs.lstatSync(filePath).isFile()
        ) {
          const newFilePath = path.join(parentFolder, file);

          fs.rename(filePath, newFilePath, (err) => {
            if (err) {
              console.error('Error moving file:', err);
            } else {
              console.log(`Moved ${filePath} to ${newFilePath}`);
            }
          });
        }
      });
    });
  }
};

module.exports = {
  moveFilesToParentFolder,
};
