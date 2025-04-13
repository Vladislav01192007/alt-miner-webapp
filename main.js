let altCoins = 0;
let perClick = 1;

const altCount = document.getElementById("altCount");
const mineButton = document.getElementById("mineButton");

// Список апгрейдів
const upgrades = {
  upgrade1: { bonus: 1, cost: 50 },
  upgrade2: { bonus: 5, cost: 200 },
};

// Оновлення відображення ALT
function updateDisplay() {
  altCount.innerText = altCoins;
  for (let key in upgrades) {
    const upgrade = upgrades[key];
    const upgradeElement = document.querySelector(`#${key} strong`);
    if (upgradeElement) {
      upgradeElement.innerText = `Cost: ${upgrade.cost} ALT`;
    }
  }
}

// Дія кнопки "Mine ALT"
mineButton.addEventListener("click", () => {
  altCoins += perClick;
  updateDisplay();
});

// Покупка апгрейду
function buyUpgrade(id) {
  const upgrade = upgrades[id];
  if (!upgrade) return;

  if (altCoins >= upgrade.cost) {
    altCoins -= upgrade.cost;
    perClick += upgrade.bonus;
    upgrade.cost = Math.floor(upgrade.cost * 1.5);
    updateDisplay();
  } else {
    alert("Недостатньо ALT для покупки апгрейду!");
  }
}

// Ініціалізація
updateDisplay();
