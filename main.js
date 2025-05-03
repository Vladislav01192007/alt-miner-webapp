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

// ==== Оновлення відображення ====
function updateAltDisplay() {
  document.getElementById("altCount").textContent = alt;
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

// ==== АвтоМайнер по 1 ALT/сек протягом 5 годин ====
const minerButton = document.getElementById("startMinerButton");
let miningInterval;
const miningDuration = 5 * 60 * 60 * 1000; // 5 годин у мс
const miningRate = 1000; // 1 секунда

function startMiner() {
  const now = Date.now();
  const lastStart = parseInt(localStorage.getItem("lastMinerStartTime") || "0");

  if (now - lastStart < miningDuration) {
    alert("Майнер вже працює або ще не готовий. Зачекай 5 годин.");
    return;
  }

  localStorage.setItem("lastMinerStartTime", now.toString());
  let elapsed = 0;
  minerButton.disabled = true;

  miningInterval = setInterval(() => {
    elapsed += miningRate;
    alt += 1;
    updateAltDisplay();
    saveProgress();

    if (elapsed >= miningDuration) {
      clearInterval(miningInterval);
      minerButton.disabled = false;
    }
  }, miningRate);
}

window.addEventListener("load", () => {
  const lastStart = parseInt(localStorage.getItem("lastMinerStartTime") || "0");
  const now = Date.now();
  const timePassed = now - lastStart;

  if (timePassed < miningDuration) {
    let elapsed = timePassed;
    minerButton.disabled = true;

    miningInterval = setInterval(() => {
      elapsed += miningRate;
      alt += 1;
      updateAltDisplay();
      saveProgress();

      if (elapsed >= miningDuration) {
        clearInterval(miningInterval);
        minerButton.disabled = false;
      }
    }, miningRate);
  } else {
    minerButton.disabled = false;
  }
});

minerButton.addEventListener("click", startMiner);

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

  if (tabId === 'socials-tab') {
    const socialsList = document.querySelector('.socials-list');
    if (socialsList) {
      socialsList.classList.remove('animate');
      void socialsList.offsetWidth;
      socialsList.classList.add('animate');
    }
  }
}
