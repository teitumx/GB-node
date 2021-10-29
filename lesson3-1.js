// поиск ip из файла

const fs = require("fs");

const log = "access.log";

function findIp(...ips) {
  fs.readFile(log, "utf-8", (err, buffer) => {
    if (err) {
      console.log(err);
      process.exit(0);
    }
    const src = buffer.toString();

    ips.forEach((item) => {
      let y = new RegExp(item, "gm");

      const lines = src.split("\n").filter((line) => !!line);
      const matches = lines.filter((value) => y.test(value));
      const content = matches.join("\n");

      fs.writeFile(item + "_requests.log", content, (err) => {
        if (err) console.log(err);
        else console.log("IP адреса " + item + " отсортированы.");
      });
    });
  });
}

findIp("89.123.1.41", "34.48.240.111");
