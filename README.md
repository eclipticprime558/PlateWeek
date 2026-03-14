# PlateWeek

**Meal planner, calorie tracker, and personalized fitness app — installable on iPhone and Android.**

> Plan your week, track your food, crush your fitness goals. No account required. Your data stays on your device.

---

## Live App

**[plateweek — open in browser](https://eclipticprime558.github.io/PlateWeek/)**

On iPhone: open in Safari → Share → **Add to Home Screen** for the full app experience.
On Android: open in Chrome → tap the install banner or menu → **Add to Home Screen**.

---

## Features

### Meal Planning
- 7-day weekly calendar with Breakfast, Lunch, and Dinner slots
- Smart meal suggestions based on your personal history
- One-tap meal check-ins to log what you actually ate
- Auto-fill week based on your patterns

### Calorie Tracking
- 150+ food database including fast food (Big Mac, Chipotle, etc.)
- Daily calories eaten / burned / net / target
- Smart workout recommendations when you're in a calorie deficit

### Fitness Hub
- Gender-specific fitness programs (shred, cut, build, tone, and more)
- 7-day workout schedules with sets, reps, and rest guidance
- Per-exercise explanations of *why* each movement is recommended
- Adjustable reps/sets — customize any program to your level
- Gym equipment profile: Full Gym, Apartment Gym, Home Gym, Calisthenics, No Equipment
- Exercises automatically filtered to what your gym actually has
- Gender-split exercise library (Women's / Men's) organized by muscle group

### Exercise Library
- Compact scannable list — tap to expand any exercise
- Step-by-step 2D instructions for each movement
- Watch Tutorial button links to gender-matched YouTube demos
- Equipment badge and training rationale for every exercise

### Grocery List
- ATB aisle layout — organized the way the store is laid out
- Voice add: say "Plate Week, add eggs" to add items hands-free
- Drag to reorder aisles to match your store
- Auto-generates grocery list from your planned meals

### Goals & Profile
- BMR / TDEE calculator
- Goal feasibility analysis (is your target realistic by your date?)
- Supports: lose weight, maintain, build muscle, athletic performance

### Voice Commands
- "Plate Week, add [item]" — adds to grocery list
- "Plate Week, I ate a [food]" — logs a calorie entry

### Notifications
- Meal-time check-in reminders (Breakfast, Lunch, Dinner windows)

---

## Install as an App (PWA)

PlateWeek is a **Progressive Web App** — no App Store required.

| Platform | Steps |
|----------|-------|
| iPhone / iPad | Safari → Share → Add to Home Screen |
| Android | Chrome → menu (⋮) → Add to Home Screen |
| Desktop | Chrome address bar → install icon |

Once installed, it works **offline** and launches fullscreen like a native app.

---

## Tech

- **Single-file HTML/CSS/JS** — no build tools, no frameworks, no backend
- **localStorage** for all data — nothing leaves your device
- **PWA** with service worker (offline-capable, installable)
- **Web Speech API** for voice commands (Chrome / Safari)
- **Web Notifications API** for meal-time reminders

---

## Development

Open `index.html` directly in Chrome — no server or install needed.

```
plateweek/
├── index.html        # The entire app (HTML + CSS + JS inline)
├── icon.svg          # App icon (favicon + home screen)
├── manifest.json     # PWA manifest
└── sw.js             # Service worker (offline caching)
```

All data is stored in `localStorage` under the `pw_` prefix. No accounts, no servers, no tracking.

---

## Roadmap

- [ ] Cloud sync / multi-device support
- [ ] Barcode scanner for grocery items
- [ ] Weekly email or notification digest
- [ ] Shared grocery list (family/partner sync)
- [ ] Native iOS / Android app (App Store)

---

## License

MIT — use it, fork it, build on it.
