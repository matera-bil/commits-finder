document.getElementById("buscar").addEventListener("click", () => {
  const numeroCard = document.getElementById("cardNumber").value.trim();

  if (numeroCard === "") {
    alert("Por favor, informe o número do card.");
    return;
  }

  const url = `https://sources.matera.com/jira/issues/${numeroCard}/commits`;

  chrome.tabs.create({ url });
});
