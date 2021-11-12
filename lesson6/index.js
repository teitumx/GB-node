const io = require("socket.io");
const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((request, response) => {
  const indexPath = path.join(__dirname, "index.html");
  const readStream = fs.createReadStream(indexPath);
  readStream.pipe(response);
});

const socket = io(server);
let usersList = [];
let delUsersList = [];

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 8; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
socket.on("connection", (client) => {
  console.log("User ID: " + client.id);
  client.broadcast.emit("NEW_CLIENT_CONNECTED");

  client.on("NewUser", (name) => {
    let user = {
      name: "",
      color: "",
      id: "",
    };
    let index = delUsersList.findIndex(function (user, index) {
      if (user.name === name) {
        return true;
      }
    });
    if (index > -1) {
      oldUser = delUsersList.splice(index, 1);
      usersList.push(oldUser[0]);
      console.log("Добро пожаловать обратно " + oldUser[0].name);
    } else {
      user.name = name;
      user.color = getRandomColor();
      user.id = client.id;
      usersList.push(user);
      console.log("Новый пользователь подключился " + name);
    }
    console.log(usersList);
  });
  client.on("disconnect", (name) => {
    let index = usersList.findIndex(function (user, index) {
      if (user.id === client.id) {
        return true;
      }
    });
    delUser = usersList.splice(index, 1);
    delUsersList.push(delUser[0]);
    console.log("Пользователь отключился: " + delUser[0].name);
    console.log(usersList);
  });
  client.on("CLIENT_MSG", (data) => {
    const payload = {
      message: data.message.split("").reverse().join(""),
    };
    client.emit("SERVER_MSG", payload);
    client.broadcast.emit("SERVER_MSG", payload);
  });
});

server.listen(5555);
