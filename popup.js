document.addEventListener("DOMContentLoaded", () => {
  const cardInput = document.getElementById("cardNumber");
  const searchButton = document.getElementById("buscar");
  const themeToggleButton = document.getElementById("theme-toggle");
  
  const totalThemes = 4; // Total de temas definidos no themes.css

  // Função para aplicar o tema
  const applyTheme = (themeNumber) => {
    document.body.className = `theme-${themeNumber}`;
  };

  // Carrega o tema salvo ao iniciar
  chrome.storage.sync.get("selectedTheme", (data) => {
    const theme = data.selectedTheme || 1; // Padrão é o tema 1
    applyTheme(theme);
  });

  // Lógica para buscar os commits
  const performSearch = () => {
    const raw = cardInput.value;
    const numeroCard = raw.replace(/\s+/g, "").toUpperCase();
  
    if (numeroCard === "") {
      alert("Por favor, informe o número do card.");
      return;
    }
  
    const url = `https://sources.matera.com/jira/issues/${encodeURIComponent(numeroCard)}/commits`;
    chrome.tabs.create({ url });
  };

  // Event Listeners
  searchButton.addEventListener("click", performSearch);

  cardInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      performSearch();
    }
  });

  themeToggleButton.addEventListener("click", () => {
    chrome.storage.sync.get("selectedTheme", (data) => {
      let currentTheme = data.selectedTheme || 1;
      let nextTheme = currentTheme >= totalThemes ? 1 : currentTheme + 1;
      
      applyTheme(nextTheme);
      
      // Salva a nova escolha
      chrome.storage.sync.set({ selectedTheme: nextTheme });
    });
  });
});