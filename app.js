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

      contrast_title: 'Как обычно ездят —\nи почему это не всегда работает',
      bad1_title: 'Автобус с группой',
      bad1_li1: '30–40 человек',
      bad1_li2: 'Жёсткий маршрут, никакой гибкости',
      bad1_li3: 'Останавливаетесь там, где удобно водителю',
      bad1_li4: 'Половину времени — в пробке на трассе',
      bad2_title: 'Такси без гида',
      bad2_li1: 'Дорого, если ехать далеко',
      bad2_li2: 'Водитель не рассказывает — он везёт',
      bad2_li3: 'Вы сами разбираетесь, что смотреть и зачем',
      bad2_li4: 'Можно промахнуться с местами',
      good_title: 'Amonte — личный гид на машине',
      good_li1: 'Только вы (или ваша пара / семья)',
      good_li2: 'Маршрут под ваши интересы',
      good_li3: 'Гид объясняет, рассказывает, ведёт',
      good_li4: 'Едете туда, куда хочется — в своём темпе',

      offer_eyebrow: 'Формат',
      offer_title: 'Что это такое',
      offer_lead: 'Мы не туристическое агентство. Мы не продаём пакеты.',
      offer_body: 'Это однодневная поездка по Черногории — на машине, с живым гидом, по маршруту, который согласован под вас. Национальные парки, каньоны, старые города у моря, горные виды — выбираете то, что хочется увидеть. Мы знаем, где лучшая точка обзора, где остановиться на обед, куда пойти пешком и что за всем этим стоит.',
      feat1_title: 'На машине',
      feat1_desc: 'Комфортно, без пересадок',
      feat2_title: 'Маршрут под вас',
      feat2_desc: 'Согласовываем заранее под ваши интересы',
      feat3_title: 'Гид рядом',
      feat3_desc: 'Рассказывает, объясняет, рекомендует',
      feat4_title: 'Ваш темп',
      feat4_desc: 'Никто не торопит',
      feat5_title: 'Только вы',
      feat5_desc: '1 человек, пара или семья до 6 человек',

      how_eyebrow: 'Процесс',
      how_title: 'Как это работает',
      how_sub: 'Никаких сложностей. От «хочу поехать» до «едем» — четыре шага.',
      step1_title: 'Выбираете маршрут',
      step1_desc: 'Смотрите каталог и выбираете, что хочется увидеть. Или пишете нам — подскажем, что подойдёт под ваши интересы и даты.',
      step2_title: 'Согласовываем детали',
      step2_desc: 'Время отправления, точку встречи, пожелания по темпу и остановкам. Обычно это занимает одно сообщение.',
      step3_title: 'Подтверждаете бронь',
      step3_desc: 'Мы подтверждаем маршрут и дату. Оплата — при встрече или заранее, как удобно.',
      step4_title: 'Едем',
      step4_desc: 'В назначенное утро гид забирает вас из отеля или с удобного места. Дальше — маршрут, дорога и Черногория.',

      inc_eyebrow: 'Честность',
      inc_title: 'Что входит — и что нет',
      inc_sub: 'Без скрытых платежей. Вы знаете заранее, за что платите.',
      inc_yes_title: 'Включено',
      inc_y1: 'Машина и водитель-гид на весь маршрут',
      inc_y2: 'Транспорт по всему маршруту',
      inc_y3: 'Рассказ о местах — история, контекст, рекомендации',
      inc_y4: 'Помощь с выбором ресторана или кафе по дороге',
      inc_y5: 'Гибкость маршрута внутри дня',
      inc_no_title: 'Не входит',
      inc_n1: 'Входные билеты в нацпарки (обычно 3–5€, оплачивается на месте)',
      inc_n2: 'Еда и напитки',
      inc_n3: 'Билеты в музеи',
      inc_n4: 'Трансфер в аэропорт или за пределы Черногории',
      inc_note: 'Стоимость входных билетов минимальна. Мы предупреждаем заранее — никаких сюрпризов на кассе.',

      trust_eyebrow: 'Впечатления',
      trust_title: 'Это не картинка из каталога',
      trust_sub: 'Каждый снимок — это чьё-то «вау». Каньон Тары с высоты. Котор в пять утра, когда туристов ещё нет. Закат над Скадарским озером.',
      trust_body: 'Сюда привозят тех, кто хочет Черногорию настоящую — не ту, что из Instagram-геотега на пляже.',
      q1_text: '«Поднялись на крепость в Которе рано утром — вид на залив был только наш. Это именно то, чего хотелось.»',
      q1_author: '— Марина, Москва',
      q2_text: '«Гид знал такие места, о которых нигде не написано. Мы видели настоящую Черногорию, а не открытку.»',
      q2_author: '— Андрей и Оля, Санкт-Петербург',
      q3_text: '«Дурмитор — это было сильнейшее впечатление за всю поездку. Спасибо, что уговорили туда поехать.»',
      q3_author: '— Семья Козловых',

      gallery_eyebrow: 'Фотографии',
      gallery_title: 'Живые снимки с маршрутов',
      gallery_sub: 'Горы, каньоны, заливы — всё это вы увидите за один день. Снимки сделаны во время реальных поездок.',
      gallery_btn: 'Смотреть все фотографии (+41)',

      cta_title: 'Готовы показать вам Черногорию',
      cta_body: 'Укажите, какой маршрут интересует и удобные даты — ответим в течение часа.',
      form_name_label: 'Ваше имя',
      form_name_ph: 'Как вас зовут?',
      form_contact_err: 'Укажите, как с вами связаться',
      form_msg_label: 'Что хотите увидеть / вопрос',
      form_msg_ph: 'Дурмитор, Котор, Скадар... или просто — не знаю, помогите выбрать',
      form_tg_btn: 'Отправить в Telegram',
      form_wa_btn: 'Написать в WhatsApp',
      form_note: 'Нажимая «Отправить в Telegram», вы перейдёте в приложение с готовым сообщением.',

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
      catalogue_suffix:    '— we\'ll plan a route for you.',

      contrast_title: 'How people usually travel —
