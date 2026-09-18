// Fecha del cumpleaños: Sábado 24 de Octubre, 5:00 pm
// Ajusta el año si hace falta.
const EVENT_DATE = new Date("2026-10-24T17:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = EVENT_DATE - now;

  let days = 0, hours = 0, minutes = 0;
  if (diff > 0) {
    days = Math.floor(diff / (1000 * 60 * 60 * 24));
    hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    minutes = Math.floor((diff / (1000 * 60)) % 60);
  }

  const pad = (n) => String(n).padStart(2, "0");

  document.querySelectorAll('[data-unit="days"]').forEach((el) => (el.textContent = pad(days)));
  document.querySelectorAll('[data-unit="hours"]').forEach((el) => (el.textContent = pad(hours)));
  document.querySelectorAll('[data-unit="minutes"]').forEach((el) => (el.textContent = pad(minutes)));
}

updateCountdown();
setInterval(updateCountdown, 1000 * 30); // refresca cada 30s
