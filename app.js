/* ═══════════════════════════════════════════
   AMONTE — app.js
   Nav scroll · Fade-in animations · Gallery · Contact Form
═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── NAV scroll state ── */
  const nav = document.getElementById('nav');
  if (nav) {
    const updateNav = () => {
      if (window.scrollY > 60) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
    };
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  /* ── Smooth scroll for anchor CTAs ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Fade-up entrance animations ── */
  const fadeTargets = [
    '.section__eyebrow',
    '.section__title',
    '.section__subtitle',
    '.contrast__card',
    '.offer__text',
    '.offer__features',
    '.route-card',
    '.how__step',
    '.included__col',
    '.trust__gallery',
    '.trust__quote',
    '.gallery__grid',
    '.gallery__footer',
    '.final-cta__headline',
    '.final-cta__body',
    '.contact-form',
  ];

  const observed = document.querySelectorAll(fadeTargets.join(', '));
  observed.forEach(el => el.classList.add('fade-up'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const parent = entry.target.parentElement;
          const siblings = parent ? [...parent.querySelectorAll('.fade-up')] : [];
          const idx = siblings.indexOf(entry.target);
          const delay = idx * 80;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

    observed.forEach(el => io.observe(el));
  } else {
    observed.forEach(el => el.classList.add('visible'));
  }

  /* ── Gallery: GLightbox init ── */
  if (typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      zoomable: true,
      preload: false,
    });
  }

  /* ── Gallery: Expand button ── */
  const expandBtn = document.getElementById('gallery-expand-btn');
  if (expandBtn) {
    expandBtn.addEventListener('click', () => {
      const hiddenItems = document.querySelectorAll('.gallery__item--hidden');
      hiddenItems.forEach(item => {
        item.classList.add('gallery__item--visible');
      });
      expandBtn.parentElement.style.display = 'none';
    });
  }

  /* ── Contact Form: build Telegram message and open ── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const nameInput   = document.getElementById('cf-name');
    const contactInput = document.getElementById('cf-contact');
    const messageInput = document.getElementById('cf-message');
    const contactField = contactInput ? contactInput.closest('.contact-form__field') : null;

    // Validate contact field
    function validateContact() {
      const val = contactInput.value.trim();
      if (!val) {
        contactField && contactField.classList.add('has-error');
        return false;
      }
      contactField && contactField.classList.remove('has-error');
      return true;
    }

    contactInput && contactInput.addEventListener('blur', validateContact);
    contactInput && contactInput.addEventListener('input', () => {
      if (contactInput.value.trim()) {
        contactField && contactField.classList.remove('has-error');
      }
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!validateContact()) {
        contactInput && contactInput.focus();
        return;
      }

      const name    = nameInput    ? nameInput.value.trim()    : '';
      const contact = contactInput ? contactInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      // Build message text
      let text = 'Здравствуйте! Хочу узнать про маршруты Amonte.\n';
      if (name)    text += `\nИмя: ${name}`;
      if (contact) text += `\nКак связаться: ${contact}`;
      if (message) text += `\n\nПожелания / вопрос:\n${message}`;

      const encoded = encodeURIComponent(text);
      const tgUrl   = `https://t.me/amonter?text=${encoded}`;

      window.open(tgUrl, '_blank', 'noopener,noreferrer');
    });
  }

})();
