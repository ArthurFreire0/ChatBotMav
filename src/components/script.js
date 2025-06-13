document.addEventListener("DOMContentLoaded", () => {
  const perguntas = {
    1: "O que é o grupo MAV?",
    2: "Pontos de coleta da MAV",
    3: "Como apoiar a MAV",
    4: "Projetos da MAV",
    5: "Redes sociais do grupo MAV"
  };

  const respostas = {
    1: "O Movimento Água é Vida, também conhecido como MAV, é uma Organização da Sociedade Civil (OSC), sem fins lucrativos (OSFL), que foi fundada no dia 21 de maio de 1997 Nossa missão é cuidar da água, da saúde e do meio ambiente, por meio de atividades representativas, educacionais e operacionais de reciclagem junto à comunidade.",
    2: `<strong>Pontos de Coleta da MAV:</strong><br><table border='1' style="width: 100%; font-size: 12px;">
          <tr><td>Paróquia Santo Antônio</td><td>Av. Pres. Dutra - Capuchinhos</td><td>(75) 3625-1910</td></tr>
          <tr><td>Paróquia Cristo Redentor</td><td>Rua Lopes Rodrigues, 10 - Jomafa</td><td>(75) 3223-4423</td></tr>
          <tr><td>EMBASA - Fundo do Cuca</td><td>R. Des. Felinto Bastos - Centro</td><td>(75) 9112-4745</td></tr>
          <tr><td> EMBASA -Fundo do Cuca </td><td>R. Des. Felinto Bastos- Centro</td><td(75) 9112-4745</td></tr>
          <tr><td>Paróquia Nossa Senhora do Perpétuo Socorro</td><td>Travessa Macaria Barreto, 35 - Tomba</td><td>(75) 3622-5689</td></tr>
          <tr><td>Secretaria de Meio Ambiente - SEMAM</td><td>R. Leolinda Bacelar Lima, 224 - Centro</td><td>(75) 3322-9319</td></tr>
          <tr><td>Secretaria de Serviços Públicos - SESP</td><td>R. dos Tupinambás, 275 - São João</td><td>(75) 3602-8100</td></tr>
          <tr><td>Comunidade Cristo Operário - Aviário</td><td>R. Principal - Aviário</td><td>(75) 8159-6027</td></tr>
          <tr><td>Centro de Referência de Assistência Social - CRAS</td><td>Todos da Cidade</td><td>(75) 8140-4546</td></tr>
          <tr><td>Unidade Básica de Saúde - Caseb I</td><td>R. Japão S/N</td><td>(75) 9263-0940</td></tr>
          <tr><td>Universidade Estadual de Feira de Santana - UEFS</td><td>Av. Transnordestina, s/n - Novo Horizonte</td><td>(75) 3161-8000</td></tr>
          <tr><td>Igreja Batista Central - Centro</td><td>Av. Getúlio Vargas, 1990 - Ponto Central</td><td>(75) 3612-6500</td></tr>
          <tr><td>Feira Produtiva - Centro de Abastecimento</td><td>Centro de Abastecimento</td><td>(75) 9118-8465</td></tr>
          <tr><td>CSU - Centro Social Urbano - Cidade Nova</td><td>R. Tostão - Cidade Nova</td><td>(75) 9143-9870</td></tr>  
        </table>`,
    3: `Você pode ajudar o Grupo MAV por meio de doações que podem ser feitas pelo <a href="https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=JKCRL4DF4B26N&source=url" target="_blank" class="no-underline" rel="noopener noreferrer" style="color: #003d66"><i class="fa-brands fa-paypal"></i> PAYPAL`,
    4: `PROJETO: ÁGUA VIVA Reaproveitamento de óleo vegetal e gorduras residuais<br>
        PROJETO: ÁRVORE VIVA<br>
        PROJETO: PEDAGÓGICO<br>
        PROJETO: COMUNICAÇÃO<br><br>
        Esses são os quatro principais projetos que a MAV vem realizando. Se quiser saber mais sobre eles, basta acessar a aba <a href="http://www.mavba.org.br/conteudo.asp?id=1" target="_blank" rel="noopener noreferrer" style="color: #003d66">“Quem Somos”`,
    5: `<strong>Redes sociais da MAV:</strong><br>
        <ul style="padding-left: 20px; font-size: 14px;">
        <li><a href="https://pt-br.facebook.com/movimentoaguaevida/" target="_blank" rel="noopener noreferrer" class="no-underline">
    <i class="fa-brands fa-square-facebook" style="text-decoration: none;"></i>
    Facebook
  </a>
</li>
        <li><a href="https://www.instagram.com/movimentoaguaevida/?hl=pt-br" target="_blank" rel="noopener noreferrer" class="no-underline">
  <i class="fa-brands fa-square-instagram"></i>
  Instagram
</a>
</li>
<li>
  <a href="https://www.youtube.com/channel/UCUmmZQeeIjkGEbOSmip6r3g/videos" target="_blank" rel="noopener noreferrer" class="no-underline">
    <i class="fa-brands fa-square-youtube"></i>
    YouTube
  </a>
</li>
      </ul>`
  };

  const chatButton = document.getElementById("chat-button");
  const chatWindow = document.getElementById("chat-window");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");
  
  const delayMessage = 1500;

  function showMenu() {
  const menuHtml = `
    <p>Olá, o que gostaria de saber sobre o grupo MAV?</p>
    <ul style="list-style:none; padding-left:0;">
      <li><button class="option-btn" data-value="1">1. O que é o grupo MAV</button></li>
      <li><button class="option-btn" data-value="2">2. Pontos de coleta da MAV</button></li>
      <li><button class="option-btn" data-value="3">3. Como apoiar a MAV</button></li>
      <li><button class="option-btn" data-value="4">4. Projetos da MAV</button></li>
      <li><button class="option-btn" data-value="5">5. Redes sociais do grupo MAV</button></li>
    </ul>
  `;
  showBotMessage(menuHtml);

  document.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const val = btn.getAttribute("data-value");
      simulateUserChoice(val);
    });
  });
}

