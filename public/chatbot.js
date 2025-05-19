// Simple script to add a chatbot to the page
document.addEventListener('DOMContentLoaded', function() {
  // Create the chatbot button
  const chatbotButton = document.createElement('div');
  chatbotButton.id = 'chatbot-button';
  chatbotButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="none" stroke="#3ECF8E" stroke-width="4"/>
      <path d="M50 20 C55 30 65 40 65 55 C65 70 55 80 50 80 C45 80 35 70 35 55 C35 40 45 30 50 20 Z" fill="#3ECF8E"/>
      <path d="M50 40 C53 45 58 50 55 60 C52 70 48 65 45 60 C42 55 47 50 50 40 Z" fill="white"/>
    </svg>
  `;
  document.body.appendChild(chatbotButton);

  // Create the chatbot window (initially hidden)
  const chatbotWindow = document.createElement('div');
  chatbotWindow.id = 'chatbot-window';
  chatbotWindow.style.display = 'none';
  chatbotWindow.innerHTML = `
    <div id="chatbot-header">
      <div id="chatbot-title">
        <div id="chatbot-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#3ECF8E" stroke-width="4"/>
            <path d="M50 20 C55 30 65 40 65 55 C65 70 55 80 50 80 C45 80 35 70 35 55 C35 40 45 30 50 20 Z" fill="#3ECF8E"/>
            <path d="M50 40 C53 45 58 50 55 60 C52 70 48 65 45 60 C42 55 47 50 50 40 Z" fill="white"/>
          </svg>
        </div>
        <span>FuelBot Assistant</span>
      </div>
      <div id="chatbot-controls">
        <button id="chatbot-minimize">−</button>
        <button id="chatbot-close">×</button>
      </div>
    </div>
    <div id="chatbot-messages">
      <div class="chatbot-message bot">
        <div class="chatbot-avatar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#3ECF8E" stroke-width="4"/>
            <path d="M50 20 C55 30 65 40 65 55 C65 70 55 80 50 80 C45 80 35 70 35 55 C35 40 45 30 50 20 Z" fill="#3ECF8E"/>
            <path d="M50 40 C53 45 58 50 55 60 C52 70 48 65 45 60 C42 55 47 50 50 40 Z" fill="white"/>
          </svg>
        </div>
        <div class="chatbot-bubble">
          <p>Hello! I'm FuelBot, your AI assistant. How can I help you today?</p>
          <span class="chatbot-time">04:01 PM</span>
        </div>
      </div>
    </div>
    <div id="chatbot-input">
      <input type="text" placeholder="Type your message..." id="chatbot-message-input">
      <button id="chatbot-send">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </div>
    <div id="chatbot-suggestions">
      <p>Suggested questions:</p>
      <div id="chatbot-suggestion-buttons">
        <button>Where is the nearest fuel station?</button>
        <button>How do I add my station to the platform?</button>
        <button>What payment methods are accepted?</button>
        <button>How do I check my earnings?</button>
        <button>How to contact customer support?</button>
      </div>
    </div>
  `;
  document.body.appendChild(chatbotWindow);

  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    #chatbot-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: white;
      border: 2px solid #3ECF8E;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      cursor: pointer;
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
    }

    #chatbot-window {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 350px;
      height: 500px;
      border-radius: 12px;
      background-color: white;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      z-index: 999999;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    #chatbot-header {
      background-color: #3ECF8E;
      color: white;
      padding: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    #chatbot-title {
      display: flex;
      align-items: center;
    }

    #chatbot-logo {
      width: 24px;
      height: 24px;
      margin-right: 8px;
      background-color: white;
      border-radius: 50%;
      padding: 2px;
    }

    #chatbot-controls {
      display: flex;
      gap: 8px;
    }

    #chatbot-controls button {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 18px;
    }

    #chatbot-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      background-color: #f9f9f9;
    }

    .chatbot-message {
      margin-bottom: 16px;
      display: flex;
    }

    .chatbot-message.bot {
      justify-content: flex-start;
    }

    .chatbot-message.user {
      justify-content: flex-end;
    }

    .chatbot-avatar {
      width: 32px;
      height: 32px;
      margin-right: 8px;
      background-color: white;
      border-radius: 50%;
      border: 1px solid #3ECF8E;
      padding: 4px;
      flex-shrink: 0;
    }

    .chatbot-user-avatar {
      width: 32px;
      height: 32px;
      margin-left: 8px;
      background-color: #3ECF8E;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 14px;
      flex-shrink: 0;
    }

    .chatbot-bubble {
      max-width: 80%;
      padding: 12px;
      border-radius: 8px;
      background-color: white;
      border: 1px solid #e0e0e0;
    }

    .chatbot-message.user .chatbot-bubble {
      background-color: #3ECF8E;
      color: white;
      border: none;
    }

    .chatbot-time {
      font-size: 12px;
      opacity: 0.7;
      display: block;
      margin-top: 4px;
    }

    #chatbot-input {
      padding: 12px;
      background-color: white;
      border-top: 1px solid #e0e0e0;
      display: flex;
      align-items: center;
    }

    #chatbot-message-input {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      outline: none;
    }

    #chatbot-send {
      width: 36px;
      height: 36px;
      margin-left: 8px;
      background-color: #3ECF8E;
      color: white;
      border: none;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    #chatbot-suggestions {
      padding: 0 12px 12px 12px;
      background-color: white;
    }

    #chatbot-suggestions p {
      font-size: 12px;
      color: #666;
      margin-bottom: 8px;
    }

    #chatbot-suggestion-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    #chatbot-suggestion-buttons button {
      font-size: 12px;
      background-color: #f0f0f0;
      border: none;
      border-radius: 16px;
      padding: 4px 12px;
      color: #333;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  // Add event listeners
  chatbotButton.addEventListener('click', function() {
    chatbotWindow.style.display = 'flex';
  });

  document.getElementById('chatbot-close').addEventListener('click', function() {
    chatbotWindow.style.display = 'none';
  });

  let minimized = false;
  document.getElementById('chatbot-minimize').addEventListener('click', function() {
    const messages = document.getElementById('chatbot-messages');
    const input = document.getElementById('chatbot-input');
    const suggestions = document.getElementById('chatbot-suggestions');

    if (minimized) {
      chatbotWindow.style.height = '500px';
      messages.style.display = 'block';
      input.style.display = 'flex';
      suggestions.style.display = 'block';
      this.textContent = '−';
    } else {
      chatbotWindow.style.height = '60px';
      messages.style.display = 'none';
      input.style.display = 'none';
      suggestions.style.display = 'none';
      this.textContent = '+';
    }

    minimized = !minimized;
  });

  // Handle sending messages
  function sendMessage() {
    const input = document.getElementById('chatbot-message-input');
    const message = input.value.trim();

    if (message) {
      // Add user message
      const messagesContainer = document.getElementById('chatbot-messages');
      const userMessage = document.createElement('div');
      userMessage.className = 'chatbot-message user';

      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      userMessage.innerHTML = `
        <div class="chatbot-bubble">
          <p>${message}</p>
          <span class="chatbot-time">${time}</span>
        </div>
        <div class="chatbot-user-avatar">U</div>
      `;

      messagesContainer.appendChild(userMessage);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      // Clear input
      input.value = '';

      // Simulate bot response
      setTimeout(function() {
        const botMessage = document.createElement('div');
        botMessage.className = 'chatbot-message bot';

        let response = "I'm not sure I understand your question. Could you please rephrase?";

        // Simple pattern matching
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('nearest') || lowerMessage.includes('nearby')) {
          response = "You can find nearby stations by using our 'Nearby Stations' feature.";
        } else if (lowerMessage.includes('add') && lowerMessage.includes('station')) {
          response = "To add your station to our platform, go to the 'Station Management' section.";
        } else if (lowerMessage.includes('payment')) {
          response = "We accept various payment methods including credit/debit cards, PayPal, and more.";
        } else if (lowerMessage.includes('support') || lowerMessage.includes('help')) {
          response = "For customer support, please visit the 'Help & Support' section.";
        }

        botMessage.innerHTML = `
          <div class="chatbot-avatar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="#3ECF8E" stroke-width="4"/>
              <path d="M50 20 C55 30 65 40 65 55 C65 70 55 80 50 80 C45 80 35 70 35 55 C35 40 45 30 50 20 Z" fill="#3ECF8E"/>
              <path d="M50 40 C53 45 58 50 55 60 C52 70 48 65 45 60 C42 55 47 50 50 40 Z" fill="white"/>
            </svg>
          </div>
          <div class="chatbot-bubble">
            <p>${response}</p>
            <span class="chatbot-time">${time}</span>
          </div>
        `;

        messagesContainer.appendChild(botMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 1000);
    }
  }

  document.getElementById('chatbot-send').addEventListener('click', sendMessage);

  document.getElementById('chatbot-message-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  // Handle suggestion buttons
  const suggestionButtons = document.querySelectorAll('#chatbot-suggestion-buttons button');
  suggestionButtons.forEach(button => {
    button.addEventListener('click', function() {
      document.getElementById('chatbot-message-input').value = this.textContent;
      sendMessage();
    });
  });
});
