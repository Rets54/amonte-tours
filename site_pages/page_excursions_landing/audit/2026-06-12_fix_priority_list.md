# Fix Priority List — Amonte Excursions Landing
**Date:** 2026-06-12
**Launch status:** ready_with_minor_warnings
**Launch context:** direct_launch

---

## Priority 1 — Before Launch (критично, блокирует запуск)

### 1.1 Убрать или заменить фиктивные отзывы
**Файл:** `site/index.html`, секция `trust__quotes` (строки 370–383)

Три блокquote содержат заглушки (Марина / Андрей и Оля / Семья Козловых).

**Действие:**
- Вариант A: Убрать весь блок `<div class="trust__quotes">` — галерея реальных фото компенсирует
- Вариант B: Заменить на реальные отзывы от реальных гостей

---

### 1.2 Проверить Telegram handle
**Файл:** `site/app.js`, строка 146

```js
const tgUrl = `https://t.me/amonter?text=${encoded}`;
```

Проверить, что `@amonter` — активный и корректный Telegram-аккаунт. Если другой — исправить.

---

### 1.3 Добавить favicon
**Файл:** `site/index.html`, в `<head>`

Добавить строку:
```html
<link rel="icon" type="image/png" href="img/favicon.png">
```

Создать простой favicon (логотип «A» Amonte) 32×32px.

---

## Priority 2 — Improve Soon (не блокирует, но режет результат)

### 2.1 Заменить AI-фото в карточках маршрутов
**Файл:** `site/img/route_*.png`

Текущие: `route_durmitor.png`, `route_kotor.png`, `route_skadar.png`, `route_lovcen.png`, `route_ostrog.png`, `route_stari_bar.png` — AI-generated.

**Действие:** Отобрать из `/photos/IMG_96**.jpg` лучший снимок для каждого маршрута и использовать его как route card image. Обрезать до соотношения 4:3.

---

### 2.2 Добавить OG-метатеги
**Файл:** `site/index.html`, в `<head>` после `<meta name="description">`

```html
<meta property="og:title" content="Amonte — Черногория без автобуса и без толпы">
<meta property="og:description" content="Однодневные маршруты на машине с личным гидом. Дурмитор, Котор, Скадар — выбираете куда, мы знаем что показать.">
<meta property="og:image" content="https://amonte.me/img/hero_montenegro.png">
<meta property="og:url" content="https://amonte.me">
<meta property="og:type" content="website">
```

---

### 2.3 Добавить ценовой ориентир
**Место:** Карточки каталога или блок Included/Excluded

Даже «от 50 €» или «цена зависит от маршрута — уточните» снимает friction у туристов с ограниченным бюджетом.

---

### 2.4 Исправить год в footer
**Файл:** `site/index.html`, строка 633

```html
<!-- Было: -->
<p class="footer__copy">© 2025 Amonte</p>

<!-- Стало: -->
<p class="footer__copy">© 2026 Amonte</p>
```

---

## Nice to Have (улучшать позже)

### Улучшить alt-тексты в галерее
**Файл:** `site/index.html`, секция `gallery__grid`

Заменить `alt="Черногория"` на описательные: например `alt="Вид на каньон Тары с высоты птичьего полёта"`, `alt="Закат над Скадарским озером"` и т.д.

---

### Добавить счётчик аналитики
Яндекс.Метрика или Google Analytics. Без аналитики невозможно оптимизировать direct_launch кампанию.

---

### Добавить canonical URL
```html
<link rel="canonical" href="https://amonte.me">
```

---

### Рассмотреть добавление FAQ
4–5 вопросов (цена, языки, дети, бронирование) улучшат конверсию и будущее GEO-покрытие.

---

## Итоговая таблица

| # | Задача | Приоритет | Сложность | Влияние |
|---|--------|-----------|-----------|---------|
| 1.1 | Убрать/заменить фиктивные отзывы | P1 | Низкая | Высокое |
| 1.2 | Проверить Telegram handle | P1 | Низкая | Критично |
| 1.3 | Добавить favicon | P1 | Низкая | Среднее |
| 2.1 | Заменить AI-фото в карточках | P2 | Средняя | Высокое |
| 2.2 | OG-метатеги | P2 | Низкая | Среднее |
| 2.3 | Ценовой ориентир | P2 | Низкая | Среднее |
| 2.4 | Год в footer | P2 | Минимальная | Косметика |
| 3.1 | Alt-тексты в галерее | NTH | Средняя | Низкое |
| 3.2 | Аналитика | NTH | Средняя | Высокое |
| 3.3 | Canonical URL | NTH | Минимальная | Низкое |
| 3.4 | FAQ | NTH | Высокая | Среднее |
