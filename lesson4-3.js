const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

//  При чтении файлов искать в них заданную строку или паттерн.

const isFile = (fileName) => fs.lstatSync(fileName).isFile();
const fileList = fs.readdirSync("./").filter(isFile);

inquirer
  .prompt([
    {
      name: "inputSearch",
      type: "input",
      message: "Что необходимо найти в файле?",
      choices: fileList,
    },
    {
      name: "fileName",
      type: "list",
      message: "В каком файле необходимо найти",
      choices: fileList,
    },
  ])
  .then(({ fileName, inputSearch }) => {
    const pathToFile = path.resolve(__dirname, fileName);

    fs.readFile(pathToFile, "utf-8", (err, data) => {
      const message = new RegExp(inputSearch, "gm");
      const match = data.match(message);
      const content = match.join("\n");
      console.log("Найдены следующие совпадения: ", content);
    });
  });
