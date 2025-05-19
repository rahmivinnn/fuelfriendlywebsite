// Simple standalone chatbot script
(function() {
  // Create chatbot button
  const button = document.createElement('div');
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.width = '50px';
  button.style.height = '50px';
  button.style.borderRadius = '50%';
  button.style.backgroundColor = '#3ECF8E';
  button.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  button.style.cursor = 'pointer';
  button.style.zIndex = '999999';
  button.style.display = 'flex';
  button.style.alignItems = 'center';
  button.style.justifyContent = 'center';
  button.style.overflow = 'hidden';
  
  // Add logo
  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width: 100%; height: 100%;">
      <circle cx="50" cy="50" r="48" fill="#3ECF8E" stroke="#3ECF8E" stroke-width="2"/>
      <path d="M50 20 C55 30 65 40 65 55 C65 70 55 80 50 80 C45 80 35 70 35 55 C35 40 45 30 50 20 Z" fill="white"/>
      <path d="M50 40 C53 45 58 50 55 60 C52 70 48 65 45 60 C42 55 47 50 50 40 Z" fill="#3ECF8E"/>
    </svg>
  `;
  
  // Create chatbot window
  const chatWindow = document.createElement('div');
  chatWindow.style.position = 'fixed';
  chatWindow.style.bottom = '80px';
  chatWindow.style.right = '20px';
  chatWindow.style.width = '320px';
  chatWindow.style.height = '450px';
  chatWindow.style.borderRadius = '12px';
  chatWindow.style.backgroundColor = '#fff';
  chatWindow.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
  chatWindow.style.zIndex = '999999';
  chatWindow.style.overflow = 'hidden';
  chatWindow.style.display = 'none';
  chatWindow.style.flexDirection = 'column';
  
  // Create header
  const header = document.createElement('div');
  header.style.backgroundColor = '#3ECF8E';
  header.style.color = 'white';
  header.style.padding = '12px';
  header.style.display = 'flex';
  header.style.justifyContent = 'space-between';
  header.style.alignItems = 'center';
  
  header.innerHTML = `
    <div style="display: flex; align-items: center;">
      <div style="width: 24px; height: 24px; margin-right: 8px; background-color: white; border-radius: 50%; padding: 2px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width: 100%; height: 100%;">
          <circle cx="50" cy="50" r="48" fill="#3ECF8E" stroke="#3ECF8E" stroke-width="2"/>
          <path d="M50 20 C55 30 65 40 65 55 C65 70 55 80 50 80 C45 80 35 70 35 55 C35 40 45 30 50 20 Z" fill="white"/>
          <path d="M50 40 C53 45 58 50 55 60 C52 70 48 65 45 60 C42 55 47 50 50 40 Z" fill="#3ECF8E"/>
        </svg>
      </div>
      <span>FuelBot Assistant</span>
    </div>
    <div>
      <button id="chatbot-close" style="background: none; border: none; color: white; cursor: pointer; font-size: 18px;">×</button>
    </div>
  `;
  
  // Create messages area
  const messagesArea = document.createElement('div');
  messagesArea.style.flex = '1';
  messagesArea.style.overflowY = 'auto';
  messagesArea.style.padding = '16px';
  messagesArea.style.backgroundColor = '#fff';
  
  // Add welcome message
  messagesArea.innerHTML = `
    <div style="margin-bottom: 16px; display: flex; justify-content: flex-start;">
      <div style="width: 32px; height: 32px; margin-right: 8px; background-color: white; border-radius: 50%; overflow: hidden; display: flex; align-items: center; justify-content: center;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width: 100%; height: 100%;">
          <circle cx="50" cy="50" r="48" fill="#3ECF8E" stroke="#3ECF8E" stroke-width="2"/>
          <path d="M50 20 C55 30 65 40 65 55 C65 70 55 80 50 80 C45 80 35 70 35 55 C35 40 45 30 50 20 Z" fill="white"/>
          <path d="M50 40 C53 45 58 50 55 60 C52 70 48 65 45 60 C42 55 47 50 50 40 Z" fill="#3ECF8E"/>
        </svg>
      </div>
      <div style="max-width: 80%; padding: 12px; border-radius: 8px; background-color: #f5f5f5; border: 1px solid #e0e0e0;">
        <p style="margin: 0 0 4px 0;">Hello! I'm FuelBot, your AI assistant. How can I help you today?</p>
        <span style="font-size: 12px; opacity: 0.7;">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  `;
  
  // Create input area
  const inputArea = document.createElement('div');
  inputArea.style.padding = '12px';
  inputArea.style.backgroundColor = '#1E293B';
  inputArea.style.display = 'flex';
  inputArea.style.alignItems = 'center';
  
  inputArea.innerHTML = `
    <input type="text" placeholder="Type your message..." style="flex: 1; padding: 8px 12px; border: none; border-radius: 4px; outline: none; background-color: #1E293B; color: white;">
    <button style="width: 36px; height: 36px; margin-left: 8px; background-color: #3ECF8E; color: white; border: none; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    </button>
  `;
  
  // Assemble chatbot
  chatWindow.appendChild(header);
  chatWindow.appendChild(messagesArea);
  chatWindow.appendChild(inputArea);
  
  // Add to document
  document.body.appendChild(button);
  document.body.appendChild(chatWindow);
  
  // Add event listeners
  button.addEventListener('click', function() {
    chatWindow.style.display = 'flex';
  });
  
  document.getElementById('chatbot-close').addEventListener('click', function() {
    chatWindow.style.display = 'none';
  });
})();
