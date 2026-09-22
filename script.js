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

// ============ ESCALADO DEL DISEÑO DESKTOP ============
// El diseño desktop es un lienzo fijo de 1440px. En pantallas más
// angostas que eso (pero >=900px, donde ya se activa la vista desktop)
// lo escalamos hacia abajo en vez de recortarlo.
function scaleDesktopView() {
  const wrap = document.querySelector(".view--desktop");
  const page = document.querySelector(".page--desktop");
  if (!wrap || !page) return;

  if (window.innerWidth < 900) {
    // en mobile no se usa esta vista, no hace falta tocar nada
    page.style.transform = "";
    page.style.marginLeft = "";
    wrap.style.height = "";
    return;
  }

  const scale = Math.min(1, window.innerWidth / 1440);
  const scaledWidth = 1440 * scale;
  page.style.transform = `scale(${scale})`;
  // centrado: left:50% (en CSS) + este margen negativo de la mitad del
  // ancho YA escalado. "margin:auto" no sirve aquí porque la caja sin
  // escalar (1440px) es más ancha que la pantalla en este rango.
  page.style.marginLeft = -(scaledWidth / 2) + "px";
  wrap.style.height = page.offsetHeight * scale + "px";
}

window.addEventListener("resize", scaleDesktopView);
window.addEventListener("load", scaleDesktopView);
scaleDesktopView();
