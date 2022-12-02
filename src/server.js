import express from "express";
import { Server as IOServer } from "socket.io";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const expressServer = app.listen(8080, () => {
  console.log("Server listening port 8080");
});
const io = new IOServer(expressServer);
const messages = [];

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log(`New connection, socket ID: ${socket.id}`);

  socket.emit("server:message", messages);

  socket.on("client:message", (messageInfo) => {
    messages.push(messageInfo);

    io.emit("server:message", messages);
  });
});
