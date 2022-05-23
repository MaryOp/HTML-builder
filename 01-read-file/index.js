const fs = require('fs');
const path = require('path');


let pathToFile = path.dirname(__filename);
const rs = fs.createReadStream(path.join(pathToFile,'text.txt'));

try {
  rs.on('data', function(chunk){ 
    console.log(chunk.toString());
  });
} catch (error) {
  console.log(error);
}

rs.on('end', function(){
  console.log('\nЧтение из файла завершено');
});
