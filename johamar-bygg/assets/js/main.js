(function () {
  'use strict';

  /* ---- Footer year ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Sticky header background on scroll ---- */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (window.scrollY > 24) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Mobile menu ---- */
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('mainNav');
  var overlay = document.getElementById('navOverlay');

  function closeMenu() {
    nav.classList.remove('open');
    overlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function openMenu() {
    nav.classList.add('open');
    overlay.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  hamburger.addEventListener('click', function () {
    var isOpen = nav.classList.contains('open');
    if (isOpen) closeMenu(); else openMenu();
  });
  overlay.addEventListener('click', closeMenu);
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) closeMenu();
  });

  /* ---- Scroll reveal animations ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---- Contact form (client-side handling, opens mail client) ---- */
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var email = form.email.value.trim();
      var service = form.service.value;
      var message = form.message.value.trim();

      if (!name || !phone || !email || !message) {
        note.textContent = 'Vänligen fyll i alla obligatoriska fält (markerade med *).';
        return;
      }

      var subject = encodeURIComponent('Offertförfrågan från ' + name + (service ? ' – ' + service : ''));
      var body = encodeURIComponent(
        'Namn: ' + name + '\n' +
        'Telefon: ' + phone + '\n' +
        'E-post: ' + email + '\n' +
        'Typ av projekt: ' + (service || 'Ej angivet') + '\n\n' +
        'Meddelande:\n' + message
      );

      window.location.href = 'mailto:info@johamarbygg.se?subject=' + subject + '&body=' + body;
      note.textContent = 'Tack! Ditt e-postprogram öppnas nu så att du kan skicka din förfrågan till oss.';
      form.reset();
    });
  }
})();
