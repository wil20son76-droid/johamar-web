/* ============================================
   JOHAMAR AB – STÄDSERVICE
   Main JavaScript
   ============================================ */

'use strict';

/* ---- Preloader ---- */
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hide');
  }, 1800);
});

/* ---- Header scroll behavior ---- */
const header = document.getElementById('header');

const setHeaderHeightVar = () => {
  document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
};

const handleHeaderScroll = () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  setHeaderHeightVar();
};
window.addEventListener('scroll', handleHeaderScroll, { passive: true });
window.addEventListener('resize', setHeaderHeightVar);
setHeaderHeightVar();

/* ---- Mobile nav toggle ---- */
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  setHeaderHeightVar();
  const isOpen = hamburger.classList.toggle('open');
  nav.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close nav on link click
nav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

// Close on overlay click
nav.addEventListener('click', (e) => {
  if (e.target === nav) {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  }
});

/* ---- Active nav link on scroll ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const activateNavLink = () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
};
window.addEventListener('scroll', activateNavLink, { passive: true });

/* ---- AOS-like scroll animations ---- */
const aosElements = document.querySelectorAll('[data-aos]');

const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.getAttribute('data-aos-delay') || 0;
      setTimeout(() => {
        el.classList.add('aos-animate');
      }, parseInt(delay));
      aosObserver.unobserve(el);
    }
  });
}, observerOptions);

aosElements.forEach(el => aosObserver.observe(el));

/* ---- Animated counters ---- */
const counterElements = document.querySelectorAll('[data-count]');

const animateCounter = (el) => {
  const target = parseInt(el.getAttribute('data-count'));
  const duration = 2000;
  const start = performance.now();

  const step = (timestamp) => {
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counterElements.forEach(el => counterObserver.observe(el));

/* ---- Back to top ---- */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- Footer year ---- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---- Contact form ---- */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'name',    errorId: 'nameError',    msg: 'Ange ditt namn.' },
      { id: 'phone',   errorId: 'phoneError',   msg: 'Ange ditt telefonnummer.' },
      { id: 'email',   errorId: 'emailError',   msg: 'Ange en giltig e-postadress.' },
      { id: 'message', errorId: 'messageError', msg: 'Ange ett meddelande.' },
    ];

    fields.forEach(({ id, errorId, msg }) => {
      const input = document.getElementById(id);
      const error = document.getElementById(errorId);
      const val = input.value.trim();

      if (!val || (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))) {
        input.classList.add('error');
        error.textContent = msg;
        valid = false;
      } else {
        input.classList.remove('error');
        error.textContent = '';
      }
    });

    if (!valid) return;

    // Show success state
    // TODO: Replace this with your actual form submission logic (e.g., Formspree, EmailJS, backend API)
    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';
  });

  // Clear error on input
  contactForm.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => {
      el.classList.remove('error');
      const errorEl = document.getElementById(el.id + 'Error');
      if (errorEl) errorEl.textContent = '';
    });
  });
}

/* ---- Smooth scroll for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = header.offsetHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---- FAQ Accordion ---- */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-question').setAttribute('aria-expanded', false);
    });
    // Open clicked if it was closed
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', true);
    }
  });
});

/* ---- Testimonials Carousel ---- */
(function () {
  const track = document.getElementById('tcTrack');
  const dotsEl = document.getElementById('tcDots');
  if (!track || !dotsEl) return;

  const slides = Array.from(track.querySelectorAll('.tc-slide'));
  const prevBtn = document.querySelector('.tc-prev');
  const nextBtn = document.querySelector('.tc-next');
  let current = 0;
  let perView = 3;

  function getPerView() {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function totalGroups() {
    return Math.max(1, slides.length - perView + 1);
  }

  function buildDots() {
    dotsEl.innerHTML = '';
    const n = totalGroups();
    for (let i = 0; i < n; i++) {
      const btn = document.createElement('button');
      btn.className = 'tc-dot' + (i === current ? ' active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-label', 'Recension ' + (i + 1));
      btn.setAttribute('aria-selected', i === current ? 'true' : 'false');
      btn.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(btn);
    }
  }

  function goTo(idx) {
    const n = totalGroups();
    current = Math.max(0, Math.min(idx, n - 1));
    const slideWidth = slides[0].offsetWidth + 24; // gap = 24px
    track.style.transform = 'translateX(-' + (current * slideWidth) + 'px)';
    dotsEl.querySelectorAll('.tc-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
      d.setAttribute('aria-selected', i === current ? 'true' : 'false');
    });
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current >= n - 1;
  }

  function setup() {
    perView = getPerView();
    buildDots();
    // Clamp current index if resized
    current = Math.min(current, totalGroups() - 1);
    goTo(current);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
  });

  window.addEventListener('resize', setup);
  setup();
}());

/* ---- Service Modals ---- */
(function () {
  let activeModal = null;

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    if (activeModal) closeModal();
    activeModal = modal;
    // Reset scroll position each open
    const box = modal.querySelector('.svc-modal-box');
    if (box) box.scrollTop = 0;
    modal.classList.add('open');
    document.body.classList.add('modal-open');
    const closeBtn = modal.querySelector('.svc-modal-close');
    if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
  }

  function closeModal() {
    if (!activeModal) return;
    activeModal.classList.remove('open');
    document.body.classList.remove('modal-open');
    activeModal = null;
  }

  // Open
  document.querySelectorAll('.btn-las-mer').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      openModal(this.dataset.modal);
    });
  });

  // Close via × button
  document.querySelectorAll('.svc-modal-close').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeModal();
    });
  });

  // Close via overlay — but NOT when clicking inside the box
  document.querySelectorAll('.svc-modal').forEach(modal => {
    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.classList.contains('svc-modal-overlay')) {
        closeModal();
      }
    });
  });

  // Prevent clicks inside box from bubbling to the modal backdrop
  document.querySelectorAll('.svc-modal-box').forEach(box => {
    box.addEventListener('click', e => e.stopPropagation());
  });

  // ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // CTA "Begär offert" also closes
  document.querySelectorAll('.svc-modal-cta').forEach(a => {
    a.addEventListener('click', closeModal);
  });
}());
