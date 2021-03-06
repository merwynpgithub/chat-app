import { io } from 'socket.io-client';

const socket = io("http://localhost:3000");

socket.on("connect", () =>{
  displayMessage(`You connected with id : ${socket.id}`)
})

socket.on("receive-message", (message) => {
  displayMessage(message);
});


const form = document.getElementById("form");
const joinButton = document.getElementById("join-room");
const roomInput = document.getElementById("room");
const messageInput = document.getElementById("message");

form.addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  const room = roomInput.value;
  let message = messageInput.value;
  if (message === "") return;
  displayMessage(message);
  socket.emit("send-message", message, room);

  message = "";
}

function displayMessage(message) {
  const div = document.createElement("div")
  div.textContent = message;
  const container = document.getElementById("container");
  container.append(div);
}

joinButton.addEventListener("click", () => {
  const roomName = document.getElementById("room");
  console.log(roomName.value);
});