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

/* Keep --header-h in sync so the mobile nav always sits just below the header */
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
  setHeaderHeightVar(); // ensure --header-h is current before positioning the panel
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
