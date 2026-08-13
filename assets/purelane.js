/**
 * Purelane Shopify Theme Engine - Section-Aware Defensive JavaScript
 */

(function () {
  'use strict';

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Scroll Reveal Initialization ---------- */
  function initScrollReveals(scope) {
    const rootScope = scope || document;
    const reveals = Array.from(rootScope.querySelectorAll('.rv'));
    if (!reveals.length) return;

    if ('IntersectionObserver' in window && !isReducedMotion) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

      reveals.forEach((el) => observer.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add('in'));
    }
  }

  /* ---------- Hero Section Initializer ---------- */
  function initHeroSection(container) {
    if (!container) return;
    const stage = container.querySelector('[data-purelane-hstage]');
    if (!stage) return;

    const slides = Array.from(stage.querySelectorAll('[data-hero-slide]'));
    const dots = Array.from(container.querySelectorAll('[data-hero-dot]'));
    if (!slides.length) return;

    let currentIndex = 0;
    let timer = null;

    function goToSlide(n) {
      currentIndex = (n + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('on', i === currentIndex));
      dots.forEach((d, i) => d.classList.toggle('on', i === currentIndex));
    }

    function startAutoPlay() {
      if (isReducedMotion || timer || slides.length <= 1) return;
      timer = setInterval(() => goToSlide(currentIndex + 1), 3800);
    }

    function stopAutoPlay() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        stopAutoPlay();
        goToSlide(i);
        startAutoPlay();
      });
    });

    stage.addEventListener('mouseenter', stopAutoPlay);
    stage.addEventListener('mouseleave', startAutoPlay);

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => e.isIntersecting ? startAutoPlay() : stopAutoPlay());
      }, { threshold: 0.2 });
      io.observe(stage);
    } else {
      startAutoPlay();
    }

    // Cleanup reference for section unload
    container._cleanupHero = function () {
      stopAutoPlay();
    };
  }

  /* ---------- Reviews Section Initializer ---------- */
  function initReviewsSection(container) {
    if (!container) return;
    const track = container.querySelector('[data-purelane-revtrack]');
    if (!track) return;

    // Accessibility: Pause marquee when keyboard focus enters review cards
    container.addEventListener('focusin', () => {
      track.style.animationPlayState = 'paused';
    });
    container.addEventListener('focusout', () => {
      track.style.animationPlayState = 'running';
    });
  }

  /* ---------- Section Initializer Registry ---------- */
  const sectionInitializers = {
    'purelane-hero': initHeroSection,
    'purelane-reviews': initReviewsSection
  };

  function initSection(container) {
    if (!container) return;
    const type = container.getAttribute('data-purelane-section-type');
    if (type && sectionInitializers[type]) {
      sectionInitializers[type](container);
    }
    initScrollReveals(container);
  }

  /* ---------- DOM Ready Bootstrapper ---------- */
  function boot() {
    initScrollReveals(document);
    const sections = document.querySelectorAll('[data-purelane-section-type]');
    sections.forEach(initSection);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  /* ---------- Shopify Theme Editor Events Handler ---------- */
  document.addEventListener('shopify:section:load', (e) => {
    initSection(e.target);
  });

  document.addEventListener('shopify:section:unload', (e) => {
    if (e.target && typeof e.target._cleanupHero === 'function') {
      e.target._cleanupHero();
    }
  });

})();
