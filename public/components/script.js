document.addEventListener("DOMContentLoaded", () => {
  const chatButton = document.getElementById("chat-button");
  const chatWindow = document.getElementById("chat-window");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");
  
  async function perguntarIA(mensagem) {
    try {
      const resp = await fetch('http://localhost:3000/chat', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: mensagem })
      });

      if (!resp.ok) throw new Error("Erro na comunicação com o servidor");

      const data = await resp.json();
      return data.answer || "Desculpe, não consegui entender. Pode tentar reformular?";
    } catch (error) {
      console.error(error);
      return "Ocorreu um erro. Tente novamente mais tarde.";
    }
  }

  function showBotMessage(msg) {
    const messages = document.getElementById("chat-messages");
    const botMsg = document.createElement("div");
    botMsg.className = "bot";
    botMsg.innerHTML = msg;
    messages.appendChild(botMsg);
    messages.scrollTop = messages.scrollHeight;
  }

  function showUserMessage(msg) {
    const messages = document.getElementById("chat-messages");
    const userMsg = document.createElement("div");
    userMsg.className = "user";
    userMsg.textContent = msg;
    messages.appendChild(userMsg);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTypingIndicator() {
    const messages = document.getElementById("chat-messages");
    const indicator = document.createElement("div");
    indicator.className = "bot typing";
    indicator.textContent = "Digitando...";
    messages.appendChild(indicator);
    messages.scrollTop = messages.scrollHeight;
    return indicator;
  }

  function hideTypingIndicator(indicator) {
    if (indicator && indicator.parentNode) {
      indicator.parentNode.removeChild(indicator);
    }
  }

  function clearMessages() {
    document.getElementById("chat-messages").innerHTML = "";
  }

  async function sendMessage() {
    const value = userInput?.value?.trim?.();
    console.log("Mensagem enviada:", value);
    if (!value) return;

    showUserMessage(value);
    userInput.value = "";

    const typingIndicator = showTypingIndicator();

    const resposta = await perguntarIA(value);

    hideTypingIndicator(typingIndicator);
    showBotMessage(resposta);
  }

  chatButton.addEventListener("click", () => {
    const isHidden = chatWindow.style.display === "none" || chatWindow.style.display === "";
    if (isHidden) {
      chatWindow.style.display = "flex";
      clearMessages();
    showBotMessage("Olá! Seja bem-vindo ao chatbot do Grupo MAV. Estou aqui para ajudar com qualquer dúvida que você tiver. É só digitar!");
    } else {
      chatWindow.style.display = "none";
    }
  });

  sendButton.addEventListener("click", sendMessage);

  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});