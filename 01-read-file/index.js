const fs = require("fs");
const path = require("path");


pathToFile = path.dirname(__filename);
const rs = fs.createReadStream(path.join(pathToFile,"text.txt"));

rs.on("data", function(chunk){ 
    console.log(chunk.toString());
});

rs.on('end', function(){
    console.log("\nЧтение из файла завершено");
});