and why it doesn\'t always work',
      bad1_title: 'Group bus tour',
      bad1_li1: '30–40 people',
      bad1_li2: 'Fixed route, zero flexibility',
      bad1_li3: 'You stop where the driver decides',
      bad1_li4: 'Half the time stuck in traffic',
      bad2_title: 'Taxi without a guide',
      bad2_li1: 'Expensive for longer distances',
      bad2_li2: 'Driver just drives — no stories',
      bad2_li3: 'You figure out yourself what to see and why',
      bad2_li4: 'Easy to miss the best spots',
      good_title: 'Amonte — private guide by car',
      good_li1: 'Just you (or your couple / family)',
      good_li2: 'Route tailored to your interests',
      good_li3: 'Guide explains, shares stories, leads the way',
      good_li4: 'Go where you want — at your own pace',

      offer_eyebrow: 'Format',
      offer_title: 'What this is',
      offer_lead: 'We are not a travel agency. We don\'t sell packages.',
      offer_body: 'A full-day trip around Montenegro — by car, with a live guide, on a route agreed specifically for you. National parks, canyons, old coastal towns, mountain views — you choose what you want to see. We know the best viewpoints, where to stop for lunch, where to walk, and the story behind it all.',
      feat1_title: 'By car',
      feat1_desc: 'Comfortable, no transfers',
      feat2_title: 'Your route',
      feat2_desc: 'Planned in advance around your interests',
      feat3_title: 'Guide alongside',
      feat3_desc: 'Tells stories, explains, recommends',
      feat4_title: 'Your pace',
      feat4_desc: 'Nobody rushes you',
      feat5_title: 'Just you',
      feat5_desc: '1 person, couple or family up to 6',

      how_eyebrow: 'Process',
      how_title: 'How it works',
      how_sub: 'No complications. From "I want to go" to "we\'re on our way" — four steps.',
      step1_title: 'Choose a route',
      step1_desc: 'Browse the catalogue and pick what you want to see. Or write to us — we\'ll suggest what fits your interests and dates.',
      step2_title: 'Agree on details',
      step2_desc: 'Departure time, meeting point, preferences on pace and stops. Usually takes one message.',
      step3_title: 'Confirm your booking',
      step3_desc: 'We confirm the route and date. Payment on meeting or in advance — whatever suits you.',
      step4_title: 'Off we go',
      step4_desc: 'On the morning of the trip, the guide picks you up from your hotel or a convenient spot. Then — the route, the road, and Montenegro.',

      inc_eyebrow: 'Transparency',
      inc_title: 'What\'s included — and what\'s not',
      inc_sub: 'No hidden fees. You know upfront exactly what you\'re paying for.',
      inc_yes_title: 'Included',
      inc_y1: 'Car and driver-guide for the full route',
      inc_y2: 'Transport throughout the tour',
      inc_y3: 'Stories about the places — history, context, recommendations',
      inc_y4: 'Help choosing a restaurant or café along the way',
      inc_y5: 'Flexibility within the day',
      inc_no_title: 'Not included',
      inc_n1: 'National park entry fees (usually 3–5€, paid on site)',
      inc_n2: 'Food and drinks',
      inc_n3: 'Museum tickets',
      inc_n4: 'Airport transfer or travel outside Montenegro',
      inc_note: 'Entry fees are minimal. We let you know in advance — no surprises at the gate.',

      trust_eyebrow: 'Impressions',
      trust_title: 'This isn\'t a brochure photo',
      trust_sub: 'Every shot is someone\'s "wow". Tara Canyon from above. Kotor at five in the morning before the crowds. Sunset over Skadar Lake.',
      trust_body: 'We bring people who want the real Montenegro — not the Instagram geotag on the beach.',
      q1_text: '"We climbed the fortress in Kotor early in the morning — the view over the bay was ours alone. Exactly what we wanted."',
      q1_author: '— Marina, Moscow',
      q2_text: '"The guide knew places that aren\'t written about anywhere. We saw the real Montenegro, not a postcard."',
      q2_author: '— Andrey & Olya, Saint Petersburg',
      q3_text: '"Durmitor was the strongest impression of the whole trip. Thank you for convincing us to go there."',
      q3_author: '— The Kozlov Family',

      gallery_eyebrow: 'Photos',
      gallery_title: 'Real shots from the routes',
      gallery_sub: 'Mountains, canyons, bays — all of this in one day. Photos taken during real trips.',
      gallery_btn: 'See all photos (+41)',

      cta_title: 'Ready to show you Montenegro',
      cta_body: 'Tell us which route interests you and your preferred dates — we\'ll reply within the hour.',
      form_name_label: 'Your name',
      form_name_ph: 'What\'s your name?',
      form_contact_err: 'Please tell us how to reach you',
      form_msg_label: 'What you want to see / question',
      form_msg_ph: 'Durmitor, Kotor, Skadar... or just — not sure, help me choose',
      form_tg_btn: 'Send via Telegram',
      form_wa_btn: 'Write on WhatsApp',
      form_note: 'Clicking "Send via Telegram" will open the app with a ready message.',

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

      contrast_title: 'Kako ljudi obično putuju —
