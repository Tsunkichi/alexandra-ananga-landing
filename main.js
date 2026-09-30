/* ═══════════════════════════════════════════════════════════════
   Alexandra Ananga — main.js
   Vanilla JS mínimo: navegación, modos, scroll reveal, compartir
   < 5 KB sin minificar
   ═══════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ─── 1. Aplicar modos de configuración ───────────────────── */
  if (typeof SITE_CONFIG !== "undefined") {
    if (SITE_CONFIG.MODO_CAMPANA) {
      document.body.classList.add("modo-campana");
    }
    if (SITE_CONFIG.MODO_SILENCIO) {
      document.body.classList.add("modo-silencio");
    }
  }

  /* ─── 2. Navegación móvil ─────────────────────────────────── */
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  let overlay = null;

  function createOverlay() {
    if (overlay) return overlay;
    overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    overlay.setAttribute("aria-hidden", "true");
    document.body.appendChild(overlay);
    overlay.addEventListener("click", closeNav);
    return overlay;
  }

  function openNav() {
    navMenu.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    const ov = createOverlay();
    // Forzar reflow para que la transición funcione
    void ov.offsetWidth;
    ov.classList.add("is-visible");
    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    if (overlay) {
      overlay.classList.remove("is-visible");
    }
    document.body.style.overflow = "";
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Cerrar al hacer clic en un enlace del menú
    navMenu.querySelectorAll(".nav__link").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    // Cerrar con Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        closeNav();
        navToggle.focus();
      }
    });
  }

  /* ─── 3. Scroll Reveal (IntersectionObserver) ─────────────── */
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReduced) {
    // Marcar elementos para reveal
    var revealSelectors = [
      ".seccion h2",
      ".seccion__subtitulo",
      ".propuesta-card",
      ".votar-item",
      ".seccion__foto-quien",
      ".seccion__texto-quien",
      ".participa-inner",
    ];

    revealSelectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        el.classList.add("reveal");
      });
    });

    if ("IntersectionObserver" in window) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );

      document.querySelectorAll(".reveal").forEach(function (el) {
        revealObserver.observe(el);
      });
    } else {
      // Fallback: mostrar todo
      document.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  }

  /* ─── 4. Botón "Comparte esta página" ─────────────────────── */
  var btnCompartir = document.getElementById("btn-compartir");

  if (btnCompartir) {
    btnCompartir.addEventListener("click", function () {
      var shareData = {
        title: "Alexandra Ananga — Candidata a la Alcaldía de Palora",
        text: "Conoce las propuestas de Alexandra Ananga para Palora. Pachakutik Lista 18. Menos palabras más obras.",
        url: window.location.href,
      };

      if (navigator.share) {
        navigator.share(shareData).catch(function () {
          // El usuario canceló o hubo un error silencioso
        });
      } else {
        // Fallback: abrir WhatsApp con enlace
        var waText = encodeURIComponent(
          shareData.text + " " + shareData.url
        );
        window.open("https://wa.me/?text=" + waText, "_blank", "noopener,noreferrer");
      }
    });
  }

  /* ─── 5. Navbar ocultar/mostrar al hacer scroll ───────────── */
  var nav = document.getElementById("nav");
  var lastScroll = 0;
  var scrollThreshold = 64;

  if (nav) {
    window.addEventListener(
      "scroll",
      debounce(function () {
        var currentScroll = window.scrollY;
        if (currentScroll <= scrollThreshold) {
          nav.style.transform = "";
          return;
        }
        if (currentScroll > lastScroll + 10) {
          // Scroll down — ocultar nav
          nav.style.transform = "translateY(-100%)";
          nav.style.transition = "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)";
        } else if (currentScroll < lastScroll - 10) {
          // Scroll up — mostrar nav
          nav.style.transform = "";
          nav.style.transition = "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)";
        }
        lastScroll = currentScroll;
      }, 16),
      { passive: true }
    );
  }

  function debounce(fn, delay) {
    var timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  }

  /* ─── 6. Año actual en el pie ─────────────────────────────── */
  // No se requiere — no hay elemento de año dinámico en v1

})();
