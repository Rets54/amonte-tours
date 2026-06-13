/* ═══════════════════════════════════════════
   AMONTE — app.js
   Nav scroll · Fade-in animations · Gallery · Contact Form
   Lang switcher (RU/EN/SR) · Route Filters (time + vibe)
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

  /* ══════════════════════════════════════════════
     LANG SWITCHER + i18n (RU / EN / SR)
  ══════════════════════════════════════════════ */
  const i18n = {
    ru: {
      nav_cta:         'Выбрать маршрут',
      hero_badge:      'Из Будвы · На машине · Только вы',
      hero_h1_line1:   'Черногория без\u00a0автобуса',
      hero_h1_em:      'автобуса',
      hero_sub:        'Однодневные маршруты на машине с личным гидом.\nВыбираете, куда ехать — мы знаем, что показать.',
      hero_cta:        'Выбрать маршрут ↓',
      hero_support:    'Горы, каньоны, старые города у моря и места, о которых не пишут в путеводителях — за один день.',

      cat_eyebrow:     'Маршруты',
      cat_title:       'Выберите маршрут',
      cat_sub:         'Готовые однодневные маршруты из Будвы. Каждый можно адаптировать под вас.',

      tab_all:         'Все маршруты',
      tab_short:       'До 4 ч',
      tab_short_hint:  'Короткий день',
      tab_half:        'Полдня',
      tab_half_hint:   '~5–7 часов',
      tab_full:        'Весь день',
      tab_full_hint:   'Горы и каньоны',

      vibe_sea:        'Море и залив',
      vibe_boat:       'Лодка',
      vibe_mountain:   'Горы',
      vibe_monastery:  'Монастыри',
      vibe_nature:     'Природа',
      vibe_city:       'Старые города',

      routes_empty:    'По этим фильтрам маршрутов нет — попробуйте другой набор.',

      from:            'от',
      price_per_group: 'за группу',
      r_cta:           'Забронировать этот маршрут',

      catalogue_microcopy: 'Не нашли то, что искали?',
      catalogue_link:      'Напишите нам',
      catalogue_suffix:    '— согласуем маршрут под вас.',

      faq_eyebrow: 'FAQ',
      faq_title:   'Частые вопросы',
      faq1_q: 'Чем это отличается от групповой экскурсии?',
      faq1_a: 'В группе вы едете по стандартному маршруту с 20–40 незнакомыми людьми и останавливаетесь там, где удобно автобусу. С нами — только вы, ваш маршрут, ваш темп.',
      faq2_q: 'Сколько стоит маршрут?',
      faq2_a: 'Зависит от маршрута и количества людей. Напишите нам — скажем точную стоимость и ответим в течение часа.',
      faq3_q: 'На каком языке работает гид?',
      faq3_a: 'Русский, English, Srpski.',
      faq4_q: 'Как долго длится экскурсия?',
      faq4_a: 'Обычно от 4 до 11 часов — зависит от маршрута. Обсуждаем под ваше расписание.',
      faq5_q: 'Можно ли создать свой маршрут?',
      faq5_a: 'Да. Именно это мы и предлагаем. Расскажите, что хотите увидеть — составим день под вас.',
      faq6_q: 'Нужна ли предоплата?',
      faq6_a: 'Нет. Оплата по договорённости, обычно в день тура.',
    },
    en: {
      nav_cta:         'Choose a route',
      hero_badge:      'From Budva · By car · Just you',
      hero_h1_line1:   'Montenegro without a bus',
      hero_h1_em:      'bus',
      hero_sub:        'Day tours by car with a private guide.\nYou choose where to go — we know what to show.',
      hero_cta:        'Choose a route ↓',
      hero_support:    'Mountains, canyons, old towns by the sea and places not in guidebooks — all in one day.',

      cat_eyebrow:     'Routes',
      cat_title:       'Choose your route',
      cat_sub:         'Ready-made day routes from Budva. Each can be adapted for you.',

      tab_all:         'All routes',
      tab_short:       'Under 4h',
      tab_short_hint:  'Short day',
      tab_half:        'Half day',
      tab_half_hint:   '~5–7 hours',
      tab_full:        'Full day',
      tab_full_hint:   'Mountains & canyons',

      vibe_sea:        'Sea & Bay',
      vibe_boat:       'Boat',
      vibe_mountain:   'Mountains',
      vibe_monastery:  'Monasteries',
      vibe_nature:     'Nature',
      vibe_city:       'Old Towns',

      routes_empty:    'No routes match these filters — try a different combination.',

      from:            'from',
      price_per_group: 'per group',
      r_cta:           'Book this route',

      catalogue_microcopy: 'Can\'t find what you\'re looking for?',
      catalogue_link:      'Contact us',
      catalogue_suffix:    '--- we\'ll plan a route for you.',

      faq_eyebrow: 'FAQ',
      faq_title:   'Frequently Asked Questions',
      faq1_q: 'How is this different from a group tour?',
      faq1_a: 'In a group, you follow a standard route with 20–40 strangers and stop where the bus schedule allows. With us — it\'s just you, your route, your pace.',
      faq2_q: 'How much does a tour cost?',
      faq2_a: 'It depends on the route and the number of people. Message us — we\'ll give you an exact price and reply within the hour.',
      faq3_q: 'What language does the guide speak?',
      faq3_a: 'Russian, English, Serbian.',
      faq4_q: 'How long is the tour?',
      faq4_a: 'Usually 4 to 11 hours, depending on the route. We arrange it around your schedule.',
      faq5_q: 'Can I create a custom route?',
      faq5_a: 'Yes. That\'s exactly what we offer. Tell us what you want to see — we\'ll build the day around it.',
      faq6_q: 'Is prepayment required?',
      faq6_a: 'No. Payment is by agreement, usually on the day of the tour.',
    },
    sr: {
      nav_cta:         'Izaberite rutu',
      hero_badge:      'Iz Budve · Autom · Samo vi',
      hero_h1_line1:   'Crna Gora bez autobusa',
      hero_h1_em:      'autobusa',
      hero_sub:        'Jednodnevne rute autom sa privatnim vodičem.\nVirate kuda idete — mi znamo šta da pokažemo.',
      hero_cta:        'Izaberite rutu ↓',
      hero_support:    'Planine, kanjoni, stari gradovi uz more i mesta kojih nema u vodičima — sve za jedan dan.',

      cat_eyebrow:     'Rute',
      cat_title:       'Izaberite rutu',
      cat_sub:         'Gotove jednodnevne rute iz Budve. Svaku možemo prilagoditi za vas.',

      tab_all:         'Sve rute',
      tab_short:       'Do 4 sata',
      tab_short_hint:  'Kratki dan',
      tab_half:        'Pola dana',
      tab_half_hint:   '~5–7 sati',
      tab_full:        'Ceo dan',
      tab_full_hint:   'Planine i kanjoni',

      vibe_sea:        'More i zaliv',
      vibe_boat:       'Čamac',
      vibe_mountain:   'Planine',
      vibe_monastery:  'Manastiri',
      vibe_nature:     'Priroda',
      vibe_city:       'Stari gradovi',

      routes_empty:    'Nema ruta za ove filtere — probajte drugu kombinaciju.',

      from:            'od',
      price_per_group: 'za grupu',
      r_cta:           'Rezervišite ovu rutu',

      catalogue_microcopy: 'Niste pronašli šta tražite?',
      catalogue_link:      'Pišite nam',
      catalogue_suffix:    '— dogovorit ćemo rutu za vas.',

      faq_eyebrow: 'FAQ',
      faq_title:   'Česta pitanja',
      faq1_q: 'Čime se ovo razlikuje od grupne ture?',
      faq1_a: 'U grupi idete standardnom rutom sa 20–40 stranaca i stanete gde autobus kaže. Sa nama — samo vi, vaša ruta, vaš tempo.',
      faq2_q: 'Koliko košta tura?',
      faq2_a: 'Zavisi od rute i broja osoba. Pišite nam — reći ćemo vam tačnu cenu i odgovoriti u roku od sata.',
      faq3_q: 'Na kom jeziku radi vodič?',
      faq3_a: 'Russki, English, Srpski.',
      faq4_q: 'Koliko traje ekskurzija?',
      faq4_a: 'Obično od 4 do 11 sati — zavisi od rute. Dogovaramo prema vašem rasporedu.',
      faq5_q: 'Mogu li da kreiram svoju rutu?',
      faq5_a: 'Da. Upravo to i nudimo. Recite nam šta želite da vidite — napravit ćemo dan po meri.',
      faq6_q: 'Da li je potrebna avansna uplata?',
      faq6_a: 'Ne. Plaćanje se dogovara, obično na dan ture.',
    },
  };

  let currentLang = 'ru';

  function applyLang(lang) {
    currentLang = lang;
    const s = i18n[lang];
    if (!s) return;

    document.documentElement.lang = lang;

    // All [data-i18n] elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (s[key] !== undefined) {
        if (s[key].includes('\n')) {
          el.innerHTML = s[key].replace(/\n/g, '<br>');
        } else {
          el.textContent = s[key];
        }
      }
    });

    // Active state on lang buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('lang-btn--active', btn.dataset.lang === lang);
    });

    // Persist
    try { localStorage.setItem('amonte_lang', lang); } catch(e) {}
  }

  function detectLang() {
    try {
      const saved = localStorage.getItem('amonte_lang');
      if (saved && i18n[saved]) return saved;
    } catch(e) {}
    const nav = (navigator.language || 'ru').toLowerCase().slice(0, 2);
    if (nav === 'en') return 'en';
    if (nav === 'sr' || nav === 'hr' || nav === 'bs') return 'sr';
    return 'ru';
  }

  const langSwitcher = document.getElementById('lang-switcher');
  if (langSwitcher) {
    langSwitcher.addEventListener('click', e => {
      const btn = e.target.closest('.lang-btn');
      if (btn && btn.dataset.lang) applyLang(btn.dataset.lang);
    });
  }

  applyLang(detectLang());

  /* ══════════════════════════════════════════════
     ROUTE FILTERS: time-tabs + vibe-tags
  ══════════════════════════════════════════════ */
  let activeTime  = 'all';
  let activeVibes = new Set();

  function applyFilters() {
    const cards = document.querySelectorAll('#catalogue-grid .route-card');
    const empty = document.getElementById('routes-empty');
    let visible = 0;

    cards.forEach(card => {
      const cardTime  = card.dataset.time  || 'all';
      const cardVibes = (card.dataset.vibes || 'all').split(' ');

      const timeOk = activeTime === 'all' || cardTime === 'all' || cardTime === activeTime;
      const vibeOk = activeVibes.size === 0
        || cardVibes.includes('all')
        || [...activeVibes].some(v => cardVibes.includes(v));

      if (timeOk && vibeOk) {
        card.removeAttribute('data-hidden');
        visible++;
      } else {
        card.setAttribute('data-hidden', '');
      }
    });

    if (empty) empty.hidden = visible > 0;
  }

  const timeTabs = document.getElementById('time-tabs');
  if (timeTabs) {
    timeTabs.addEventListener('click', e => {
      const tab = e.target.closest('.filter-tab');
      if (!tab) return;
      activeTime = tab.dataset.time || 'all';
      timeTabs.querySelectorAll('.filter-tab').forEach(t => {
        const isActive = t === tab;
        t.classList.toggle('filter-tab--active', isActive);
        t.setAttribute('aria-selected', String(isActive));
      });
      applyFilters();
    });
  }

  const vibeTags = document.getElementById('vibe-tags');
  if (vibeTags) {
    vibeTags.addEventListener('click', e => {
      const tag = e.target.closest('.vibe-tag');
      if (!tag) return;
      const vibe = tag.dataset.vibe;
      if (activeVibes.has(vibe)) {
        activeVibes.delete(vibe);
        tag.classList.remove('vibe-tag--active');
      } else {
        activeVibes.add(vibe);
        tag.classList.add('vibe-tag--active');
      }
      applyFilters();
    });
  }

  applyFilters();

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq__q').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const answer = btn.nextElementSibling;

      // Close all
      document.querySelectorAll('.faq__q').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        if (b.nextElementSibling) b.nextElementSibling.hidden = true;
      });

      // Open clicked (unless it was already open)
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        if (answer) answer.hidden = false;
      }
    });
  });

})();
