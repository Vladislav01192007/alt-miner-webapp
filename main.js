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
const mineButton = document.getElementById("mineButton");
const coinsContainer = document.getElementById("coins-container");

mineButton.addEventListener("click", () => {
  alt++;
  updateAltDisplay();
  saveProgress();
  spawnCoin();
});

function spawnCoin() {
  const coin = document.createElement('div');
  coin.classList.add('coin');
  coin.textContent = '🪙';
  coinsContainer.appendChild(coin);

  setTimeout(() => {
    coin.remove();
  }, 1000);
}

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
  if (tabId === 'quiz-tab') {
    currentQuestion = 0;
    quizScore = 0;
    loadQuiz();
  }
}

// ==== ALT-геній (Міні-гра) ====
const quizData = [
  {
    question: "Що таке ALTSETING Token?",
    options: ["Нова криптовалюта", "Назва піци", "Гра про хом’яків"],
    correct: 0
  },
  {
    question: "Скільки NFT-майнерів планується?",
    options: ["50", "100", "500"],
    correct: 1
  },
];

let currentQuestion = 0;
let quizScore = 0;

function loadQuiz() {
  const q = quizData[currentQuestion];
  document.getElementById('quiz-question').textContent = q.question;
  const optionsDiv = document.getElementById('quiz-options');
  optionsDiv.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(idx);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(index) {
  if (index === quizData[currentQuestion].correct) {
    quizScore++;
    alert("✅ Правильно!");
  } else {
    alert("❌ Ні, подумай ще.");
  }

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuiz();
  } else {
    const reward = quizScore * 5;
    alt += reward;
    updateAltDisplay();
    saveProgress();
    document.getElementById('quiz-question').textContent = `Тест завершено! Результат: ${quizScore}/${quizData.length}`;
    document.getElementById('quiz-options').innerHTML = `🎉 Ти отримав ${reward} ALT!`;
  }
}

// ==== Функція для спавну монетки при кліку ====
const coinsContainer = document.getElementById("coins-container");

function spawnCoin() {
  const coin = document.createElement('div');
  coin.classList.add('coin');
  coin.textContent = '🪙';
  coinsContainer.appendChild(coin);

  setTimeout(() => {
    coin.remove();
  }, 1000);
}

// Блокуємо скрол або рух на кнопці при натисканні
mineButton.addEventListener('touchmove', (e) => {
  e.preventDefault();
}, { passive: false });

