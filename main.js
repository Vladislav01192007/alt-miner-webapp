// ==== Глобальні змінні ====
let alt = 0;
let altPerSecond = 0;
let upgrades = [
  { id: "upgrade1", cost: 10, value: 1 },
  { id: "upgrade2", cost: 50, value: 3 },
  { id: "upgrade3", cost: 200, value: 10 },
];

// ==== Запуск гри після авторизації ====
document.getElementById("startBtn").addEventListener("click", () => {
  const name = document.getElementById("usernameInput").value.trim();
  if (name.length > 0) {
    document.getElementById("auth-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    startMiningLoop();
  } else {
    alert("Please enter your name to start.");
  }
});

// ==== Майнімо ALT ====
document.getElementById("mineButton").addEventListener("click", () => {
  alt++;
  updateAltDisplay();
});

// ==== Покупка апгрейдів ====
upgrades.forEach((upgrade, index) => {
  const btn = document.querySelector(`#${upgrade.id} button`);
  btn.addEventListener("click", () => {
    if (alt >= upgrade.cost) {
      alt -= upgrade.cost;
      altPerSecond += upgrade.value;
      upgrade.cost = Math.floor(upgrade.cost * 1.7); // Збільшуємо ціну
      document.getElementById(`${upgrade.id}Cost`).textContent = upgrade.cost;
      updateAltDisplay();
    } else {
      alert("Not enough ALT!");
    }
  });
});

// ==== Автоматичний майнінг ====
function startMiningLoop() {
  setInterval(() => {
    alt += altPerSecond;
    updateAltDisplay();
  }, 1000);
}

// ==== Оновлення балансу ALT ====
function updateAltDisplay() {
  document.getElementById("altCount").textContent = alt;
}

// ==== Перемикання вкладок ====
function showTab(tabId) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.style.display = "none";
  });
  document.getElementById(tabId).style.display = "block";
}
