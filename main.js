// ==== Глобальні змінні ====
let alt = 0;
let altPerSecond = 0;
let upgrades = [
  { id: "upgrade1", cost: 10, value: 1 },
  { id: "upgrade2", cost: 50, value: 3 },
  { id: "upgrade3", cost: 200, value: 10 },
];

// ==== Завантаження прогресу ====
function loadProgress() {
  const savedAlt = localStorage.getItem("alt");
  const savedAltPerSec = localStorage.getItem("altPerSecond");
  const savedUpgrades = JSON.parse(localStorage.getItem("upgrades"));

  if (savedAlt !== null) alt = parseInt(savedAlt);
  if (savedAltPerSec !== null) altPerSecond = parseInt(savedAltPerSec);
  if (savedUpgrades !== null) {
    upgrades = upgrades.map((upgrade, index) => ({
      ...upgrade,
      cost: savedUpgrades[index]?.cost ?? upgrade.cost,
    }));
  }

  updateAltDisplay();
  upgrades.forEach(upg => {
    document.getElementById(`${upg.id}Cost`).textContent = upg.cost;
  });
}

// ==== Збереження прогресу ====
function saveProgress() {
  localStorage.setItem("alt", alt);
  localStorage.setItem("altPerSecond", altPerSecond);
  localStorage.setItem("upgrades", JSON.stringify(upgrades));
}

// ==== Початок гри ====
window.addEventListener("load", () => {
  document.getElementById("game-screen").style.display = "block";
  loadProgress();
  startMiningLoop();
});

// ==== Кнопка майнінгу ====
document.getElementById("mineButton").addEventListener("click", () => {
  alt++;
  updateAltDisplay();
  saveProgress();
});

// ==== Покупка апгрейдів ====
upgrades.forEach(upgrade => {
  const btn = document.querySelector(`#${upgrade.id} button`);
  btn.addEventListener("click", () => {
    if (alt >= upgrade.cost) {
      alt -= upgrade.cost;
      altPerSecond += upgrade.value;
      upgrade.cost = Math.floor(upgrade.cost * 1.7);
      document.getElementById(`${upgrade.id}Cost`).textContent = upgrade.cost;
      updateAltDisplay();
      saveProgress();
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
    saveProgress();
  }, 1000);
}

// ==== Оновлення відображення ====
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
