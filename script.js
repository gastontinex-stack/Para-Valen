const screens = [...document.querySelectorAll(".screen")];
const toast = document.getElementById("toast");
let toastTimer;

function showScreen(id) {
  const target = document.getElementById(id);
  if (!target) return;
  screens.forEach(screen => {
    const active = screen === target;
    screen.classList.toggle("active", active);
    screen.setAttribute("aria-hidden", String(!active));
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => showScreen(button.dataset.go));
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

document.querySelectorAll(".surprise-card").forEach(card => {
  card.addEventListener("click", () => {
    document.getElementById("surprise-message").textContent = card.dataset.message;
    card.classList.add("opened");
    showToast("Toma nota de eso ♡");
  });
});

document.getElementById("reveal-question").addEventListener("click", () => {
  showScreen("pregunta");
  burstHearts(24);
});

document.getElementById("yes-button").addEventListener("click", () => {
  showScreen("respuesta-si");
  burstHearts(60);
});

let yesClickCount = 0;

document.getElementById("time-button").addEventListener("click", () => {
  yesClickCount++;

  const yesButton = document.getElementById("yes-button");

  showScreen("pregunta");

  const scale = Math.min(
    1 + Math.pow(yesClickCount, 1.7) * 0.5,
    30
  );

  yesButton.style.setProperty("--yes-scale", scale);
  yesButton.classList.add("growing-yes");

  if (yesClickCount >= 5) {
    yesButton.classList.add("full-screen-yes");
  }
});

function burstHearts(amount = 18) {
  const layer = document.querySelector(".floating-hearts");
  const symbols = ["♡", "♥", "✦", "❤"];
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${14 + Math.random() * 22}px`;
    heart.style.animationDuration = `${3 + Math.random() * 3}s`;
    layer.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove(), { once: true });
  }
}

setInterval(() => {
  if (document.hidden) return;
  const layer = document.querySelector(".floating-hearts");
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = Math.random() > .5 ? "♡" : "♥";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${12 + Math.random() * 12}px`;
  heart.style.animationDuration = `${7 + Math.random() * 4}s`;
  layer.appendChild(heart);
  heart.addEventListener("animationend", () => heart.remove(), { once: true });
}, 1700);

// Control de audio de fondo continuo desde la primera interacción del usuario
const audio = document.getElementById("love-song");

function iniciarCancion() {
  if (!audio) return;
  if (audio.paused) {
    audio.play().catch(() => {});
  }
}

// Escuchar cualquier toque o clic en la página para iniciar la canción
document.addEventListener("click", iniciarCancion, { once: true });
document.addEventListener("pointerdown", iniciarCancion, { once: true });