function simulateUserChoice(value) {
  showUserMessage(perguntas[value] || value);
  
  const typingIndicator = showTypingIndicator();

  setTimeout(() => {
    hideTypingIndicator(typingIndicator);

    const resposta = respostas[value];
    if (resposta) {
      showBotMessage(resposta);
    } else {
      showBotMessage("Opção inválida. Por favor, escolha um número de 1 a 5.");
    }
  }, delayMessage);
}


  chatButton.addEventListener("click", () => {
    const isHidden = chatWindow.style.display === "none" || chatWindow.style.display === "";

    if (isHidden) {
      chatWindow.style.display = "flex";
      clearMessages();
      
      const initialIndicator = showTypingIndicator();
      setTimeout( () => {
        hideTypingIndicator(initialIndicator);
        showMenu("Olá, o que gostaria de saber sobre o grupo MAV?<br>1. O que é o grupo MAV<br>2. Pontos de coleta da MAV<br>3. Como apoiar a MAV<br>4. Projetos da MAV<br>5. Redes sociais do grupo MAV");
      },delayMessage);

    } else {
      chatWindow.style.display = "none";
    }
  });

  sendButton.addEventListener("click", sendMessage);

  userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
  });

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

  function sendMessage() {
    const value = userInput.value.trim();
    if (!value) return;
    showUserMessage(value);
    userInput.value = "";

    const typingIndicator = showTypingIndicator();

  
    setTimeout(() => {

      hideTypingIndicator(typingIndicator);

      const resposta = respostas[value];
      if (resposta) {
      showBotMessage(resposta);
      } else {
      showBotMessage("Opção inválida. Por favor, digite um número de 1 a 5.");
      
      }

    },delayMessage)

  }


  function clearMessages() { 
    document.getElementById("chat-messages").innerHTML = "";
  }
});
  window.addEventListener('DOMContentLoaded', () => {
    chatWindow.style.display = 'flex';
    clearMessages();
    showMenu();
});