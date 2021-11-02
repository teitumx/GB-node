const fs = require("fs");
const path = require("path");
const readline = require("readline");
const inquirer = require("inquirer");

//  В содержимом директории переходить во вложенные каталоги;

const isFile = (fileName) => fs.lstatSync(fileName).isFile();
const isDir = (dirName) => fs.lstatSync(dirName).isDirectory();
const fileList = fs.readdirSync("./");

const inq = (pathToDir) => {
  inquirer
    .prompt([
      {
        name: "fileName",
        type: "list",
        message: "Choose a file to read",
        choices: pathToDir,
      },
    ])
    .then(({ fileName }) => {
      if (isFile(fileName)) {
        const pathToFile = path.resolve(__dirname, fileName);
        fs.readFile(pathToFile, "utf-8", (err, data) => {
          console.log(data);
        });
      } else {
        const newDir = fs.readdirSync(path.resolve(__dirname, fileName));
        inq(newDir);
      }
    })
    .catch((err) => {
      console.log("В данной папке нет файлов");
    });
};

inq(fileList);
