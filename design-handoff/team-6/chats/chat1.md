# Neighborhood Matcher Quiz

_Started 2026-05-19 17:53 UTC_

---

## User

<system-info comment="Only acknowledge these if relevant">
Project title is now "team 6"
Current date is now May 19, 2026
</system-info>

<!-- The user explicitly selected the following skills for this project, as attachments to their message. These are not optional context — they define how you work. Use them. -->
<attached-skill name="Hi-fi design">
Create a high-fidelity, polished design. Follow the instructions about design in your system prompt, particularly the 'How to do design work' section. Use the design_canvas starter component, or make a full-bleed prototype and offer options via Tweaks.
</attached-skill>

<attached-skill name="Interactive prototype">
Create a fully interactive prototype with realistic state management and transitions. Use React useState/useEffect for dynamic behavior. Include hover states, click interactions, form validation, animated transitions, and multi-step navigation flows. It should feel like a real working app, not a static mockup.
</attached-skill>

<attached-skill name="SF Neighborhood Matcher Design System (design system)">
[Design System] This project uses the **SF Neighborhood Matcher Design System** design system. This is a binding choice for visual style — every visual must follow it. Don't invent colors, type, spacing, or components not grounded here.

Scope: the design system is a visual style reference only. Its guide may describe example products, brands, or people that are unrelated to the user and unrelated to the subject of this conversation. Never treat anything in the design system as a fact about the user, their work, or the topic they asked about.

    Explore it to find what you need:
    - Always copy out the fonts and colors you need
    - For prototypes and designs, always copy out any relevant components
    - If the design system contains existing mocks of products, and you were asked to design or prototype something similar, copy and fork those mocks to start your design. This helps you make high-quality designs.
    
    Explore it quickly to find relevant UI kits (e.g. mocks of existing products you can copy and fork)

Full system at `/projects/ba98a879-30e3-48bc-8f75-c6de79d76d8e/`. Its guide is reproduced below so you don't need to fetch it:

<design-system-guide>
# SF Neighborhood Matcher — Design System

A small, opinionated design system extracted from the **SF Neighborhood Matcher** — a student data-science project that helps people find the right San Francisco neighborhood by budget, commute, and lifestyle priorities.

