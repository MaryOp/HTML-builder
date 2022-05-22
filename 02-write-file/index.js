const fs = require('fs');
const path = require('path');
const { stdin } = require('process');
const { stdout } = require('process');
const readline = require('readline');
const process = require('process');


let pathToFile = path.dirname(__filename);


console.log('Привет! Для записи сообщения в файл можешь написать его прямо тут, в консоли');
const ws = fs.createWriteStream(path.join(pathToFile,'text.txt'));

try {
  const rl = readline.createInterface( stdin, stdout );
  rl.on('line', function (line) {
    if (line == 'exit') {
      process.exit(0);
    }
  });
  stdin.on('data', chunk => ws.write(chunk));
  stdin.on('error', error => console.log('Error', error.message));
} catch (error) {
  console.log(error);
}


process.on('SIGINT', () => {
  fs.close();
});

process.on('exit', () => {
  console.log('\nВвод сообщений в файл завершен');
  process.exit();
});