i zašto to ne funkcioniše uvek',
      bad1_title: 'Grupni autobus',
      bad1_li1: '30–40 ljudi',
      bad1_li2: 'Fiksna ruta, nula fleksibilnosti',
      bad1_li3: 'Stanete gde vozač odluči',
      bad1_li4: 'Polovina vremena u gužvi',
      bad2_title: 'Taksi bez vodiča',
      bad2_li1: 'Skupo za duže relacije',
      bad2_li2: 'Vozač samo vozi — bez priča',
      bad2_li3: 'Sami određujete šta da gledate i zašto',
      bad2_li4: 'Lako propustiti najbolja mesta',
      good_title: 'Amonte — privatni vodič autom',
      good_li1: 'Samo vi (ili vaš par / porodica)',
      good_li2: 'Ruta prilagodjena vašim interesima',
      good_li3: 'Vodič priča, objašnjava, vodi',
      good_li4: 'Idete gde želite — sopstvenim tempom',

      offer_eyebrow: 'Format',
      offer_title: 'Šta je ovo',
      offer_lead: 'Nismo turistička agencija. Ne prodajemo pakete.',
      offer_body: 'Jednodnevni izlet po Crnoj Gori — autom, sa pravim vodičem, po ruti dogovorenoj za vas. Nacionalni parkovi, kanjoni, stari primorski gradovi, planinski pogledi — vi birate šta želite da vidite. Mi znamo najbolje tačke posmatranja, gde stati na ručak, kuda ići peške i priču iza svega toga.',
      feat1_title: 'Autom',
      feat1_desc: 'Udobno, bez presedanja',
      feat2_title: 'Vaša ruta',
      feat2_desc: 'Planiramo unapred prema vašim interesima',
      feat3_title: 'Vodič uz vas',
      feat3_desc: 'Priča, objašnjava, preporučuje',
      feat4_title: 'Vaš tempo',
      feat4_desc: 'Niko vas ne žuri',
      feat5_title: 'Samo vi',
      feat5_desc: '1 osoba, par ili porodica do 6',

      how_eyebrow: 'Proces',
      how_title: 'Kako funkcioniše',
      how_sub: 'Bez komplikacija. Od "hoću da idem" do "idemo" — četiri koraka.',
      step1_title: 'Izaberite rutu',
      step1_desc: 'Pregledajte katalog i izaberite šta želite da vidite. Ili nam pišite — preporučićemo šta odgovara vašim interesima i datumima.',
      step2_title: 'Dogovorimo detalje',
      step2_desc: 'Vreme polaska, mesto susreta, želje o tempu i zaustavljanjima. Obično je dovoljna jedna poruka.',
      step3_title: 'Potvrdite rezervaciju',
      step3_desc: 'Potvrđujemo rutu i datum. Plaćanje pri susretu ili unapred — kako vam odgovara.',
      step4_title: 'Krećemo',
      step4_desc: 'Ujutru vodič vas preuzima iz hotela ili pogodnog mesta. Dalje — ruta, put i Crna Gora.',

      inc_eyebrow: 'Transparentnost',
      inc_title: 'Šta je uključeno — a šta nije',
      inc_sub: 'Bez skrivenih troškova. Unapred znate tačno za šta plaćate.',
      inc_yes_title: 'Uključeno',
      inc_y1: 'Auto i vozač-vodič za celu rutu',
      inc_y2: 'Transport tokom cele ture',
      inc_y3: 'Priča o mestima — istorija, kontekst, preporuke',
      inc_y4: 'Pomoć pri izboru restorana ili kafića',
      inc_y5: 'Fleksibilnost rute tokom dana',
      inc_no_title: 'Nije uključeno',
      inc_n1: 'Ulaznice za nacionalne parkove (obično 3–5€, plaća se na licu mesta)',
      inc_n2: 'Hrana i piće',
      inc_n3: 'Ulaznice za muzeje',
      inc_n4: 'Transfer do aerodroma ili van Crne Gore',
      inc_note: 'Ulaznice su minimalne. Obaveštavamo vas unapred — bez iznenađenja na blagajni.',

      trust_eyebrow: 'Utisci',
      trust_title: 'Ovo nije slika iz brošure',
      trust_sub: 'Svaki snimak je nečije "vau". Tara kanjon odozgo. Kotor u pet ujutru pre turista. Zalazak sunca nad Skadarskim jezerom.',
      trust_body: 'Dovodimo one koji žele pravu Crnu Goru — ne onu sa Instagram geotaga na plaži.',
      q1_text: '"Popeli smo se na tvrđavu u Kotoru rano ujutru — pogled na zaliv bio je samo naš. Tačno ono što smo želeli."',
      q1_author: '— Marina, Moskva',
      q2_text: '"Vodič je znao mesta o kojima nigde nije napisano. Videli smo pravu Crnu Goru, ne razglednicu."',
      q2_author: '— Andrej i Olja, Sankt Peterburg',
      q3_text: '"Durmitor je bio najjači utisak celog putovanja. Hvala što ste nas ubedili da tamo idemo."',
      q3_author: '— Porodica Kozlov',

      gallery_eyebrow: 'Fotografije',
      gallery_title: 'Pravi snimci sa ruta',
      gallery_sub: 'Planine, kanjoni, zaljevi — sve ovo za jedan dan. Snimci su napravljeni tokom pravih putovanja.',
      gallery_btn: 'Pogledajte sve fotografije (+41)',

      cta_title: 'Spremni da vam pokažemo Crnu Goru',
      cta_body: 'Recite koja ruta vas zanima i pogodni datumi — odgovaramo u roku od sata.',
      form_name_label: 'Vaše ime',
      form_name_ph: 'Kako se zovete?',
      form_contact_err: 'Navedite kako da vas kontaktiramo',
      form_msg_label: 'Šta želite da vidite / pitanje',
      form_msg_ph: 'Durmitor, Kotor, Skadar... ili jednostavno — ne znam, pomozite mi da izaberem',
      form_tg_btn: 'Pošaljite putem Telegrama',
      form_wa_btn: 'Pišite na WhatsApp',
      form_note: 'Klikom na "Pošaljite putem Telegrama" otvorit će se aplikacija sa spremnom porukom.',

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

    // Placeholder translations [data-i18n-placeholder]
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (s[key] !== undefined) el.placeholder = s[key];
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
