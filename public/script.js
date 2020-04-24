let $sendButton = document.getElementById("send-button");
let $textInput = document.getElementById("text-input");
let $messages = document.getElementById("messages");

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

renderDOM();

$sendButton.addEventListener("click", function () {
  // Setting a new object
  let newMessageObject = {
    message: $textInput.value,
  };
  console.log(newMessageObject);
  // Update the DOM
  let newMessage = document.createElement("LI");
  $messages.appendChild(newMessage);
  newMessage.textContent = $textInput.value;
  newMessage.classList.add("message");
  $textInput.value = "";

  // Making a Post request
  $.post("/api/messages", newMessageObject).then(function (data) {
    $messages.textContent = "";
    renderDOM();
  });
});

document.addEventListener("keyup", function (e) {
  // Setting a new object
  let newMessageObject = {
    message: $textInput.value,
  };

  if (e.keyCode == 13) {
    if (e.shiftKey) {
      // new line
    } else {
      let newMessage = document.createElement("LI");
      console.log(newMessage);
      $messages.appendChild(newMessage);
      newMessage.textContent = $textInput.value;
      newMessage.classList.add("message");
      $textInput.value = "";

      // Making a Post request
      $.post("/api/messages", newMessageObject).then(function (data) {
        $messages.textContent = "";
        renderDOM();
      });
    }
  }
});
