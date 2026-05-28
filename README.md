# SF Neighborhood Matcher

A live-scoring tool that ranks all 15 San Francisco neighborhoods against your budget, commute, and lifestyle priorities. Adjust the sliders and results update instantly — no form submission, no page reload.

---

## How to run it

No build step. The app runs directly in the browser.

**Option 1 — local server (recommended)**

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```

Then open `http://localhost:8080/SF Neighborhood Matcher.html`.

**Option 2 — open directly**

Some browsers block local `fetch` requests from `file://`. If the map or data fails to load, use the server option above instead.

---

## Tech

| Layer | What's used |
|---|---|
| UI | React 18 (via CDN, no bundler) |
| JSX | Babel Standalone — transpiled in-browser |
| Map | Leaflet 1.9 |
| Styles | Plain CSS with custom properties (`tokens.css`, `app.css`) |
| Data | Static JSON (`neighborhoods.json`) loaded as a JS global |
| Scoring | Vanilla JS (`scoring.js`) — no library dependencies |

No npm, no build pipeline, no backend. Everything runs from static files.

---

## Project structure

```
├── SF Neighborhood Matcher.html  # entry point
├── App.jsx                       # root component, state, live scoring
├── scoring.js                    # scoring algorithm (pure function)
├── data.js                       # neighborhood data + lifestyle categories
├── neighborhoods.json            # source data (15 SF neighborhoods)
├── tokens.css                    # design tokens
├── app.css                       # component styles
├── tweaks-panel.jsx              # visual tweaks panel (accent, density)
└── components/
    ├── BriefPanel.jsx            # preferences sidebar
    ├── MapPanel.jsx              # Leaflet map
    ├── ResultCard.jsx            # ranked result row
    ├── DetailSheet.jsx           # per-neighborhood deep-dive overlay
    └── CompareSheet.jsx          # side-by-side compare (up to 3)
```

---

## How the scoring works

Each neighborhood gets a 0–100 score across five weighted dimensions:

- **Rent fit** — quadratic falloff from budget to 2× budget
- **Safety** — inverse of crime index
- **Commute** — haversine distance to work location vs. stated max
- **Lifestyle** — weighted blend of six user-set priorities (dining, outdoors, walkability, quiet, arts, fitness)
- **Parking** — only factored in when the user owns a car

Weights are dynamic: lifestyle weight grows as more sliders are engaged; safety weight increases if quiet is prioritised. All weights are normalised so they always sum to 1.

---

## Development notes

The data for each neighborhood is hand-curated across 11 metrics. A few issues came up during development worth noting:

**Duplicate lifestyle dimensions** — Arts and Fitness were initially both reading from the same source fields as Dining and Outdoors (`nightlife_density` and `parks_nearby`), so moving those sliders had no independent effect. Fixed by adding two new data fields — `cultural_pois` (museums, theaters, galleries) and `gym_density` — and blending them with the original metrics.

**Placeholder data** — Mission District shipped with `crime_rate: 100` and `noise_complaints: 100`, both the theoretical maximum. These were clearly test values: Tenderloin scored 98 and 65 respectively, and the 35-point noise gap between Mission and Tenderloin had no basis in reality. Corrected to `72` and `78`.

**Lifestyle score inflation** — when no lifestyle sliders were set, `lifestyleScore` defaulted to `100` and still carried a 15% weight in the final score, inflating every neighborhood equally before users had engaged. Fixed by zeroing out the lifestyle weight entirely when no sliders are active.

**Rent cliff** — the original formula scored any neighborhood at exactly 1.5× the user's budget as a flat 0, which was too harsh and erased useful differentiation in the $3,500–$5,000 range where many neighborhoods cluster. Replaced with a quadratic falloff over a 2× range.

**Track button labelling** — the lifestyle intensity selector rendered as three unlabelled coloured blocks, with labels only appearing on hover via `title`. Added a persistent "— / Some / Very" label row beneath each track.

---

## Wishlist

- **Real data** — current metrics are manually estimated; wiring up live sources (SF Open Data, Yelp Fusion, Walk Score API) would make rankings meaningfully more accurate
- **More neighborhoods** — SF has around 35–40 distinct areas; the current 15 miss chunks of the city
- **Mobile layout** — the rail + main column layout breaks on small screens
- **Weight breakdown in the UI** — the scoring engine already returns the computed weights per result; a "how this was calculated" panel in the detail sheet would make the ranking feel less like a black box
- **Rent trend data** — showing whether a neighborhood is getting more or less affordable over time would add real decision-making value
- **Saved searches** — export or share a URL that encodes your current preferences
- **Actual transit routing** — commute is currently estimated as straight-line distance × a fixed multiplier; Google Maps or 511 SF Bay API would give real transit times
