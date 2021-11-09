const process = require("process");
const chalk = require("chalk"); //окрашивание в консоли
const { exit } = require("process");

const num1 = +process.argv[2];
const num2 = +process.argv[3];

function diap(a, b) {
  if (isNaN(a) || isNaN(b)) {
    return console.log("Введите числа");
  }
  let simpleCount = 0;
  for (let i = a; i <= b; i++) {
    let simple = true;
    for (let j = 2; j <= i / 2 && simple; j++) {
      if (i % j == 0) {
        simple = false;
        break;
      }
    }
    if (simple) {
      switch (simpleCount % 3) {
        case 0:
          console.log(chalk.green(i));
          break;
        case 1:
          console.log(chalk.yellow(i));
          break;
        case 2:
          console.log(chalk.red(i));
          break;
      }
      simpleCount++;
    }
  }
  if (simpleCount == 0) {
    console.log(chalk.red("Простых чисел в диапозоне нет"));
  }
}

diap(num1, num2);
