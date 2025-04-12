let balance = 0;
let clickPower = 1;
let upgradeCost = 10;

function updateDisplay() {
  document.getElementById("balance").textContent = balance.toFixed(2);
  document.getElementById("upgrade-cost").textContent = upgradeCost;
  document.getElementById("power").textContent = clickPower;
}

function mine() {
  balance += clickPower;
  updateDisplay();
}

function upgrade() {
  if (balance >= upgradeCost) {
    balance -= upgradeCost;
    clickPower += 1;
    upgradeCost = Math.floor(upgradeCost * 1.5);
    updateDisplay();
  } else {
    alert("Недостатньо ALT для апгрейду!");
  }
}

window.onload = updateDisplay;
