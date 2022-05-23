const fs = require('fs');
const path = require('path');


let pathToFile = path.dirname(__filename);
let newPath = path.join(pathToFile, 'files-copy');

fs.mkdir(newPath, { recursive: true }, (err) => {
  if (err) throw err;
});

try {
  fs.readdir(path.join(pathToFile,'/files'), (err, data) => {
    if (err) throw err;
    data.forEach(file => {
      fs.copyFile(path.join(pathToFile,'/files',file), path.join(newPath, file), () => {
        if (err) throw err;
      });
    });

  });
  console.log('Копирование папки files завершено');
}

catch (error) {
  console.log(error);
}