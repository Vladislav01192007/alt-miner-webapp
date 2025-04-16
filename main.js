let altCoins = 0;
let perClick = 1;
let altPerSecond = 0;

const coinCount = document.getElementById("coinCount");
const mineButton = document.getElementById("mineButton");

// === УПГРЕЙДИ ===
const upgrades = [
  { id: "upgrade1", cost: 15, bonus: 1 },
  { id: "upgrade2", cost: 75, bonus: 5 },
  { id: "upgrade3", cost: 300, bonus: 15 }
];

// === ОНОВЛЕННЯ ІНТЕРФЕЙСУ ===
function updateDisplay() {
  coinCount.textContent = altCoins.toFixed(1);
  upgrades.forEach(upg => {
    const upgradeElem = document.getElementById(upg.id);
    if (upgradeElem) {
      const span = upgradeElem.querySelector("span");
      span.innerHTML = `+${upg.bonus} ALT/sec — <strong>Cost: ${upg.cost} ALT</strong>`;
    }
  });
}

// === МАЙНІНГ ПО КЛІКУ ===
function mine() {
  altCoins += perClick;
  updateDisplay();
}

mineButton.addEventListener("click", mine);

// === КУПІВЛЯ АПГРЕЙДУ ===
function buyUpgrade(id) {
  const upgrade = upgrades.find(u => u.id === id);
  if (!upgrade) return;

  if (altCoins >= upgrade.cost) {
    altCoins -= upgrade.cost;
    altPerSecond += upgrade.bonus;
    upgrade.cost = Math.floor(upgrade.cost * 1.6);
    updateDisplay();
  } else {
    alert("Not enough ALT coins!");
  }
}

upgrades.forEach(upg => {
  const button = document.querySelector(`#${upg.id} button`);
  if (button) {
    button.addEventListener("click", () => buyUpgrade(upg.id));
  }
});

// === АВТОМАЙНІНГ ===
function autoMine() {
  altCoins += altPerSecond / 10;
  updateDisplay();
}
setInterval(autoMine, 100);

// === ПЕРЕМИКАННЯ ВКЛАДОК ===
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
    const tabId = btn.getAttribute("data-tab");
    document.getElementById(tabId).classList.add("active");
  });
});

// === СТАРТОВИЙ ЕКРАН ===
const startBtn = document.getElementById("startBtn");
const authScreen = document.getElementById("auth-screen");
const gameScreen = document.getElementById("game-screen");

startBtn.addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  if (username.length < 2) {
    alert("Please enter a valid username.");
    return;
  }

  // Можна додати збереження логіну в localStorage
  authScreen.classList.remove("active");
  gameScreen.classList.add("active");
});

// === ІНІЦІАЛІЗАЦІЯ ===
updateDisplay();
