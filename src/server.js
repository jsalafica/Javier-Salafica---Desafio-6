import express, { json, urlencoded } from "express";
import { Server as IOServer } from "socket.io";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import routes from "./routes/index.js";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: join(__dirname, "/views/layouts/main.hbs"),
    layoutsDir: join(__dirname, "/views/layouts"),
    partialsDir: join(__dirname, "/views/partials"),
  })
);

app.set("view engine", "hbs");
app.set("views", join(__dirname, "/views"));

app.use("/", routes);

const expressServer = app.listen(8080, () => {
  console.log("Server listening port 8080");
});
const io = new IOServer(expressServer);
const messages = [];
const products = [];

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log(`New connection, socket ID: ${socket.id}`);

  // Mensajes
  socket.emit("server:message", messages);
  socket.on("client:message", (messageInfo) => {
    messages.push(messageInfo);
    io.emit("server:message", messages);
    fs.writeFileSync(
      __dirname + "/chat/messages.txt",
      JSON.stringify(messages)
    );
  });

  // Productos
  socket.emit("server:product", products);
  socket.on("client:product", (product) => {
    products.push(product);
    io.emit("server:product", products);
  });
});
