// поиск ip из потока

const fs = require("fs");

const log = "access.log";

function findIp(...ipArr) {
  const readStream = fs.createReadStream(log, {
    flags: "r",
  });

  readStream.on("open", () => {
    console.log("Файл открыт");
  });

  readStream.on("data", (chunk) => {
    const src = chunk.toString();

    const lines = src.split("\n").filter((line) => !!line);

    ipArr.forEach((item) => {
      const writeStream = fs.createWriteStream(item + "_requests.log");
      let y = new RegExp(item, "gm");
      const matches = lines.filter((value) => y.test(value));
      const content = matches.join("\n");

      writeStream.write(content);
    });
  });
}

findIp("89.123.1.41", "34.48.240.111");
