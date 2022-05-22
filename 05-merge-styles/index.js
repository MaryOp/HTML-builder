const fs = require('fs');
const path = require('path');


let pathToFile = path.dirname(__filename);
let newPath = path.join(pathToFile, '/project-dist');

let ws = fs.createWriteStream(path.join(newPath, 'bundle.css'));

try {
  fs.readdir(path.join(pathToFile,'/styles'), (err, data) => {
    if (err) throw err;
    data.forEach(file => {
      
      if (path.extname(file) == '.css') {
        let rs = fs.createReadStream(path.join(pathToFile,'/styles',file));
        rs.on('error', function(err) {
          console.log(err);
        });
        ws.on('error', function(err) {
          console.log(err);
        });
        rs.pipe(ws);

      }
    });
  });
}

catch (error) {
  console.log(error);
}