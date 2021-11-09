const fs = require("fs");
const path = require("path");
const readline = require("readline");

//Возможность передавать путь к директории в программу. Это актуально, когда вы не хотите покидать текущую директорию, но вам необходимо просмотреть файл, находящийся в другом месте;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Введите путь до файла: ", (filePath) => {
  const pathToFile = path.resolve(__dirname, filePath);
  fs.readFileSync(pathToFile, "utf-8");
  rl.close();
});
