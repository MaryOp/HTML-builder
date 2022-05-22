const fs = require('fs');
const path = require('path');

let pathToFile = path.dirname(__filename);
let secretPath = path.join(pathToFile,'/secret-folder');

try {
  fs.readdir(secretPath, (err, data) => {
    if (err)
      throw err;
    data.forEach(file => {
      fs.stat(path.join(secretPath, file), (err, stats) => {
        if (err) throw err;
        if  (stats.isFile()) {
          let result = (path.basename(file, path.extname(file)) + ' - ' + path.extname(file) + ' - ' + stats['size']/1024)+' Kb';
          console.log(result);
        }
      });
    });
  });
}
catch (error) {
  console.log(error);
}