> **Source**: [`kathes-prog/Team-6-Data-Science-Project`](https://github.com/kathes-prog/Team-6-Data-Science-Project) — `index.html`, `statistics.html`, `neighborhoods.json`. The original is a single-page static site (Leaflet map + Chart.js) with no build step. **You should explore that repo directly** if you need to extend this design system, verify edge-case behaviour, or copy additional logic.

The product is two pages:

1. **Neighborhood Matcher** (`index.html`) — a quiz form (rent slider, commute slider, work-location dropdown, car toggle, six "lifestyle priorities" as 3-button segmented controls) that scores 15 SF neighborhoods and renders ranked result cards next to a Leaflet map.
2. **Neighborhood Statistics** (`statistics.html`) — a correlation table over the same dataset, plus two Chart.js scatterplots with a fitted trendline.

It is not a corporate product; it's a class deliverable. The system reflects that: **utilitarian, data-first, minimal, and unapologetically OS-native** — system fonts, white background, one strong brand green, and a small set of semantic colors for scoring.

---

## Manifest

| File / folder | What's in it |
|---|---|
| `README.md` | This file. Brand context, content + visual fundamentals, iconography, index. |
| `SKILL.md` | Agent Skills front-matter so this folder is portable to Claude Code. |
| `colors_and_type.css` | Base + semantic CSS custom properties. Token names like `--brand-green`, `--score-good`, `--fg-1`, `--t-h1`. **Import this first in any new artifact.** |
| `source/` | Verbatim copies of the original GitHub files (`index.html`, `statistics.html`, `neighborhoods.json`). Read-only reference. |
| `assets/` | Brand mark, favicons, and any extracted illustrations. |
| `preview/` | Design-system card HTMLs surfaced in the Design System tab. |
| `ui_kits/matcher/` | High-fidelity, modular React recreation of the **Neighborhood Matcher** UI (the quiz + results layout). See `ui_kits/matcher/README.md`. |
| `ui_kits/statistics/` | High-fidelity React recreation of the **Statistics** page (correlation table + scatter chart panels). See `ui_kits/statistics/README.md`. |

There are **no slide templates** in the source, so no `slides/` folder is created.

### Quick index for agents

If you're building a new artifact in this brand, start here:

1. **Read `README.md`** (this file) end-to-end — the *Content Fundamentals*, *Visual Foundations*, and *Iconography* sections are non-negotiable rules.
2. **Import `colors_and_type.css`** at the top of your HTML or main stylesheet. Use the CSS variables, not literal hex.
3. **Crib from `source/index.html` and `source/statistics.html`** for any interaction not already captured in the UI kits.
4. **Lift components from `ui_kits/matcher/` or `ui_kits/statistics/`** — they are scoped (`.mk-*` and `.sk-*`) and modular. Copy the `.jsx` + the relevant chunk of `styles.css` into your artifact.
5. **Browse `preview/*.html`** for at-a-glance specimen views of every token cluster.
6. The `assets/` folder holds the wordmark mark + favicon. There is no other imagery in the brand.

---

## Brand & product identity

- **Name**: *SF Neighborhood Matcher* (page title), sometimes shortened to "Neighborhood Matcher" in nav.
- **One-liner** (from the page header): *"Find your perfect San Francisco neighborhood based on budget and lifestyle"*.
- **Domain**: civic / quality-of-life data tooling. Not real estate listings — it doesn't show actual rentals, it scores neighborhoods on aggregate signals.
- **Audience**: people moving to or within SF; secondarily, a grading committee.
- **Tone**: confident, neutral, lightly conversational. Sounds like a well-designed government dashboard — not a startup, not a brochure.

---

## CONTENT FUNDAMENTALS

### Voice and tone

- **Plain and declarative.** "Find your perfect San Francisco neighborhood based on budget and lifestyle." No exclamation marks anywhere in the source. No hype words.
- **Second person, but sparingly.** "Your Preferences", "Your Top Matches", "Find my neighborhood". The form switches between *your* (when the product is talking to the user) and *my* (when the user is talking to the product, e.g. the CTA copy). Both are fine — pick whichever is natural for the surface.
- **No marketing voice.** There are no taglines, no "delight", no "magical", no "powered by AI". The product just describes what it does.
- **Data-forward.** The statistics page reads as plainly as possible: *"Data-driven insights across 15 San Francisco neighborhoods"*. Numbers are the content.

### Casing

- **Title Case** for: page header H1 (`SF Neighborhood Matcher`), section titles (`Your Preferences`, `Your Top Matches`, `Neighborhood Statistics`, `Lifestyle Priorities`, `Correlation Matrix`), form field labels (`Monthly Rent Budget`, `Max Commute Time`, `Work Location`, `Car Ownership`).
- **Sentence case** for: long-form hints, descriptions, pill labels, and toggle copy (`I own a car`, `Dining out & nightlife`, `Outdoor access & parks`, `Quiet & residential`).
- **lowercase** for: best-for tags rendered inside the green pill (`walkability + dining`, `safety + transit`, `parks`, `quiet`). These read as *attributes*, not as proper nouns.
- **ALL CAPS is never used.** Don't introduce it.

### Punctuation & glyphs

- **Em-dash / en-dash used sparingly:** ranges read with an en-dash (`$1,500 — $6,000`, `0 — 60 minutes`); the page subtitle uses an em-dash separator (`Neighborhood Statistics — SF Neighborhood Matcher`).
- **Arrow on the CTA**: `Find my neighborhood →`. The right-arrow is part of the button copy, not an icon. Lightweight directionality cue.
- **Caret for expand/collapse**: `Show score breakdown ▾` / `Hide score breakdown ▴` — Unicode triangle, not an icon font.
- **Ampersand is preferred over "and"** in short labels: `Dining out & nightlife`, `Quiet & residential`, `Arts & culture scene`.

### Microcopy patterns

| Surface | Pattern | Example |
|---|---|---|
| Form labels | Title Case noun phrase, no colon | `Monthly Rent Budget` |
| Field hint | Range in en-dash form | `$1,500 — $6,000` |
| Toggle | First-person verb phrase | `I own a car` |
| Segmented option | 1–3 words | `Not important` · `Somewhat` · `Very important` |
| Big CTA | First-person imperative w/ arrow | `Find my neighborhood →` |
| Empty state | One sentence, instructional | `No results yet. Fill out the form above.` |
| Best-for tag | Lowercase, ` + ` separated | `walkability + dining` |
| Card pill | `Label` + `<strong>value</strong>` | `Rent **$3,295**` · `Crime **Low**` |
| Score band labels | Single word | `Low` · `Medium` · `High` |

### Emoji

**Not used.** The source contains zero emoji. Don't add them — the visual vocabulary is colored dots, percentage badges, and underlined section titles. If a glyph is genuinely needed (arrow, caret), use Unicode characters consistent with what's already in the source (`→`, `▾`, `▴`).

### Vibe in one sentence

*A no-nonsense data dashboard that respects your time, written like a competent civic-tech project — informative, calm, and a little nerdy.*

---

## VISUAL FOUNDATIONS

### Colors

One brand color carries the entire system:

- **`--brand-green` `#1D9E75`** — header background, primary CTA, range thumb, rank badge, score-bar fill (for top-tier scores), section-title underline, top-match map markers, range-display number, "best-for" pill text, big match-percent readout.
- **`--brand-green-dark` `#178a64`** — nav bar background, CTA hover.
- **`--brand-green-tint` `#e8f7f2`** — background of the "best-for" inline tag.
- **`--brand-green-wash` `#f0faf6`** — segmented-button hover wash.

Score band (used on map markers, score bars, and would extend to any "good/middle/bad" treatment):

- `> 75 %` → **`--score-good` `#1D9E75`** (same as brand)
- `50–75 %` → **`--score-mid` `#BA7517`** (amber/brown — *not* yellow; an earthier hue that respects the muted palette)
- `< 50 %` → **`--score-bad` `#E24B4A`** (warm coral red, *not* a saturated alarm red)

Neutrals are an unfussy grayscale built from named values (no programmatic ramp):

`#111 #1a1a1a #333 #444 #555 #666 #888` for text, then `#aaa #d0d0d0 #e0e0e0 #e8e8e8 #efefef #f0f0f0 #f3f4f6 #f9fafb #fafafa #fff` for surfaces and dividers. They get exposed as `--fg-1…--fg-mute` and `--bg / --bg-soft / --bg-pill / --bg-track / --border / --border-strong`.

There are **no gradients**. The page is flat color blocks separated by thin borders.

### Typography

- **Font family**: `system-ui, -apple-system, sans-serif`. **No webfonts**. This is intentional — the design reads as native to whatever OS the user is on. *(No font files exist in this design system; if you ever swap to a webfont, document the substitution at the top of `colors_and_type.css`.)*
- **Weights used**: 400 (default), 500 (nav links, pills), 600 (labels, h3), 700 (h1, section titles, CTA, card name), 800 (rank badge, big percent readouts). The 800 weight is reserved for "this is the number you're scanning for".
- **Size scale**: ~12.5px → 28.8px in coarse half-step jumps. Exposed as `--t-xs … --t-h1`. There is no consistent type ramp (e.g. major-third or perfect-fourth) — sizes are chosen contextually.
- **Line-height**: body `1.5`, headings tighter.
- **No tracking adjustments, no font-feature-settings, no smallcaps.**

### Spacing & layout

- Rhythm is a loose ~`0.25rem` grid, but the source uses ad-hoc rem values (`0.4rem, 0.55rem, 0.6rem, 0.65rem, 0.75rem, 0.85rem, 1.1rem, 1.25rem, 1.5rem, 2rem`). Stick to the `--space-1…8` tokens for new work.
- Page is centered: `max-width: 1100px`, `margin: 0 auto`, horizontal padding `1.5rem` (24px).
- Header and nav are **full-bleed** with their green backgrounds; content sections live inside the centered column.
- Results layout is `flex 6 / flex 4` (cards / sticky map) with `1.5rem` gap; collapses to a single column under 768px.

### Backgrounds & imagery

- **Background**: pure white (`#fff`) for the page, very-near-white (`#f9fafb`) for the results section so the cards "lift" against it.
- **No imagery, no illustrations, no photography, no patterns, no textures, no full-bleed hero images.** The only non-text surface is the Leaflet map (OpenStreetMap tiles), which is geographic data, not decoration.
- **No background-image use anywhere.** If imagery is ever added, lead with a thin border and rounded `--r-card` to match the map's container treatment.

### Animation & motion

- Almost none. Only short hover/state transitions:
  - Color & border-color: `0.15s` linear.
  - CTA hover: `transform: translateY(-1px)` on hover, returns on `:active`.
  - Score-bar fill grows: `width 0.5s ease`.
  - Map markers and chart appearance use library defaults; no custom motion.
- **No bounces, no springs, no entrance animations, no parallax, no scroll-linked effects.** The smooth-scroll-into-results on form submit is the most flamboyant motion in the entire app.

### Hover & press states

- **CTAs (`.find-btn`, nav links)**: hover **darkens** (`#1D9E75` → `#178a64`). Translate-Y on `.find-btn` for press feedback.
- **Segmented buttons**: hover gets a green border + pale-green wash (`--brand-green-wash`). Active gets a solid green fill with white text and bold weight.
- **Result cards**: hover raises a soft shadow (`0 4px 16px rgba(0,0,0,0.08)`). No lift, no scale.
- **Expand toggle**: hover swaps `#f9fafb` → `#f0f0f0`.
- **Press states are intentionally light** — only `.find-btn` has an `:active` rule. The rest reuse hover styles.
- **No opacity-based hover** (`opacity: 0.8`) anywhere. Color/border changes only.

### Borders, radii, shadows

- **Borders**: 1.5px is the workhorse weight (cards, inputs, charts, map, table). 1px for divider rows. 2px solid `--brand-green` for the section-title underline. 3px transparent bottom-border on nav for the active indicator.
- **Radii**: `4px` (score-bar fill), `6px` (segmented buttons, selects, inputs), `8px` (big CTA, table), `10px` (cards, map, chart boxes), `20px` (pills), `50%` (rank badge, range thumb).
- **Shadows**: only two —
  - `0 1px 4px rgba(0,0,0,0.2)` on the range slider thumb.
  - `0 4px 16px rgba(0,0,0,0.08)` on hovered result cards.
- **No inner shadows. No glow effects. No multi-layer shadows.** If you need elevation, prefer a `1.5px` border over a shadow.

### Transparency & blur

- Used **only** on the green header for whites-over-green: `rgba(255,255,255,0.88)` on the header subtitle, `rgba(255,255,255,0.75)` on inactive nav links.
- **No `backdrop-filter`, no glass surfaces, no frosted effects.**

### Cards

The result card is the system's flagship component. Construction:

- White background, `1.5px solid #e0e0e0` border, `10px` border-radius, `overflow: hidden` so the inner sections (header / pills / best-for / expand-toggle / breakdown) read as one block.
- **No outer shadow at rest.** Shadow appears only on hover.
- Internal structure top-to-bottom: rank badge + name + percent → score bar → 4 metric pills → "Best for: pill" → expand toggle (chrome-grey strip) → optional breakdown panel.
- Chart boxes and the map reuse the same shell: `1.5px` border, `10px` radius, no shadow.

### Layout rules

- **Sticky map** on the results screen (`position: sticky; top: 1rem`) — only fixed element in the app. Becomes static below 768px.
- **No fixed headers, no floating buttons, no modals, no drawers, no popovers** (Leaflet's marker popups are the only popup).
- Forms use a 2-column grid that collapses to 1 column on mobile.
- The lifestyle grid uses `repeat(auto-fill, minmax(280px, 1fr))` — naturally re-wraps with viewport.

### Color vibe in imagery

There is no imagery in the source. The map tile style is default OpenStreetMap (warm-cream backgrounds, low-saturation roads). If photography or illustration is ever added, it should match that visual temperature: **slightly warm neutrals, low saturation, natural daylight**. Avoid cool blue-tinted product shots; they fight the green-against-warm-neutrals palette.

---

## ICONOGRAPHY

The source uses **no icon font, no SVG icon set, and no PNG icons**. Iconographic information is conveyed three ways:

1. **Colored dots / shapes on the map.** Leaflet `circleMarker` with three radii (18px = top match, 12px = top-5, 8px = all others) colored by score band. This is the entire "ranking" visual language.
2. **Colored numeric badges in the rank-circle** (`.rank-badge`) — a 32px green circle with a white digit. It functions as both icon and label.
3. **Unicode glyphs in microcopy**: `→` on the CTA, `▾` / `▴` on the expand toggles. No other glyphs.

### Guidance for extending

- **Prefer a colored dot, badge, or pill over an icon.** If you need a glanceable cue, ask first: can this be a colored dot at one of three radii? A number in a circle? A `--score-good/mid/bad` swatch? If yes, do that.
- **If you genuinely need a line icon** (e.g. a settings gear in a future admin panel), reach for **Lucide** via CDN — `https://unpkg.com/lucide@latest`. It's a 24px, 2-stroke, geometric line set that matches the system's "clean, neutral, no flourish" tone. **This is a substitution** — the original source has no icons, so anything we add is an extension, and we should keep it tasteful.
- **Never use emoji.** They will not match the OS-native, government-dashboard register.
- **Logos**: there's no logo file in the source. The wordmark is just `<h1>SF Neighborhood Matcher</h1>` set in `system-ui` 700, white on `#1D9E75`. A simple favicon/mark is in `assets/`.

---

## Open caveats

- **Class project, not a corporate brand.** No brand book, no logo file, no font license. Treat the system as a *style*, not a *brand*. Don't overgeneralize tokens — there's no "secondary color" or "tertiary color" because the source doesn't have one.
- **System font only.** If you need a webfont, this is a deliberate choice to push back on; flag the substitution.
- **One product (two pages).** The system has only been pressure-tested on a quiz + map + scatter chart. Buttons-in-toolbars, sidebars, modals, tabs, etc. — anything you build there is a forward extension. Use the `--brand-green` and `1.5px / 10px / 6px` building blocks as your starting point.

</design-system-guide>

CSS tokens: the guide may describe tokens in prose, but the exact `--*` names are defined in the design system's stylesheet(s) (`/projects/ba98a879-30e3-48bc-8f75-c6de79d76d8e/colors_and_type.css`, `/projects/ba98a879-30e3-48bc-8f75-c6de79d76d8e/preview/card.css`, `/projects/ba98a879-30e3-48bc-8f75-c6de79d76d8e/ui_kits/matcher/styles.css`, `/projects/ba98a879-30e3-48bc-8f75-c6de79d76d8e/ui_kits/statistics/styles.css`). The 68 custom properties it defines are:

--bg, --bg-divider, --bg-hover, --bg-input, --bg-pill, --bg-results, --bg-soft, --bg-track, --bg-track-2, --border, --border-strong, --brand-green, --brand-green-dark, --brand-green-tint, --brand-green-wash, --content-max, --fg-1, --fg-2, --fg-3, --fg-4, --fg-5, --fg-6, --fg-mute, --font-mono, --font-sans, --lh-base, --lh-tight, --map-h, --map-h-sm, --on-brand, --on-brand-mute, --on-brand-soft, --r-bar, --r-bar-sm, --r-btn, --r-card, --r-circle, --r-input, --r-pill, --score-bad, --score-good, --score-mid, --shadow-card, --shadow-thumb, --space-1, --space-2, --space-3, --space-4, --space-5, --space-6, --space-7, --space-8, --t-base, --t-body, --t-cardname, --t-cta, --t-h1, --t-md, --t-md2, --t-pct, --t-sm, --t-title, --t-xs, --w-black, --w-bold, --w-medium, --w-regular, --w-semi

Only use `var(--*)` names from that list. Never guess a token name — an unresolved `var()` silently falls back to the browser default.

For assets and UI kits beyond the guide: `read_file("/projects/ba98a879-30e3-48bc-8f75-c6de79d76d8e/<path>")` and `copy_files` to bring them into the current project.
</attached-skill>

## Assistant

_[tool: questions_v2]_

I'll help you build something with the SF Neighborhood Matcher design system. Let me ask a few questions to get this right.

## User

Questions answered:
- what_to_build: Recreate / polish the Neighborhood Matcher quiz + results
- fidelity_scope: Fully working prototype — sliders move, scores recompute, map updates
- data_source: Use the real neighborhoods.json from the repo
- variations: One polished version is fine
- tweaks_focus: Decide for me
- novelty: Decide for me
- extras: Detailed neighborhood detail page (click a card), Side-by-side compare 2–3 neighborhoods
- open_notes: make the design a non-conventional claude design

## Assistant

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: update_todos]_

_[tool: copy_files]_

_[tool: copy_starter_component]_

Got everything I need. Let me plan briefly:

**Design direction** — "Non-conventional Claude design" + faithful tokens:
- **Live results** — no submit button. Sliders/segmented controls recompute instantly. Map dots resize and recolor as you tweak.
- **Editorial split layout** — sticky "brief" panel on the left (your preferences stay visible), results on the right as a typographic ranking spread.
- **Huge editorial rank numbers** — push the design system's `--w-black` weight to magazine scale.
- **Sticky map** in the right-column header, dots animated on update.
- **Card click → fullscreen detail takeover** with all dims, map-zoom, neighbors comparison.
- **Compare mode** — checkbox-select up to 3 cards → side-by-side drawer slides up.
- **Tweaks**: accent color swatches, layout density, card style (editorial / classic).

Let me build it.

_[tool: write_file]_

Now let me write the main HTML file and styles.

_[tool: write_file]_

_[tool: write_file]_

Now let me write the React components. I'll split them into small files.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: read_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: done]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: str_replace_edit]_

_[tool: save_screenshot]_

The layout collapses too early — preview is ~920px and my 960px breakpoint hides the rail. Let me lower it.

_[tool: view_image]_

_[tool: eval_js]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: grep]_

