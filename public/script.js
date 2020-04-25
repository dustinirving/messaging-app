let $sendButton = document.getElementById("send-button");
let $textInput = document.getElementById("text-input");
let $messages = document.getElementById("messages");
let $clearButton = document.getElementById("clear-button");
let $sendForm = document.getElementById("send-form");
const socket = io();

renderDOM();

// Render the DOM when the page is loaded
function renderDOM() {
  $.get("/api/messages/", function (messages) {
    for (let message of messages) {
      if (messages) {
        let newMessage = document.createElement("LI");
        $messages.appendChild(newMessage);
        newMessage.textContent = message.message;
        newMessage.classList.add("message");
      }
    }
  });
}

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

// $sendButton.addEventListener("click", function () {
//   // Setting a new object
//   let newMessageObject = {
//     message: $textInput.value,
//   };
//   console.log(newMessageObject);
//   // Update the DOM
//   let newMessage = document.createElement("LI");
//   $messages.appendChild(newMessage);
//   newMessage.textContent = $textInput.value;
//   newMessage.classList.add("message");
//   $textInput.value = "";

//   // Making a Post request
//   $.post("/api/messages", newMessageObject).then(function (data) {});
// });

// document.addEventListener("keyup", function (e) {
//   const msg = $textInput.value;

//   // Setting a new object
//   let newMessageObject = {
//     message: $textInput.value,
//   };

//   if (e.keyCode == 13) {
//     if (e.shiftKey) {
//       // new line
//     } else {
//       let newMessage = document.createElement("LI");
//       console.log(newMessage);
//       $messages.appendChild(newMessage);
//       newMessage.textContent = $textInput.value;
//       newMessage.classList.add("message");
//       $textInput.value = "";

//       // Making a Post request
//       $.post("/api/messages", newMessageObject).then(function (data) {});

//       socket.emit("chatMessage", msg);
//     }
//   }
// });

function sendMessage(msg) {
  // Update the DOM
  const newMessage = document.createElement("LI");
  $messages.appendChild(newMessage);
  newMessage.textContent = msg;
  newMessage.classList.add("message");
  $textInput.value = "";
}

$sendForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let newMessageObject = {
    message: $textInput.value,
  };
  // Making a Post request
  $.post("/api/messages", newMessageObject).then(function (data) {});

  // Real Time
  const msg = $textInput.value;
  socket.emit("chatMessage", msg);
});

socket.on("message", (msg) => {
  sendMessage(msg);
});
