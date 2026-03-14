# PlateWeek — Claude Code Project Context

## What This Is
PlateWeek is a single-file HTML/CSS/JS meal and workout planner web app. No build process, no dependencies, no server required. Open `index.html` directly in Chrome.

## Architecture
**Single file**: `index.html` contains all HTML, CSS, and JavaScript inline.  
**Storage**: `localStorage` only — all data is browser-local, prefixed with `pw_`.  
**No frameworks**: Vanilla JS, no React/Vue/build step.

## Storage Keys (localStorage prefix: `pw_`)
| Key | Type | Contents |
|-----|------|----------|
| `pw_plans` | object | `{ "YYYY-MM-DD": { Breakfast, Lunch, Dinner } }` |
| `pw_history` | array | `[{ date, mealType, mealName, eaten }]` — max 600 entries |
| `pw_workouts` | object | `{ "YYYY-MM-DD": { type, duration, notes, completed } }` |
| `pw_grocery_items` | array | `[{ name, section, checked, sources[], voice }]` |
| `pw_section_order` | array | `["produce","bread","meat",...]` — user aisle order |
| `pw_seeded` | bool | Prevents demo data re-seeding |
| `pw_notif_dismissed` | bool | Notification bar dismissed |
| `pw_checked_YYYY-MM-DD` | object | `{ Breakfast, Lunch, Dinner }` — check-in fired flags |

## Key Systems

### Pattern Engine (`Pattern` object)
- `getSuggestions(mealType, exclude[], count)` — ranks meals by frequency, excludes yesterday's
- `record(dateKey, mealType, mealName, eaten)` — upserts history entry
- `autoFill(dates[])` — fills empty week slots using patterns

### Grocery Engine (`Grocery` object)
- `generate(dates[])` — builds list from planned meals using `MEAL_INGREDIENTS` map, merges with existing
- `addItem(name, fromVoice)` — classifies item via `classifyItem()` keyword matcher

### Voice Engine (`Voice` object)
- Uses Web Speech API (`SpeechRecognition`) — Chrome only
- Wake phrases: "Plate Week", "Okay Plate Week", "Hey Plate Week"
- Commands: "add [item]", "add [item] to the list"
- `speak(text)` — speech synthesis feedback
- Auto-restarts on `onend` to keep listening

### Store Section Order
- `STORE_SECTIONS` array defines 11 ATB aisles (produce → juice)
- `getSectionOrder()` loads user order from `pw_section_order`, falls back to default
- `saveSectionOrder(sections[])` persists custom order
- `classifyItem(name)` matches item name against `SECTION_KEYWORDS` map → section id

### Notification Manager (`NotifMgr`)
- Web Notifications API — checks meal time windows every 60s
- Meal windows: Breakfast 6–9am (check-in 9am), Lunch 11am–1pm (check-in 1:30pm), Dinner 5–7pm (check-in 7:30pm)

## Views
- `week` — 7-day grid (Mon–Sun) × 4 rows (B/L/D/Workout)
- `day` — Card view for one day + suggestions panel
- `grocery` — Aisle-ordered list with reorder mode
- `history` — Meal log + top meals

## ATB Store Aisle Order (default)
1. Produce
2. Bread & Chips
3. Kitchen & Tools
4. Meat & Seafood
5. Deli, Cheese & Sandwich
6. Condiments & Specialty
7. Cleaning & Household
8. Dry Goods & Pantry
9. Frozen
10. Dairy & Eggs
11. Juice & Beverages

## Planned / Future Features
- PWA manifest + service worker (offline, iPhone home screen install)
- Cloud sync / backend API for cross-device
- Weekly email digest
- Nutritional estimates per meal
- Barcode scanner for grocery items
- Shared grocery list (multi-user)

## Dev Notes
- Primary platform: Windows PC (Chrome). Secondary: iPhone (Chrome/Safari).
- Voice wake phrase only works in Chrome (Web Speech API).
- All modals close on ESC key and clicking the overlay backdrop.
- Demo data seeds 3 weeks of meals + workouts on first open (`pw_seeded` flag prevents re-seed).
- `render()` is the master re-render — call it after any state change.
- CSS vars are defined in `:root` — dark editorial palette, amber accents.
