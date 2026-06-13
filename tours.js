/* ═══════════════════════════════════════════
   AMONTE — tours.js
   Montenegro Private Tours page
   Lang switcher (RU/EN/SR) · FAQ accordion · Nav scroll · Fade-in
═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── i18n strings ── */
  const i18n = {
    ru: {
      nav_cta:        'Написать гиду',
      hero_badge:     'Только вы · Ваш маршрут · Живой гид',
      hero_h1_line1:  'Экскурсии по Черногории',
      hero_h1_line2:  'с личным гидом',
      hero_sub:       'Ваш маршрут, ваш темп — без автобуса и без толпы.\nКотор, Будва, Дурмитор, Перасть и не только.',
      hero_cta:       'Написать в WhatsApp',
      hero_support:   'Отвечу в течение часа · Без предоплаты · Маршрут обсуждаем под вас',

      contrast_title: 'Не автобус. Не толпа. Не «как у всех».',
      contrast_sub:   'Групповые туры удобны — но не для всех. Вот в чём разница.',
      ct_param:       'Параметр',
      ct_group:       '🚌 Автобусная экскурсия',
      ct_amonte:      '✅ Amonte',
      ct_route:       'Маршрут',
      ct_route_bad:   'Стандартный для всех',
      ct_route_good:  'Обсуждаем под вас',
      ct_pace:        'Темп',
      ct_pace_bad:    'Фиксированный',
      ct_pace_good:   'Ваш',
      ct_group_size:  'Группа',
      ct_group_bad:   '20–40 человек',
      ct_group_good:  'Только вы',
      ct_stops:       'Остановки',
      ct_stops_bad:   'По расписанию',
      ct_stops_good:  'Там, где интересно',
      ct_lang:        'Язык гида',
      ct_lang_bad:    'Общий для группы',
      ct_lang_good:   'Нативный для вас',
      ct_price:       'Цена',
      ct_price_bad:   '25–40 € с человека',
      ct_price_good:  'от 25 € с чел. при 4 путниках',

      pm_eyebrow:         'Считаем честно',
      pm_title:           'Сколько стоит частный тур на самом деле?',
      pm_group_label:     'Групповая экскурсия',
      pm_group_formula:   '30 € × 4 человека',
      pm_group_note:      'Стандартный маршрут · Автобус · Без выбора',
      pm_private_label:   'Amonte — частный тур',
      pm_private_formula: 'от 100 € на всех',
      pm_private_total:   '= 25 € с человека',
      pm_private_note:    'Ваш маршрут · Ваш темп · Только вы',
      pm_conclusion:      'При поездке семьёй или парой — частный тур выходит',
      pm_conclusion_em:   'дешевле или вровень с групповым',

      tab_all:        'Все маршруты',
      tab_short:      'До 2 часов',
      tab_short_hint: 'Вылазка из Будвы',
      tab_half:       'Полдня',
      tab_half_hint:  '~4–6 часов',
      tab_full:       'Весь день',
      tab_full_hint:  'Север, горы, каньоны',

      vibe_sea:       'Море и залив',
      vibe_boat:      'Лодка',
      vibe_mountain:  'Горы',
      vibe_monastery: 'Монастыри',
      vibe_nature:    'Природа',
      vibe_city:      'Старые города',

      from:            'от',
      price_per_group: 'за группу',

      routes_eyebrow: 'Маршруты',
      routes_title:   'Что вы увидите',
      routes_sub:     'Выберите по времени — или просто листайте',
      routes_empty:   'По этим фильтрам маршрутов нет — попробуйте другой набор или напишите мне.',

      r7_badge:   '⚡ Быстрая вылазка',
      r7_title:   'Свети-Стефан и видовая',
      r7_tagline: 'Лучший вид на Адриатику — за 1.5–2 часа из Будвы',
      r7_meta1:   '📍 Свети-Стефан · Видовая точка',
      r7_meta2:   '⏱ 1.5–2 часа',
      r7_desc:    'Если у вас пара часов — едем к самому фотогеничному виду побережья. Остров-отель Свети-Стефан, обрывы над морем, никакой толпы.',
      r8_title:   'Скадарское озеро',
      r8_tagline: 'Лодка, птицы, кувшинки — самое большое озеро Балкан',
      r8_meta1:   '📍 Скадарское озеро · Нацпарк · Вирпазар',
      r8_meta2:   '⏱ 5–6 часов',
      r8_desc:    'Прогулка на лодке по озеру, рыбацкие деревушки на воде, стаи пеликанов. Место, которое совсем не ожидаешь увидеть в стране у Адриатики.',
      r9_title:   'Монастырь Острог',
      r9_tagline: 'Православная святыня в скале на высоте 900 метров',
      r9_meta1:   '📍 Острог · Даниловград',
      r9_meta2:   '⏱ 5–6 часов',
      r9_desc:    'Монастырь буквально вросший в скалу на 900 метров над уровнем моря. Место паломничества трёх религий. Дорога туда — отдельный аттракцион.',

      r1_badge:   '⭐ Самый популярный',
      r1_title:   'Котор и Боко-Которский залив',
      r1_tagline: 'Средневековый город, крепостные стены, рыбацкие деревни у воды',
      r1_meta1:   '📍 Котор · Перасть · Остров Госпа',
      r1_meta2:   '⏱ 6–7 часов',
      r1_desc:    'Один из самых красивых заливов Европы — без толпы на причале. Старый город внутри стен, подъём на крепость, маленький остров посреди залива.',
      r2_title:   'Будва и Старый город',
      r2_tagline: 'Историческое ядро курортного побережья',
      r2_meta1:   '📍 Старый город · Крепость · Адриатика',
      r2_meta2:   '⏱ 3–4 часа',
      r2_desc:    'Крепость, узкие улочки, Адриатика в двух шагах. Лучший маршрут, если вы уже в Будве и хотите понять её по-настоящему.',
      r3_title:   'Перасть и острова',
      r3_tagline: 'Маленький город на заливе — время здесь остановилось',
      r3_meta1:   '📍 Перасть · Остров Госпа · Котор',
      r3_meta2:   '⏱ 5–6 часов',
      r3_desc:    'Два острова прямо в воде, барочная архитектура, лодки у причала. Одно из самых фотогеничных мест всего Средиземноморья.',
      r4_badge:   '⛰ Самый впечатляющий',
      r4_title:   'Дурмитор',
      r4_tagline: 'Горный массив, Чёрное озеро, каньон реки Тары',
      r4_meta1:   '📍 Жабляк · Каньон Тары · Нацпарк Дурмитор',
      r4_meta2:   '⏱ 10–11 часов',
      r4_desc:    'Для тех, кто хочет видеть Черногорию не только с пляжа. Самый глубокий каньон Европы и дикие горы в один день.',
      r5_title:   'Цетинье — историческая столица',
      r5_tagline: 'Старый королевский монастырь, музеи, горная атмосфера',
      r5_meta1:   '📍 Цетинье · Нацпарк Ловчен · Мавзолей Негоша',
      r5_meta2:   '⏱ 5–6 часов',
      r5_desc:    'Место, куда редко добираются без гида. Серпантин в облаках, старая королевская столица и история без туристической шелухи.',
      r6_title:   'Ваш маршрут',
      r6_desc:    'Расскажите, что вам интересно — составим день под вас. Комбинации маршрутов, нестандартные места, особые пожелания — всё обсуждаемо.',
      r6_cta:     'Написать и обсудить',
      r_cta:      'Обсудить маршрут',

      guide_eyebrow:    'Ваш гид',
      guide_title:      'Марко',
      guide_lead:       'Живу в Черногории. Вожу туристов по этой стране уже много лет.',
      guide_body:       'Я не работаю с группами в автобусе. Я работаю с людьми напрямую: обсуждаем, что вам важно, куда хотите попасть, сколько времени у вас есть — и строим день именно под это. Я знаю Котор не из путеводителя. Знаю, где в Перасти лучший вид на залив — не переполненный туристами.',
      guide_f1_title:   'Личный автомобиль',
      guide_f1_sub:     'Комфортный трансфер, без пересадок',
      guide_f2_title:   'Маршрут всегда согласован',
      guide_f2_sub:     'Обсуждаем заранее, без сюрпризов',
      guide_f3_title:   'Ответ в течение часа',
      guide_f3_sub:     'WhatsApp или Telegram, без ожидания',
      guide_f4_title:   'RU / EN / SR',
      guide_f4_sub:     'Работаю на вашем языке',

      how_eyebrow: 'Процесс',
      how_title:   'Как это работает',
      how_sub:     'Три шага — от первого сообщения до начала поездки',
      how_s1_title:'Напишите мне',
      how_s1_body: 'В WhatsApp или Telegram. Расскажите, что хотите увидеть, сколько у вас времени, откуда едете.',
      how_s2_title:'Обсудим маршрут',
      how_s2_body: 'Я предложу несколько вариантов под ваши интересы. Скорректируем детали — и всё готово.',
      how_s3_title:'Встречаемся и едем',
      how_s3_body: 'В назначенное время я приезжаю к вашему отелю. Дальше — только дорога и новые места.',

      inc_eyebrow:  'Честность',
      inc_title:    'Что входит — и что нет',
      inc_sub:      'Без скрытых платежей. Вы знаете заранее, за что платите.',
      inc_yes_title:'Включено',
      inc_no_title: 'Не входит',
      inc_y1:       'Трансфер на личном автомобиле',
      inc_y2:       'Сопровождение гида весь день',
      inc_y3:       'Маршрут под ваши интересы',
      inc_y4:       'Рекомендации по еде и местам',
      inc_y5:       'Гибкий темп — без спешки',
      inc_n1:       'Еда и напитки',
      inc_n2:       'Входные билеты в музеи',
      inc_n2_em:    '(обычно 3–5 €)',
      inc_n3:       'Бронирование отелей',
      inc_n4:       'Авиабилеты',
      inc_note:     'Стоимость входных билетов минимальна. Предупреждаю заранее — никаких сюрпризов на кассе.',

      rev_eyebrow:   'Впечатления',
      rev_title:     'Что говорят туристы',
      rev1_text:     '«Были в Черногории первый раз. Марко показал нам Котор так, что мы потом ещё два дня возвращались туда пешком. Знает каждый угол.»',
      rev1_author:   '— Анна и Дмитрий, Москва',
      rev2_text:     '«Забронировали за день, уже были на месте. Марко приехал точно вовремя. Взяли маршрут Перасть + Котор. Лучший день в поездке.»',
      rev2_author:   '— Ирина, Санкт-Петербург',
      rev3_text:     '«Дети 7 и 10 лет — думала, будет тяжело. Темп был наш, останавливались сколько хотели. Дети сами попросили поехать ещё раз.»',
      rev3_author:   '— Наталья, Казань',

      faq_eyebrow: 'FAQ',
      faq_title:   'Частые вопросы',
      faq1_q:      'Чем это отличается от групповой экскурсии?',
      faq1_a:      'В группе вы едете по стандартному маршруту с 20–40 незнакомыми людьми и останавливаетесь там, где удобно автобусу. Со мной — только вы, ваш маршрут, ваш темп.',
      faq2_q:      'Сколько стоит индивидуальный тур?',
      faq2_a:      'Зависит от маршрута и продолжительности. Напишите мне — обсудим детали и скажу точную стоимость.',
      faq3_q:      'На каком языке вы работаете?',
      faq3_a:      'Русский, English, Srpski.',
      faq4_q:      'Как долго длится экскурсия?',
      faq4_a:      'Обычно от 4 до 8 часов — договариваемся под ваше расписание.',
      faq5_q:      'Можно ли создать свой маршрут?',
      faq5_a:      'Да. Именно это я и предлагаю. Расскажите, что хотите увидеть — я помогу составить день.',
      faq6_q:      'Нужна ли предоплата?',
      faq6_a:      'Нет. Оплата по договорённости, обычно в день тура.',

      fcta_title:    'Готовы увидеть настоящую Черногорию?',
      fcta_sub:      'Напишите — и мы обсудим ваш маршрут. Это ни к чему не обязывает.',
      fcta_wa:       'Написать в WhatsApp',
      fcta_tg:       'Написать в Telegram',
      fcta_note:     'Отвечу в течение часа · Без предоплаты · На русском / English / Srpski',
      footer_tagline:'Индивидуальные маршруты по Черногории',
    },

    en: {
      nav_cta:        'Message the guide',
      hero_badge:     'Just you · Your route · Real guide',
      hero_h1_line1:  'Private Tours',
      hero_h1_line2:  'in Montenegro',
      hero_sub:       'Your route, your pace — no bus, no crowd.\nKotor, Budva, Durmitor, Perast and beyond.',
      hero_cta:       'Message on WhatsApp',
      hero_support:   'Fast reply · No prepayment · Route tailored to you',

      contrast_title: 'Not a bus. Not a crowd. Not the same old tour.',
      contrast_sub:   'Group tours are convenient — but not for everyone. Here\'s the difference.',
      ct_param:       'Parameter',
      ct_group:       '🚌 Group Tour',
      ct_amonte:      '✅ Amonte',
      ct_route:       'Route',
      ct_route_bad:   'Fixed for everyone',
      ct_route_good:  'Tailored to you',
      ct_pace:        'Pace',
      ct_pace_bad:    'Scheduled',
      ct_pace_good:   'Yours',
      ct_group_size:  'Group size',
      ct_group_bad:   '20–40 people',
      ct_group_good:  'Just you',
      ct_stops:       'Stops',
      ct_stops_bad:   'By the clock',
      ct_stops_good:  'Where you\'re curious',
      ct_lang:        'Guide language',
      ct_lang_bad:    'Shared for group',
      ct_lang_good:   'Native for you',
      ct_price:       'Price',
      ct_price_bad:   '25–40 € per person',
      ct_price_good:  'from 25 €/person for 4 pax',


      pm_eyebrow:         'Honest math',
      pm_title:           'How much does a private tour actually cost?',
      pm_group_label:     'Group tour',
      pm_group_formula:   '30 € × 4 people',
      pm_group_note:      'Fixed route · Bus · No choice',
      pm_private_label:   'Amonte — private tour',
      pm_private_formula: 'from 100 € for everyone',
      pm_private_total:   '= 25 € per person',
      pm_private_note:    'Your route · Your pace · Just you',
      pm_conclusion:      'For a family or couple, a private tour often works out',
      pm_conclusion_em:   'cheaper or the same as a group tour',

      tab_all:        'All routes',
      tab_short:      'Up to 2 hours',
      tab_short_hint: 'Quick trip from Budva',
      tab_half:       'Half day',
      tab_half_hint:  '~4–6 hours',
      tab_full:       'Full day',
      tab_full_hint:  'North, mountains, canyons',

      vibe_sea:       'Sea & Bay',
      vibe_boat:      'Boat',
      vibe_mountain:  'Mountains',
      vibe_monastery: 'Monasteries',
      vibe_nature:    'Nature',
      vibe_city:      'Old Towns',

      from:            'from',
      price_per_group: 'per group',

      routes_eyebrow: 'Routes',
      routes_title:   'What You\'ll See',
      routes_sub:     'Filter by time — or just browse',
      routes_empty:   'No routes match these filters — try a different combination or message me.',

      r7_badge:   '⚡ Quick trip',
      r7_title:   'Sveti Stefan & Viewpoint',
      r7_tagline: 'Best view of the Adriatic — 1.5–2 hours from Budva',
      r7_meta1:   '📍 Sveti Stefan · Coastal viewpoint',
      r7_meta2:   '⏱ 1.5–2 hours',
      r7_desc:    'If you have a couple of hours — we drive to the most photogenic stretch of coast. The island hotel, cliffs above the sea, no crowds.',
      r8_title:   'Lake Skadar',
      r8_tagline: 'Boat, pelicans, water lilies — the Balkans\' largest lake',
      r8_meta1:   '📍 Lake Skadar · National Park · Virpazar',
      r8_meta2:   '⏱ 5–6 hours',
      r8_desc:    'Boat trip on the lake, fishing hamlets on the water, flocks of pelicans. A place you\'d never expect in a country on the Adriatic.',
      r9_title:   'Ostrog Monastery',
      r9_tagline: 'Orthodox shrine built into a cliff at 900 metres',
      r9_meta1:   '📍 Ostrog · Danilovgrad',
      r9_meta2:   '⏱ 5–6 hours',
      r9_desc:    'A monastery literally fused into the rock at 900m above sea level. A place of pilgrimage for three faiths. The road up is a spectacle in itself.',


      r1_badge:   '⭐ Most popular',
      r1_title:   'Kotor & Bay of Kotor',
      r1_tagline: 'Medieval city, fortress walls, fishing villages along the water',
      r1_meta1:   '📍 Kotor · Perast · Our Lady of the Rocks',
      r1_meta2:   '⏱ 6–7 hours',
      r1_desc:    'One of Europe\'s most beautiful bays — without the pier crowds. Medieval walled city, hilltop fortress, a tiny island rising from the bay.',
      r2_title:   'Budva & Old Town',
      r2_tagline: 'The historic heart of the Adriatic coast',
      r2_meta1:   '📍 Old Town · Fortress · Adriatic',
      r2_meta2:   '⏱ 3–4 hours',
      r2_desc:    'Fortress, narrow streets, sea just steps away. The best route if you\'re already in Budva and want to truly understand it.',
      r3_title:   'Perast & the Islands',
      r3_tagline: 'A tiny bay town — where time seems to stop',
      r3_meta1:   '📍 Perast · Our Lady of the Rocks · Kotor',
      r3_meta2:   '⏱ 5–6 hours',
      r3_desc:    'Two islands rising from the water, baroque architecture, boats at the pier. One of the most photogenic spots in the entire Mediterranean.',
      r4_badge:   '⛰ Most dramatic',
      r4_title:   'Durmitor',
      r4_tagline: 'Mountain ranges, Black Lake, Tara River Canyon',
      r4_meta1:   '📍 Žabljak · Tara Canyon · Durmitor NP',
      r4_meta2:   '⏱ 10–11 hours',
      r4_desc:    'For those who want to see Montenegro beyond the beach. Europe\'s deepest canyon and wild mountains — all in one day.',
      r5_title:   'Cetinje — Historic Capital',
      r5_tagline: 'Royal monastery, museums, mountain atmosphere',
      r5_meta1:   '📍 Cetinje · Lovćen NP · Njegoš Mausoleum',
      r5_meta2:   '⏱ 5–6 hours',
      r5_desc:    'A place most tourists never reach without a guide. Mountain hairpins, Montenegro\'s old royal capital and history without the tourist gloss.',
      r6_title:   'Your Route',
      r6_desc:    'Tell me what interests you — we\'ll plan the day around it. Route combinations, off-the-beaten-path spots, special requests — all negotiable.',
      r6_cta:     'Message and discuss',
      r_cta:      'Discuss this route',

      guide_eyebrow:    'Your Guide',
      guide_title:      'Marko',
      guide_lead:       'I live in Montenegro and have been guiding tourists here for years.',
      guide_body:       'I don\'t work with bus groups. I work with people directly: we discuss what matters to you, where you want to go, how much time you have — and build the day around that. I know Kotor from the inside, not from a guidebook. I know where in Perast the best view of the bay is — without the crowds.',
      guide_f1_title:   'Private car',
      guide_f1_sub:     'Comfortable transfer, no changes',
      guide_f2_title:   'Route agreed in advance',
      guide_f2_sub:     'We discuss ahead, no surprises',
      guide_f3_title:   'Reply within the hour',
      guide_f3_sub:     'WhatsApp or Telegram, fast',
      guide_f4_title:   'RU / EN / SR',
      guide_f4_sub:     'I work in your language',

      how_eyebrow: 'Process',
      how_title:   'How It Works',
      how_sub:     'Three steps — from first message to departure',
      how_s1_title:'Message me',
      how_s1_body: 'On WhatsApp or Telegram. Tell me what you want to see, how much time you have, where you\'re staying.',
      how_s2_title:'We discuss the route',
      how_s2_body: 'I\'ll suggest a few options based on your interests. We fine-tune the details — and that\'s it.',
      how_s3_title:'We meet and go',
      how_s3_body: 'At the agreed time, I come to your hotel. From there — just the road and new places.',

      inc_eyebrow:  'Transparency',
      inc_title:    'What\'s Included — and What\'s Not',
      inc_sub:      'No hidden fees. You know in advance what you\'re paying for.',
      inc_yes_title:'Included',
      inc_no_title: 'Not included',
      inc_y1:       'Transfer in a private car',
      inc_y2:       'Guide escort throughout the day',
      inc_y3:       'Route tailored to your interests',
      inc_y4:       'Recommendations on food & places',
      inc_y5:       'Flexible pace — no rushing',
      inc_n1:       'Food & drinks',
      inc_n2:       'Museum entrance tickets',
      inc_n2_em:    '(usually €3–5)',
      inc_n3:       'Hotel bookings',
      inc_n4:       'Flights',
      inc_note:     'Entrance fees are minimal. I let you know in advance — no surprises at the ticket counter.',

      rev_eyebrow:   'Impressions',
      rev_title:     'What Travelers Say',
      rev1_text:     '"First time in Montenegro. Marko showed us Kotor so well that we walked back there on our own two more days. He knows every corner."',
      rev1_author:   '— Anna & Dmitry, Moscow',
      rev2_text:     '"Booked the day before, already on location. Marko arrived exactly on time. We did Perast + Kotor. Best day of the trip."',
      rev2_author:   '— Irina, Saint Petersburg',
      rev3_text:     '"Kids aged 7 and 10 — I was worried it would be hard. But we went at our own pace, stopped whenever we wanted. The kids asked to go again."',
      rev3_author:   '— Natalia, Kazan',

      faq_eyebrow: 'FAQ',
      faq_title:   'Frequently Asked Questions',
      faq1_q:      'How is this different from a group tour?',
      faq1_a:      'In a group, you follow a standard route with 20–40 strangers and stop where the bus schedule allows. With me — it\'s just you, your route, your pace.',
      faq2_q:      'How much does a private tour cost?',
      faq2_a:      'It depends on the route and duration. Message me — we\'ll discuss details and I\'ll give you an exact price.',
      faq3_q:      'What languages do you work in?',
      faq3_a:      'Russian, English, Serbian.',
      faq4_q:      'How long is the tour?',
      faq4_a:      'Usually 4–8 hours — we arrange it around your schedule.',
      faq5_q:      'Can I create a custom route?',
      faq5_a:      'Yes. That\'s exactly what I offer. Tell me what you want to see — I\'ll help plan the day.',
      faq6_q:      'Is prepayment required?',
      faq6_a:      'No. Payment is arranged by agreement, usually on the day of the tour.',

      fcta_title:    'Ready to See the Real Montenegro?',
      fcta_sub:      'Message me — let\'s talk about your route. No commitment.',
      fcta_wa:       'Message on WhatsApp',
      fcta_tg:       'Message on Telegram',
      fcta_note:     'Fast reply · No prepayment · In English / Русский / Srpski',
      footer_tagline:'Private tours in Montenegro',
    },

    sr: {
      nav_cta:        'Piši vodiču',
      hero_badge:     'Samo vi · Vaša ruta · Pravi vodič',
      hero_h1_line1:  'Privatne ture',
      hero_h1_line2:  'po Crnoj Gori',
      hero_sub:       'Vaša ruta, vaš tempo — bez autobusa i bez gužve.\nKotor, Budva, Durmitor, Perast i još mnogo toga.',
      hero_cta:       'Piši na WhatsApp',
      hero_support:   'Brz odgovor · Bez avansa · Ruta prema vašim željama',

      contrast_title: 'Ne autobus. Ne gužva. Ne tura kao i sve ostale.',
      contrast_sub:   'Grupne ture su praktične — ali nisu za svakoga. Evo razlike.',
      ct_param:       'Parametar',
      ct_group:       '🚌 Grupna tura',
      ct_amonte:      '✅ Amonte',
      ct_route:       'Ruta',
      ct_route_bad:   'Ista za sve',
      ct_route_good:  'Po vašoj meri',
      ct_pace:        'Tempo',
      ct_pace_bad:    'Fiksiran',
      ct_pace_good:   'Vaš',
      ct_group_size:  'Veličina grupe',
      ct_group_bad:   '20–40 osoba',
      ct_group_good:  'Samo vi',
      ct_stops:       'Zaustavljanja',
      ct_stops_bad:   'Po rasporedu',
      ct_stops_good:  'Gde vas zanima',
      ct_lang:        'Jezik vodiča',
      ct_lang_bad:    'Zajednički za grupu',
      ct_lang_good:   'Vaš maternji',
      ct_price:       'Cena',
      ct_price_bad:   '25–40 € po osobi',
      ct_price_good:  'od 25 €/os. za 4 putnika',

      pm_eyebrow:         'Računamo pošteno',
      pm_title:           'Koliko košta privatna tura zaista?',
      pm_group_label:     'Grupna tura',
      pm_group_formula:   '30 € × 4 osobe',
      pm_group_note:      'Fiksna ruta · Autobus · Bez izbora',
      pm_private_label:   'Amonte — privatna tura',
      pm_private_formula: 'od 100 € za sve',
      pm_private_total:   '= 25 € po osobi',
      pm_private_note:    'Vaša ruta · Vaš tempo · Samo vi',
      pm_conclusion:      'Za porodicu ili par — privatna tura obično izlazi',
      pm_conclusion_em:   'jeftinije ili isto kao grupna',

      tab_all:        'Sve rute',
      tab_short:      'Do 2 sata',
      tab_short_hint: 'Brzi izlet iz Budve',
      tab_half:       'Pola dana',
      tab_half_hint:  '~4–6 sati',
      tab_full:       'Ceo dan',
      tab_full_hint:  'Sever, planine, kanjoni',

      vibe_sea:       'More i zaliv',
      vibe_boat:      'Čamac',
      vibe_mountain:  'Planine',
      vibe_monastery: 'Manastiri',
      vibe_nature:    'Priroda',
      vibe_city:      'Stari gradovi',

      from:            'od',
      price_per_group: 'za grupu',

      routes_eyebrow: 'Rute',
      routes_title:   'Šta ćete videti',
      routes_sub:     'Filtrirajte po vremenu — ili samo listajte',
      routes_empty:   'Nema ruta za ove filtere — probajte drugu kombinaciju ili mi pišite.',

      r7_badge:   '⚡ Brzi izlet',
      r7_title:   'Sveti Stefan i vidikovac',
      r7_tagline: 'Najlepši pogled na Jadran — za 1,5–2 sata iz Budve',
      r7_meta1:   '📍 Sveti Stefan · Vidikovac',
      r7_meta2:   '⏱ 1,5–2 sata',
      r7_desc:    'Ako imate par sati — idemo do najfotogeničnijeg dela obale. Ostrvo-hotel Sveti Stefan, litice iznad mora, bez gužve.',
      r8_title:   'Skadarsko jezero',
      r8_tagline: 'Čamac, pelikani, lokvanje — najveće jezero Balkana',
      r8_meta1:   '📍 Skadarsko jezero · NP · Virpazar',
      r8_meta2:   '⏱ 5–6 sati',
      r8_desc:    'Vožnja čamcem po jezeru, ribarska sela na vodi, jata pelikana. Mesto koje ne očekujete videti u zemlji pored Jadrana.',
      r9_title:   'Manastir Ostrog',
      r9_tagline: 'Pravoslavna svetinja ugrađena u stenu na 900 metara',
      r9_meta1:   '📍 Ostrog · Danilovgrad',
      r9_meta2:   '⏱ 5–6 sati',
      r9_desc:    'Manastir bukvalno ugrađen u stenu na 900 metara nadmorske visine. Hodočasničko mesto za tri religije. Put do njega — posebna atrakcija.',


      r1_badge:   '⭐ Najpopularnija',
      r1_title:   'Kotor i Bokokotorski zaliv',
      r1_tagline: 'Srednjovekovni grad, tvrđava, ribarska sela uz vodu',
      r1_meta1:   '📍 Kotor · Perast · Gospa od Škrpjela',
      r1_meta2:   '⏱ 6–7 sati',
      r1_desc:    'Jedan od najlepših zaliva u Evropi — bez gužve na pristaništu. Stari grad unutar zidina, tvrđava, malo ostrvo usred zaliva.',
      r2_title:   'Budva i Stari grad',
      r2_tagline: 'Istorijsko srce jadranske obale',
      r2_meta1:   '📍 Stari grad · Tvrđava · Jadran',
      r2_meta2:   '⏱ 3–4 sata',
      r2_desc:    'Tvrđava, uske ulice, more na korak od vas. Najbolja ruta ako ste već u Budvi i želite da je zaista upoznate.',
      r3_title:   'Perast i ostrva',
      r3_tagline: 'Mali grad na zalivu — vreme kao da je stalo',
      r3_meta1:   '📍 Perast · Gospa od Škrpjela · Kotor',
      r3_meta2:   '⏱ 5–6 sati',
      r3_desc:    'Dva ostrva usred vode, barokna arhitektura, čamci na pristaništu. Jedno od najfotogeničnijih mesta celog Mediterana.',
      r4_badge:   '⛰ Najimpresivnija',
      r4_title:   'Durmitor',
      r4_tagline: 'Planinski masiv, Crno jezero, kanjon reke Tare',
      r4_meta1:   '📍 Žabljak · Kanjon Tare · NP Durmitor',
      r4_meta2:   '⏱ 10–11 sati',
      r4_desc:    'Za one koji žele da vide Crnu Goru van plaže. Najdublji kanjon Evrope i divlje planine — sve u jednom danu.',
      r5_title:   'Cetinje — istorijska prestonica',
      r5_tagline: 'Stari kraljevski manastir, muzeji, planinska atmosfera',
      r5_meta1:   '📍 Cetinje · NP Lovćen · Njegošev mauzolej',
      r5_meta2:   '⏱ 5–6 sati',
      r5_desc:    'Mesto do kojeg retko ko stigne bez vodiča. Vijugavi putevi u oblacima, stara kraljevska prestonica i istorija bez turističke ljušture.',
      r6_title:   'Vaša ruta',
      r6_desc:    'Recite mi šta vas zanima — planiraćemo dan po meri. Kombinacije ruta, neobična mesta, posebne želje — sve je dogovorivo.',
      r6_cta:     'Piši i dogovorimo se',
      r_cta:      'Razgovarajmo o ruti',

      guide_eyebrow:    'Vaš vodič',
      guide_title:      'Marko',
      guide_lead:       'Živim u Crnoj Gori i vodim turiste po ovoj zemlji već godinama.',
      guide_body:       'Ne radim sa grupama u autobusu. Radim direktno sa ljudima: razgovaramo o tome šta vam je važno, kuda želite, koliko vremena imate — i pravimo dan po meri. Znam Kotor iznutra, ne iz vodiča. Znam gde je u Perastu najlepši pogled na zaliv — bez gužve.',
      guide_f1_title:   'Lični automobil',
      guide_f1_sub:     'Udoban transfer, bez presedanja',
      guide_f2_title:   'Ruta uvek dogovorena',
      guide_f2_sub:     'Razgovaramo unapred, bez iznenađenja',
      guide_f3_title:   'Odgovor u roku od sat',
      guide_f3_sub:     'WhatsApp ili Telegram, brzo',
      guide_f4_title:   'RU / EN / SR',
      guide_f4_sub:     'Radim na vašem jeziku',

      how_eyebrow: 'Proces',
      how_title:   'Kako funkcioniše',
      how_sub:     'Tri koraka — od prve poruke do polaska',
      how_s1_title:'Pišite mi',
      how_s1_body: 'Na WhatsApp ili Telegram. Recite šta želite da vidite, koliko vremena imate, odakle polazite.',
      how_s2_title:'Dogovaramo rutu',
      how_s2_body: 'Predložiću nekoliko opcija prema vašim interesovanjima. Doradimo detalje — i spremi smo.',
      how_s3_title:'Srećemo se i krenemo',
      how_s3_body: 'U dogovoreno vreme, dolazim do vašeg hotela. Dalje — samo put i nova mesta.',

      inc_eyebrow:  'Transparentnost',
      inc_title:    'Šta je uključeno — a šta nije',
      inc_sub:      'Bez skrivenih naknada. Znate unapred za šta plaćate.',
      inc_yes_title:'Uključeno',
      inc_no_title: 'Nije uključeno',
      inc_y1:       'Transfer privatnim automobilom',
      inc_y2:       'Pratnja vodiča tokom celog dana',
      inc_y3:       'Ruta po vašim interesovanjima',
      inc_y4:       'Preporuke za hranu i mesta',
      inc_y5:       'Fleksibilan tempo — bez žurbe',
      inc_n1:       'Hrana i piće',
      inc_n2:       'Ulaznice za muzeje',
      inc_n2_em:    '(obično 3–5 €)',
      inc_n3:       'Rezervacija hotela',
      inc_n4:       'Avionske karte',
      inc_note:     'Ulaznice su minimalne. Obaveštavam unapred — bez iznenađenja na kasi.',

      rev_eyebrow:   'Utisci',
      rev_title:     'Šta kažu turisti',
      rev1_text:     '„Bili smo prvi put u Crnoj Gori. Marko nam je pokazao Kotor tako da smo se naredna dva dana vraćali pešice. Zna svaki kutak."',
      rev1_author:   '— Ana i Dmitrij, Moskva',
      rev2_text:     '„Rezervisali dan ranije, već smo bili na licu mesta. Marko je stigao tačno na vreme. Uzeli smo rutu Perast + Kotor. Najbolji dan putovanja."',
      rev2_author:   '— Irina, Sankt Peterburg',
      rev3_text:     '„Deca 7 i 10 godina — brinula sam da će biti teško. Tempo je bio naš, stajali smo koliko smo hteli. Deca su sama tražila da idemo ponovo."',
      rev3_author:   '— Natalija, Kazanj',

      faq_eyebrow: 'FAQ',
      faq_title:   'Česta pitanja',
      faq1_q:      'Čime se ovo razlikuje od grupne ture?',
      faq1_a:      'U grupi idete standardnom rutom sa 20–40 stranaca i stanete gde autobus kaže. Sa mnom — samo vi, vaša ruta, vaš tempo.',
      faq2_q:      'Koliko košta privatna tura?',
      faq2_a:      'Zavisi od rute i trajanja. Pišite mi — razgovaraćemo o detaljima i reći ću vam tačnu cenu.',
      faq3_q:      'Na kom jeziku radite?',
      faq3_a:      'Русский, English, Srpski.',
      faq4_q:      'Koliko traje ekskurzija?',
      faq4_a:      'Obično od 4 do 8 sati — dogovaramo prema vašem rasporedu.',
      faq5_q:      'Mogu li da kreiram svoju rutu?',
      faq5_a:      'Da. Upravo to i nudim. Recite mi šta želite da vidite — pomoći ću da isplaniram dan.',
      faq6_q:      'Da li je potrebna avansna uplata?',
      faq6_a:      'Ne. Plaćanje se dogovara, obično na dan ture.',

      fcta_title:    'Spremni da vidite pravu Crnu Goru?',
      fcta_sub:      'Pišite mi — pričaćemo o vašoj ruti. Bez obaveza.',
      fcta_wa:       'Piši na WhatsApp',
      fcta_tg:       'Piši na Telegram',
      fcta_note:     'Brz odgovor · Bez avansa · Na srpskom / Русский / English',
      footer_tagline:'Privatne ture po Crnoj Gori',
    },
  };

  /* ── SEO meta per lang ── */
  const seoMeta = {
    ru: {
      title: 'Экскурсии по Черногории с личным гидом — Amonte',
      desc:  'Индивидуальные туры по Черногории: Котор, Будва, Дурмитор, Перасть. Ваш маршрут, ваш темп. Персональный гид на русском языке. Напишите — обсудим.',
      lang:  'ru',
    },
    en: {
      title: 'Private Tours in Montenegro — Personal Guide | Amonte',
      desc:  'Private tours in Montenegro: Kotor, Budva, Durmitor, Perast. Your route, your pace. A local guide who speaks English. Message me — let\'s plan your day.',
      lang:  'en',
    },
    sr: {
      title: 'Privatne ture po Crnoj Gori — Lični vodič | Amonte',
      desc:  'Individualne ture po Crnoj Gori: Kotor, Budva, Durmitor, Perast. Vaša ruta, vaš tempo. Privatni vodič koji govori srpski. Pišite — dogovorimo se.',
      lang:  'sr',
    },
  };

  /* ── WhatsApp link params per lang ── */
  const waText = {
    ru: 'Хочу%20узнать%20про%20индивидуальный%20тур%20по%20Черногории',
    en: 'Hi!%20I%27d%20like%20to%20know%20about%20a%20private%20tour%20in%20Montenegro',
    sr: 'Zdravo!%20Zanima%20me%20privatna%20tura%20po%20Crnoj%20Gori',
  };
  const tgText = {
    ru: 'Хочу%20узнать%20про%20индивидуальный%20тур%20по%20Черногории',
    en: 'Hi!%20I%27d%20like%20to%20know%20about%20a%20private%20tour%20in%20Montenegro',
    sr: 'Zdravo!%20Zanima%20me%20privatna%20tura%20po%20Crnoj%20Gori',
  };

  let currentLang = 'ru';

  /* ── Apply translations ── */
  function applyLang(lang) {
    currentLang = lang;
    const strings = i18n[lang];
    if (!strings) return;

    // Update html lang attribute
    document.documentElement.lang = seoMeta[lang].lang;

    // Update meta title / description
    const titleEl = document.getElementById('page-title');
    const descEl  = document.getElementById('page-desc');
    if (titleEl) titleEl.textContent = seoMeta[lang].title;
    if (descEl)  descEl.setAttribute('content', seoMeta[lang].desc);

    // Update all [data-i18n] elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (strings[key] !== undefined) {
        // Handle newlines for subheadline
        if (strings[key].includes('\n')) {
          el.innerHTML = strings[key].replace(/\n/g, '<br>');
        } else {
          el.textContent = strings[key];
        }
      }
    });

    // Update lang switcher active state
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('lang-btn--active', btn.dataset.lang === lang);
    });

    // Update WhatsApp & Telegram CTA links
    const waNum = '38268458188';
    const tgHandle = 'amonter';
    document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
      a.href = `https://wa.me/${waNum}?text=${waText[lang]}`;
    });
    document.querySelectorAll('a[href*="t.me"]').forEach(a => {
      a.href = `https://t.me/${tgHandle}?text=${tgText[lang]}`;
    });

    // Persist choice
    try { localStorage.setItem('amonte_lang', lang); } catch(e) {}
  }

  /* ── Lang switcher ── */
  const switcher = document.getElementById('lang-switcher');
  if (switcher) {
    switcher.addEventListener('click', e => {
      const btn = e.target.closest('.lang-btn');
      if (btn && btn.dataset.lang) {
        applyLang(btn.dataset.lang);
      }
    });
  }

  /* ── Detect initial lang ── */
  function detectLang() {
    try {
      const saved = localStorage.getItem('amonte_lang');
      if (saved && i18n[saved]) return saved;
    } catch(e) {}
    const nav = (navigator.language || navigator.userLanguage || 'ru').toLowerCase().slice(0, 2);
    if (nav === 'en') return 'en';
    if (nav === 'sr' || nav === 'hr' || nav === 'bs') return 'sr';
    return 'ru';
  }

  /* ── Nav scroll state ── */
  const nav = document.getElementById('nav');
  if (nav) {
    const updateNav = () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 60);
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
    '.section__eyebrow', '.section__title', '.section__subtitle',
    '.contrast__table-wrap',
    '.route-card', '.how__step', '.included__col',
    '.trust__quote', '.faq__item',
    '.final-cta__headline', '.final-cta__body', '.final-cta__btns',
    '.guide__photo-col', '.guide__text-col',
  ];

  const observed = document.querySelectorAll(fadeTargets.join(', '));
  observed.forEach(el => el.classList.add('fade-up'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const parent = entry.target.parentElement;
          const siblings = parent ? [...parent.querySelectorAll('.fade-up')] : [];
          const idx = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, idx * 80);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    observed.forEach(el => io.observe(el));
  } else {
    observed.forEach(el => el.classList.add('visible'));
  }

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

  /* ── Route Filters (Time tabs + Vibe tags) ── */
  let activeTime = 'all';
  let activeVibes = new Set();

  function applyFilters() {
    const cards = document.querySelectorAll('#routes-grid .route-card');
    const empty = document.getElementById('routes-empty');
    let visibleCount = 0;

    cards.forEach(card => {
      const cardTime  = card.dataset.time   || 'all';
      const cardVibes = (card.dataset.vibes || 'all').split(' ');

      // Time match: 'all' on tab or card always passes
      const timeOk = activeTime === 'all' || cardTime === 'all' || cardTime === activeTime;

      // Vibe match: if no vibes selected, all pass; else card must have at least one
      const vibeOk = activeVibes.size === 0
        || cardVibes.includes('all')
        || [...activeVibes].some(v => cardVibes.includes(v));

      if (timeOk && vibeOk) {
        card.removeAttribute('data-hidden');
        visibleCount++;
      } else {
        card.setAttribute('data-hidden', '');
      }
    });

    if (empty) empty.hidden = visibleCount > 0;
  }

  // Time tabs
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

  // Vibe tags — toggle; multiple can be active
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

  // Initial filter state
  applyFilters();

  /* ── Init ── */
  applyLang(detectLang());

})();
