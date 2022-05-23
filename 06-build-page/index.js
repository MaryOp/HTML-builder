const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin } = require('process');
const { stdout } = require('process');


let pathToFile = path.dirname(__filename);
let newPath = path.join(pathToFile, 'project-dist');

fs.mkdir(path.join(newPath, 'assets'), { recursive: true }, (err) => {
  if (err) throw err;
});

// try {
//   fs.readdir(path.join(pathToFile,'/assets'), (err, data) => {
//     if (err) throw err;
//     data.forEach(file => {
//       // fs.copyFile(path.join(pathToFile,'/assets',file)), path.join(newPath, '/assets', file), () => {
//       // console.log(file);

//       fs.stat(path.join(path.join(newPath, '/assets', file)), (err, stats) => {
//         // if (err) throw err;
//         // console.log(path.join(path.join(newPath, '/assets', file)));
//         if  (stats.isDir()) {
//           fs.mkdir(path.join(newPath, '/assets', file), { recursive: true }, (err) => {
//             if (err) throw err;
//           });
//         } else {
//           fs.copyFile(path.join(pathToFile,'/assets',file)), path.join(newPath, '/assets', file);
//         }
//       });

//     })
//     if (err) throw err;
//     // });
//   });

// }
// catch (error) {
//   console.log(error);
// }


let ws = fs.createWriteStream(path.join(newPath, 'style.css'));
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


let rsTemplate = fs.createReadStream(path.join(pathToFile, 'template.html'));
let rdline = readline.createInterface({input: rsTemplate});
let wsHTML = fs.createWriteStream(path.join(newPath, '/index.html'));
// let newIndex = readline.createInterface({input: (path.join(newPath, '/index.html'))});




// let componentsArr = [];


try {
  let componentsArr = [];
  fs.readdir(path.join(pathToFile, '/components'), (err, data) => {
    

    if (err) throw err;
    data.forEach(file => {
      fs.stat(path.join(pathToFile, '/components', file), (err) => {
        if (err) throw err;
        if  ((path.extname(file) == '.html') ) {
          // console.log(file);
          componentsArr.push(path.basename(file, path.extname(file)));
          // console.log(componentsArr);
          // return componentsArr;
        }
      });
    });
  });
  // console.log(componentsArr);
  // console.log(componentsArr);
  // for (let i = 0; i <= componentsArr.length; ++i) {
  //   console.log(componentsArr);

  rdline.on('line', function (line) {
    // if (componentsArr[i] == line) {
    // let currentComponent =  fs.createReadStream(path.join(pathToFile, '/components/',componentsArr[i], '.html'));
    // let currentComponent = path.join(pathToFile, '/components/',componentsArr[i], '.html');
    // readline.createInterface({input: currentComponent}).pipe(wsHTML);
    //   console.log(currentComponent);
    //   wsHTML.write(currentComponent + '\n');

    // } 

    // console.log(line.toString());
    if (line.toString().includes('{{')) {
    //  fs.createWriteStream(path.join(newPath, '/components', line, '.html')).pipe(line);
      let componentName = line.toString();
      componentName.replaceAll(' ', '');
      componentName = componentName.replaceAll('  ', '')
      componentName = componentName.replaceAll('{', '');
      componentName = componentName.replaceAll('}', '');
      componentName = componentName + '.html';
      //  console.log(componentName);
      // line = fs.createReadStream(path.join(pathToFile, '/components', componentName));
      // console.log(line);
      // fs.createReadStream(path.join(pathToFile, '/components', componentName)).pipe(line);
      // line = path.join(newPath, '/components', line, '.html')
    }
    // else {
    wsHTML.write(line + '\n');
    // rsTemplate.pipe(wsHTML);
    // }

  });
    

  // newIndex.on('line', function (line) {
   
  //   fs.readdir(path.join(pathToFile, '/components'), (err, data) => {
    
  //     if (err) throw err;
  //     data.forEach(file => {
  //       fs.stat(path.join(pathToFile, '/components', file), (err) => {
  //         if (err) throw err;
  //         if  (((path.extname(file) == '.html') && (file == line)) ) {
  //           line = file;
  //           // componentsArr.push(path.basename(file, path.extname(file)));
 
  //         }
  //       });
  //     });
  //   });


  // })
  // }




  // rsTemplate.on('line', function (line) {
  
  //   switch (line) {
  //   case ('{{header}}'):
  //     readline.createInterface({input: fs.createReadStream(path.join(pathToFile, '/components/header.html'))}).pipe(ws);
  //     break;
  //     // case ('{{articles}}'):

  //     // break;
  //     // case ('{{footer}}'):

  //   // break;
  //   default:
  //   // rsTemplate.pipe(ws);
  //     break;
  //   }
  // // console.log('Line from file:', line);
  // });

}
catch  (error) {
  console.log(error);
}
