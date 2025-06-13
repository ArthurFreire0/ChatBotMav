function showTypingIndicator() {
  const chatMessages = document.getElementById("chat-messages");
  if (!chatMessages) {
    console.error("Contêiner de mensagens do chat (chat-messages) não encontrado!");
    return null;
  }

  
  const existingIndicator = document.getElementById("botTypingIndicatorContainer");
  if (existingIndicator) {
    existingIndicator.remove();
  }

  const indicatorContainer = document.createElement("div");
  indicatorContainer.id = "botTypingIndicatorContainer";
  
  indicatorContainer.className = "bot"; 
  
  const typingDotsWrapper = document.createElement("div");
  typingDotsWrapper.className = "typing-indicator-dots"; 

  for (let i = 0; i < 3; i++) {
    const dot = document.createElement("div");
    dot.className = "typing-dot"; // Classe para cada ponto
    typingDotsWrapper.appendChild(dot);
  }
  
  indicatorContainer.appendChild(typingDotsWrapper);
  chatMessages.appendChild(indicatorContainer);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return indicatorContainer; 
}

function hideTypingIndicator(indicatorElement) {
  if (indicatorElement && indicatorElement.parentNode) {
    indicatorElement.parentNode.removeChild(indicatorElement);
  } else {
    
    const el = document.getElementById("botTypingIndicatorContainer");
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }
}