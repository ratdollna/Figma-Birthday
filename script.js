// Fecha del cumpleaños: Sábado 03 de Octubre, 12:00 pm
// Ajusta el año si hace falta.
const EVENT_DATE = new Date("2026-10-03T12:00:00");

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

// ============ NAV INFERIOR (footer fijo) ============
// Cada ícono del footer apunta a una sección (#hero-m, #info-m, etc.) y se
// marca como activo (muestra el swoosh detrás) según qué sección está
// visible en pantalla en ese momento — no hace falta hacer click para que
// se actualice, se sigue el scroll igual que un tab bar de app.
function initTabbarNav() {
  const groups = [
    { icons: document.querySelectorAll(".view--mobile .tabbar__icon"), sections: ["hero-m", "info-m", "timeline-m", "rsvp-m"] },
    { icons: document.querySelectorAll(".view--desktop .tabbar__icon"), sections: ["hero-d", "info-d", "timeline-d", "rsvp-d"] },
  ];

  function updateActive() {
    // si ya se llegó al fondo de la página, la última sección (RSVP) se
    // marca activa aunque su borde superior no haya cruzado el 40% —
    // si no, en pantallas cortas nunca se alcanza a marcar como activa.
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

    groups.forEach((group) => {
      let currentId = group.sections[0];
      if (atBottom) {
        currentId = group.sections[group.sections.length - 1];
      } else {
        group.sections.forEach((id) => {
          const el = document.getElementById(id);
          if (!el) return;
          const rect = el.getBoundingClientRect();
          // la sección "activa" es la última cuyo borde superior ya pasó
          // el 40% del alto de la pantalla (así se siente natural al hacer
          // scroll, no hace falta que esté 100% arriba)
          if (rect.top <= window.innerHeight * 0.4) {
            currentId = id;
          }
        });
      }
      group.icons.forEach((icon) => {
        icon.classList.toggle("tabbar__icon--active", icon.dataset.target === currentId);
      });
    });
  }

  window.addEventListener("scroll", updateActive, { passive: true });
  window.addEventListener("resize", updateActive);
  window.addEventListener("load", updateActive);
  updateActive();
}

initTabbarNav();
