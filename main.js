/* ═══════════════════════════════════════════════════════════════
   Alexandra Ananga — main.js
   Vanilla JS: navegación, modos, scroll reveal, contadores,
   acordeón de ejes, compartir
   ═══════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ─── 1. Aplicar modos de configuración ─────────────────────── */
  if (typeof SITE_CONFIG !== "undefined") {
    if (SITE_CONFIG.MODO_CAMPANA) document.body.classList.add("modo-campana");
    if (SITE_CONFIG.MODO_SILENCIO) document.body.classList.add("modo-silencio");
  }

  /* ─── 2. Navegación móvil ────────────────────────────────────── */
  var navToggle = document.getElementById("nav-toggle");
  var navMenu   = document.getElementById("nav-menu");
  var overlay   = null;

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
    var ov = createOverlay();
    void ov.offsetWidth;
    ov.classList.add("is-visible");
    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    if (overlay) overlay.classList.remove("is-visible");
    document.body.style.overflow = "";
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navToggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeNav() : openNav();
    });
    navMenu.querySelectorAll(".nav__link").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        closeNav();
        navToggle.focus();
      }
    });
  }

  /* ─── 3. Scroll Reveal (IntersectionObserver) ───────────────── */
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReduced && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    // Observe all elements with reveal classes (already in HTML)
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // No motion / no IO: show everything immediately
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ─── 4. Contador animado de cifras ─────────────────────────── */
  function animateCounter(el, target, duration) {
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString("es-EC");
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  if (!prefersReduced && "IntersectionObserver" in window) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var target = parseInt(el.getAttribute("data-target"), 10);
            animateCounter(el, target, 1400);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll(".cifra-card__numero[data-target], .cifra-banda__numero[data-target]").forEach(function (el) {
      counterObserver.observe(el);
    });
  } else {
    // Show final values immediately
    document.querySelectorAll(".cifra-card__numero[data-target], .cifra-banda__numero[data-target]").forEach(function (el) {
      el.textContent = parseInt(el.getAttribute("data-target"), 10).toLocaleString("es-EC");
    });
  }

  /* ─── 5. Acordeón de ejes estratégicos ──────────────────────── */
  var ejeHeaders = document.querySelectorAll(".eje-card__header");

  ejeHeaders.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var isExpanded = btn.getAttribute("aria-expanded") === "true";
      var bodyId = btn.getAttribute("aria-controls");
      var body = document.getElementById(bodyId);

      if (isExpanded) {
        // Collapse
        btn.setAttribute("aria-expanded", "false");
        body.style.maxHeight = "0";
        setTimeout(function () {
          body.setAttribute("hidden", "");
        }, 450);
      } else {
        // Expand — close others first
        ejeHeaders.forEach(function (other) {
          if (other !== btn && other.getAttribute("aria-expanded") === "true") {
            var otherId = other.getAttribute("aria-controls");
            var otherBody = document.getElementById(otherId);
            other.setAttribute("aria-expanded", "false");
            otherBody.style.maxHeight = "0";
            setTimeout(function () { otherBody.setAttribute("hidden", ""); }, 450);
          }
        });

        // Open this one
        btn.setAttribute("aria-expanded", "true");
        body.removeAttribute("hidden");
        // Set max-height to scrollHeight for smooth animation
        body.style.maxHeight = "0";
        void body.offsetWidth; // reflow
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });

  /* ─── 6. Botón "Comparte esta página" ───────────────────────── */
  var btnCompartir = document.getElementById("btn-compartir");

  if (btnCompartir) {
    btnCompartir.addEventListener("click", function () {
      var shareData = {
        title: "Alexandra Ananga — Candidata a la Alcaldía de Palora",
        text: "Palora con identidad, desarrollo y oportunidades para todos. Conoce las propuestas de Alexandra Ananga. Pachakutik Lista 18.",
        url: window.location.href,
      };

      if (navigator.share) {
        navigator.share(shareData).catch(function () {});
      } else {
        var waText = encodeURIComponent(shareData.text + " " + shareData.url);
        window.open("https://wa.me/?text=" + waText, "_blank", "noopener,noreferrer");
      }
    });
  }

  /* ─── 7. Navbar ocultar/mostrar al hacer scroll ─────────────── */
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
          nav.style.transform = "translateY(-100%)";
          nav.style.transition = "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)";
        } else if (currentScroll < lastScroll - 10) {
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

})();
