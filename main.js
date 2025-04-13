let altCoins = 0;
let perClick = 1;

const altCount = document.getElementById("altCount");
const mineButton = document.getElementById("mineButton");

const upgrades = [
  { id: "upgrade1", cost: 10, bonus: 1 },
  { id: "upgrade2", cost: 50, bonus: 3 },
  { id: "upgrade3", cost: 200, bonus: 10 }
];

function updateDisplay() {
  altCount.textContent = altCoins;
  upgrades.forEach(upg => {
    const upgradeElem = document.getElementById(upg.id);
    if (upgradeElem) {
      const span = upgradeElem.querySelector("span");
      span.innerHTML = `+${upg.bonus} ALT/sec — <strong>Cost: ${upg.cost} ALT</strong>`;
    }
  });
}

function mine() {
  altCoins += perClick;
  updateDisplay();
}

function buyUpgrade(id) {
  const upgrade = upgrades.find(u => u.id === id);
  if (!upgrade) return;

  if (altCoins >= upgrade.cost) {
    altCoins -= upgrade.cost;
    perClick += upgrade.bonus;
    upgrade.cost = Math.floor(upgrade.cost * 1.5);
    updateDisplay();
  } else {
    alert("Недостатньо ALT coins!");
  }
}

mineButton.addEventListener("click", mine);

// Прив’язуємо кнопки для кожного апгрейду
upgrades.forEach(upg => {
  const button = document.querySelector(`#${upg.id} button`);
  if (button) {
    button.addEventListener("click", () => buyUpgrade(upg.id));
  }
});

updateDisplay();
