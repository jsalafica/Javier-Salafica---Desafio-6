const socket = io();

const messageForm = document.getElementById("messageForm");
const usernameInput = document.getElementById("usernameInput");
const messageInput = document.getElementById("messageInput");
const messagesPool = document.getElementById("messagesPool");

const sendMessage = (messageInfo) => {
  socket.emit("client:message", messageInfo);
};

const renderMessage = (messagesData) => {
  const html = messagesData.map((messageInfo) => {
    return `<div> <strong>${messageInfo.username}</strong> <em>${messageInfo.message}</em> </div>`;
  });
  console.log("Arreglo de string de mensajes", html);

  console.log("String de mensajes", html.join(" "));

  messagesPool.innerHTML = html.join(" ");
};

const submitHandler = (event) => {
  event.preventDefault();

  const messageInfo = {
    username: usernameInput.value,
    message: messageInput.value,
  };

  sendMessage(messageInfo);

  messageInput.value = "";
  usernameInput.readOnly = true;
};

messageForm.addEventListener("submit", submitHandler);

socket.on("server:message", renderMessage);
