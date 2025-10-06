document.getElementById("buscar").addEventListener("click", () => {
  const raw = document.getElementById("cardNumber").value;
  
  // remove espaços, mantém letras, números e '-' e converte para maiúsculas
  const numeroCard = raw.replace(/\s+/g, "").toUpperCase();

  if (numeroCard === "") {
    alert("Por favor, informe o número do card.");
    return;
  }

  const url = `https://sources.matera.com/jira/issues/${encodeURIComponent(numeroCard)}/commits`;

  chrome.tabs.create({ url });
});