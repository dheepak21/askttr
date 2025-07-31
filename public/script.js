const chatBox = document.getElementById("chatBox");
const inputField = document.getElementById("userInput");
const exportBtn = document.getElementById("exportChatBtn");


// Send user message to chat
function sendMessage() {
  const userText = inputField.value.trim();
  if (!userText) return;

  appendMessage(userText, "user");
  inputField.value = "";
  generateReply(userText);
}

// Append messages (User/Bot) to chatBox
function appendMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
  messageDiv.innerText = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Generate reply by calling backend API
async function generateReply(input) {
  const username = localStorage.getItem("askttrUser") || "User";

  try {
    const response = await fetch('/api/getAnswer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: input, username: username })
    });

    const data = await response.json();
    setTimeout(() => appendMessage(data.answer, "bot"), 500);
  } catch (error) {
    appendMessage("Sorry, unable to fetch response. Please try again.", "bot");
  }
}

// Listen for Enter key
inputField.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
});

// Export Chat to PDF
async function exportChat() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const chatMessages = document.querySelectorAll(".message");
  let y = 10;

  doc.setFontSize(12);
  doc.text("AskTTR Chat Export", 10, y);
  y += 10;

  chatMessages.forEach((msg) => {
    const prefix = msg.classList.contains("user-message") ? "You: " : "AskTTR: ";
    const text = prefix + msg.innerText;
    const splitText = doc.splitTextToSize(text, 180);
    if (y + splitText.length * 10 > 280) {
      doc.addPage();
      y = 10;
    }
    splitText.forEach(line => {
      doc.text(line, 10, y);
      y += 10;
    });
  });

  doc.save("AskTTR_Chat.pdf");
}

// Export Chat Button Click
exportBtn.addEventListener("click", exportChat);
