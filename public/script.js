let username = localStorage.getItem("username");
// Chatroom
const $sendButton = document.getElementById("send-button");
const $textInput = document.getElementById("text-input");
const $messages = document.getElementById("messages");
const $clearButton = document.getElementById("clear-button");
const $sendForm = document.getElementById("send-form");
const $messagesDiv = document.getElementById("messages-div");
const $username = document.getElementById("");
const socket = io();

// Render the DOM when the page is loaded
function renderDOM() {
  $.get("/api/messages/", function (messages) {
    for (let message of messages) {
      if (messages) {
        let newMessage = document.createElement("LI");
        $messages.appendChild(newMessage);
        newMessage.innerHTML = `<div class="message-name"> ${message.username} </div> <div> ${message.message}</div>`;
        newMessage.classList.add("message");
      }
    }
  });
}

renderDOM();

let deleteMessages = function () {
  return $.ajax({
    url: "api/messages/",
    method: "DELETE",
  });
};

function clearMessages() {
  $messages.textContent = "";
}

$clearButton.addEventListener("click", function () {
  clearMessages();
  deleteMessages();
});

function sendMessage(msg) {
  // Update the DOM
  const newMessage = document.createElement("LI");
  $messages.appendChild(newMessage);
  newMessage.innerHTML = `<div class="message-name"> ${msg.username} </div> <div> ${msg.message}</div>`;
  newMessage.classList.add("message");
  $textInput.value = "";
}

$sendForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let newMessageObject = {
    username: username,
    message: $textInput.value,
  };
  // Making a Post request
  $.post("/api/messages", newMessageObject).then(function (data) {});

  // Real Time
  const msg = {
    username: username,
    message: $textInput.value,
  };

  socket.emit("chatMessage", msg);
});

socket.on("message", (msg) => {
  sendMessage(msg);
  $messagesDiv.scrollTop = $messagesDiv.scrollHeight;
});
