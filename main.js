let altCoins = 0;
let perClick = 1;

const coinDisplay = document.getElementById("coinCount");
const mineBtn = document.getElementById("mineBtn");

const upgrades = [
  { id: "upgrade1", cost: 10, bonus: 1 },
  { id: "upgrade2", cost: 50, bonus: 3 },
  { id: "upgrade3", cost: 200, bonus: 10 },
];

function updateDisplay() {
  coinDisplay.innerText = altCoins;
}

function mine() {
  altCoins += perClick;
  updateDisplay();
}

function buyUpgrade(id) {
  const upgrade = upgrades.find(u => u.id === id);
  if (altCoins >= upgrade.cost) {
    altCoins -= upgrade.cost;
    perClick += upgrade.bonus;
    upgrade.cost = Math.floor(upgrade.cost * 1.5); // збільшити ціну після купівлі
    document.getElementById(id + "Cost").innerText = upgrade.cost;
    updateDisplay();
  } else {
    alert("Недостатньо ALT coins!");
  }
}

mineBtn.addEventListener("click", mine);

upgrades.forEach(upg => {
  document.getElementById(upg.id).addEventListener("click", () => buyUpgrade(upg.id));
});
