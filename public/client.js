// client side:

// window.location.origin = http://localhost:8080
const socket = io(window.location.origin);

const name = document.getElementById("name");
const message = document.getElementById("message");
const sendButton = document.getElementById("send");
const output = document.getElementById("output");
const answer = document.getElementById("answer");

name.addEventListener("keyup", () => {
  toggleSendButton();
  if (name.value !== "") {
    message.removeAttribute("disabled");
  } else {
    message.setAttribute("disabled", true);
  }
});

message.addEventListener("keyup", toggleSendButton);

sendButton.addEventListener("click", () => {
  const data = { message: message.value, name: name.value };
  socket.emit("message", data);
  message.value = "";
  message.focus();
});

message.addEventListener("keyup", () => {
  socket.emit("typing", { name: name.value });
});

function toggleSendButton() {
  if (name.value !== "" && message.value !== "") {
    sendButton.removeAttribute("disabled");
  } else {
    sendButton.setAttribute("disabled", true);
  }
}

// send "message" to server:
socket.on("message", (data) => {
  answer.innerHTML = "";
  output.innerHTML += `<p><strong>${data.name}: </strong>${data.message}</p>`;
});

// send "typing" to server:
socket.on("typing", (data) => {
  const whoElement = data.name ? `<em>${data.name}</em>` : "Someone";
  answer.innerHTML = `<p>${whoElement} is typing...</p>`;
});