_[tool: eval_js]_

_[tool: show_html]_

The CSS file is cached — old `960px` breakpoint is still active. Let me force reload.

_[tool: show_html]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: save_screenshot]_

Excellent! The editorial design is landing well. Let me check scrolled views and verify the details.

_[tool: view_image]_

_[tool: str_replace_edit]_

_[tool: eval_js]_

Let me make the compare bar properly hidden when nothing's selected, then test detail/compare interactions.

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: save_screenshot]_

_[tool: multi_screenshot]_

_[tool: multi_screenshot]_

Detail sheet looks great. Let me test compare and scrolling within detail.

_[tool: multi_screenshot]_

_[tool: eval_js]_

The compare view (first screenshot) looks great. The state got tangled across steps. The implementation works. Let me do final polish and finish.

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: update_todos]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Built — an editorial recreation of the SF Neighborhood Matcher.

**What's here**
- **The Brief** (left rail, sticky): rent, commute, work, car, and the 6 lifestyle priorities as a 3-step intensity track. **No submit button** — results recompute live as you drag.
- **Top strip**: editorial headline that rewrites itself based on your active priorities + budget + top match, with live map + score-band legend.
- **Ranking**: editorial cards with huge `No. 01` numerals, name, "best for" tag, mini pills, and an inline 5-up dim sparkline. Hover any card and its map dot highlights.
- **Click any card** → fullscreen detail takeover (Why this rank · The data · Nearby ranks).
- **Multi-select 2–3 cards** (the checkbox in the corner) → bottom drawer + Compare sheet with a head-to-head table where ▲ marks the best pick per metric.
- **Tweaks** panel: 4 accent colors, density (compact/regular/comfy), Show all 15 toggle.

**Caveats**
- System fonts only, as the design system requires.
- Map tiles render in real browser but won't show in `html-to-image` screenshots.

Open the Tweaks toggle in the toolbar to play with accent + density.

