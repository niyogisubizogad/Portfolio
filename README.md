# Gad NiYoGiSuBiZo — Software Developer Portfolio

A modern, single-page professional portfolio for **Gad NiYoGiSuBiZo** — a software developer based in Kigali, Rwanda, focused on building AI-powered web applications, backend APIs, and workflow automation.

The portfolio presents projects, technical skills, experience, education, certifications, and contact details through an app-like interface — no traditional routed pages. A full-screen welcome screen, personal portrait, rotating introduction, and an icon sidebar with slide-over panels replace conventional navigation.

> **Focus:** AI-powered web applications, backend APIs, accessible user interfaces, and workflow automation.

---

## Preview

![Portfolio Preview](./src/assets/portfolio-preview.png)

---

## Live Demo

- **Portfolio:** [Add deployed URL](https://truepath.netlify.app)
- **GitHub:** [Gad NiY0GiSUBiZ0](https://github.com/niyogado)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Vue.js](https://vuejs.org/) 3.5 (Composition API + `<script setup>`) |
| Build tool | [Vite](https://vitejs.dev/) 6 |
| Icons | [Lucide](https://lucide.dev/) (via `lucide-vue-next`) |
| Routing | **None** — all navigation is state-driven overlay panels |
| Styling | Scoped CSS with semantic design tokens, `color-mix()` for translucent surfaces |
| Fonts | [Satoshi](https://fontshare.com/fonts/satoshi) (UI/body), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (labels, tags, code) |
| Contact form | [Web3Forms](https://web3forms.com/) API |
| Deployment | Static `dist/` directory (Vercel, Netlify, etc.) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
# → http://localhost:5173

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

### Environment Variables

The contact form requires a Web3Forms access key. Copy the example file:

```bash
cp .env.example .env
```

Then add your real key to `.env`:

```
VITE_WEB3FORMS_ACCESS_KEY=your_actual_key_here
```

> **Never commit `.env` to version control.** The `.env` file is listed in `.gitignore`.

---

## Project Structure

```
portfolio/
├── index.html                 # Root HTML with pre-paint theme script
├── vite.config.js             # Vite config with @ alias
├── .env.example               # Environment variable template
├── package.json
│
├── src/
│   ├── main.js                # App entry — imports global styles + tokens
│   ├── App.vue                # Root: theme, welcome, panels, navigation state
│   │
│   ├── data/                  # Content data files
│   │   ├── profile.js         # Name, bio, contact links, nav structure
│   │   ├── skills.js          # Technical skill categories + proficiency %
│   │   ├── experience.js      # Work/remote learning + bootcamp timeline
│   │   ├── education.js       # Education timeline (honest, no placeholders)
│   │   ├── projects.js        # Project cards (AVIS → DevGram → Bootcamp)
│   │   ├── certifications.js  # Certificate completion records
│   │   └── quote.js           # Inspirational quote with verified source
│   │
│   ├── styles/                # Design system
│   │   ├── tokens.css         # CSS custom properties (colors, spacing, fonts)
│   │   ├── globals.css        # Base resets, semantic classes, focus states
│   │   ├── animations.css     # Keyframe animations, transition helpers
│   │   └── utilities.css      # Utility classes (visually-hidden, etc.)
│   │
│   ├── components/            # Reusable components
│   │   ├── WelcomeScreen.vue  # Full-screen welcome: portrait + rotating intro
│   │   ├── TypingHeadline.vue # Rotating typewriter headline (one-time cycle)
│   │   ├── CodePanel.vue      # Decorative editor + terminal on PortfolioHome
│   │   ├── PortfolioHome.vue  # Default home content with code panel (right)
│   │   ├── AppSidebar.vue     # Left sidebar / bottom nav + theme toggle
│   │   ├── SectionPanel.vue   # Slide-over overlay wrapper (Escape/Close)
│   │   ├── QuoteCard.vue      # Inspirational quote (IntersectionObserver)
│   │   ├── PanelFooter.vue    # Technology attribution footer for panels
│   │   ├── SkillsGrid.vue     # Categorized skill cards + progress bars
│   │   ├── SkillCategoryCard.vue
│   │   ├── ProjectCard.vue
│   │   └── panels/
│   │       ├── AboutPanel.vue
│   │       ├── ExperiencePanel.vue
│   │       ├── EducationPanel.vue
│   │       ├── ProjectsPanel.vue
│   │       ├── CertificationsPanel.vue
│   │       └── ContactPanel.vue
│   │
│   └── assets/
│       ├── images/
│       │   └── gad-portrait.png  # Professional portrait (welcome screen)
│       └── images/portfolio-preview.png
│
├── public/
│   └── Gad-NiYoGiSuBiZo-Resume.pdf   # Downloadable résumé
│
├── .env                       # Local environment (gitignored)
└── .gitignore
```

---

## Features

### Welcome screen

- Full-screen introduction with a professional portrait on the left.
- **Rotating introduction** — a typewriter animation cycles through:
  - "Hi, I am Gad NiY0GiSUBiZ0."
  - "I am a Software Developer."
  - "I build web applications."
  - "I build frontend interfaces."
  - "I build backend APIs and integrations."
  - "I build AI-powered workflows."
- Cycles gently (types → pauses → deletes → next line), then repeats.
- A single non-animated sentence is exposed to screen readers.
- **Reduced motion**: animation skipped entirely; final introduction renders statically.
- Two primary calls to action:
  - **Explore my work** — enters the portfolio shell.
  - **Get in touch** — enters the portfolio shell and opens the Contact panel.
- Location and availability status shown beneath the headline.
- A decorative code panel appears only on the Portfolio Home screen on desktop (≥900px), not on the welcome screen.

### Single-page application experience

- No Vue Router. Navigation is driven by reactive state in `App.vue`:
  - `entered` — controls whether the welcome screen or the portfolio shell is shown.
  - `activePanel` — holds the ID of the open overlay panel (`null` when closed).
- Sidebar + theme toggle persist across all panels.
- Opening a panel slides in a full-height overlay (`SectionPanel`) with a dimming backdrop.
- Closing via close button, `Escape` key, backdrop click, or sidebar "Home" icon.

### Icon sidebar navigation

Desktop uses a compact left sidebar (~64px, icons only):

- **Home** — returns to the portfolio home stage.
- **About** — bio, focus areas, technical skills with progress bars.
- **Experience** — timeline of remote AI engineering learning and Kigali bootcamp.
- **Education** — educational background timeline.
- **Projects** — featured project cards (AVIS → DevGram → bootcamp).
- **Certifications** — completion certificates.
- **Contact** — email, GitHub, LinkedIn, WhatsApp, résumé download.
- **Theme toggle** — Sun/Moon icon with hover tooltip ("Switch to light mode" / "Switch to dark mode").

Sidebar labels appear on hover and keyboard focus via tooltips. On mobile, the sidebar becomes a fixed bottom navigation bar.

### Code panel (Portfolio Home only)

- A decorative code editor + terminal simulation appears on the right side of the home screen on desktop (≥900px).
- Types a short, authentic JavaScript snippet character by character, then streams terminal output line by line.
- Shows a final "Process completed successfully" success state with a green indicator.
- The animation runs once and stays on the completed state.
- `aria-hidden="true"` — decorative only, never focused or announced.
- **Reduced motion**: renders the complete code and terminal output immediately with no animation.
- Hidden entirely on mobile/tablet (below 900px).

### Dark and light themes

- **Dark mode**: deep navy / blue graphite surfaces (`#09111F`, `#0F1B2D`), never pure black.
- **Light mode**: cool blue-tinted off-white surfaces (`#FCFDFF`), never pure white.
- Ice-blue borders and outlines provide structure.
- Single professional blue accent for links, icons, and interactions.
- Theme preference stored in `localStorage`, with a pre-paint script in `index.html` to prevent flash-of-wrong-theme.

### About & technical skills

The About panel contains:

- Professional biography.
- Core professional focus areas.
- Technical skill categories with individual stack names.
- Self-assessed proficiency percentages with one-time animated progress bars.
- Progress bars use `role="progressbar"` with accessible labels.

Skill levels describe practical confidence based on project work and learning — not formal certifications or objective test scores.

### Experience

The Experience panel features a timeline:

- Remote AI Engineering and workflow automation learning via Zoom.
- n8n workflow automation experience.
- Kigali Lightning Developer Bootcamp (Bitcoin and Lightning Network).
- Résumé download button.
- Link to Certifications.

### Education

The Education panel shows a vertical timeline of academic background:

- **Collegio Santo Antonio Maria Zaccaria** — Advanced Level (A2) in Software Development (currently studying).
- **GS Karama** — Ordinary Level (O-Level), completed.
- **GS Karama** — Primary Education, completed.
- Each entry has a status badge ("CURRENTLY STUDYING" / "COMPLETED") and an icon.
- An honest empty state: "Education details are being updated."

### Projects

Projects are listed with AVIS featured first, DevGram second, then the Lightning bootcamp project:

- **AVIS** — featured project (CV analysis / job matching AI tool).
- **DevGram** — a developer-focused social feed application.
- **Lightning Bootcamp Project** — Bitcoin and Lightning Network learning project.

Each project card includes: problem, role, stack, and links. No fabricated screenshots or metrics.

### Certifications

The Certifications panel lists completion certificates:

- AI Engineering completion certificate.
- Workflow Automation with n8n completion certificate.

### Contact

The Contact panel includes:

- Email: `offgad200@gmail.com`
- GitHub: `https://github.com/niyogado`
- LinkedIn: shown only when a real URL is provided (hidden otherwise)
- WhatsApp: `https://wa.me/250785662308`
- Résumé download button.

A working contact form submits to Web3Forms via `fetch` POST with honeypot spam protection, loading states, and inline validation errors.

### Panel footer

Every overlay panel (About, Education, Experience, Projects, Certifications, Contact) includes a subtle technology attribution footer:

```
Built with Vue.js · JavaScript · CSS · Vite · Lucide Icons
Made with care by Gad NiYoGiSuBiZo
© {current year} Gad NiYoGiSuBiZo
```

---

## Design System

All colors use CSS custom properties defined in `src/styles/tokens.css`. No hardcoded hex values exist in component files.

### Color tokens

| Token | Dark mode | Light mode |
|---|---|---|
| `--bg` | `#09111F` (deep navy) | `#FCFDFF` (blue-white) |
| `--surface` | `#0F1B2D` (blue graphite) | `#FFFFFF` (blue-tinted off-white) |
| `--surface-muted` | `#132034` | `#F3F7FC` |
| `--border` | ice-blue translucent | ice-blue translucent |
| `--border-soft` | ice-blue soft | ice-blue soft |
| `--text` | `#E2EAF3` | `#1A2A3A` |
| `--text-muted` | `#9BB3CD` | `#647A93` |
| `--accent` | `#5B9DF6` | `#3A82E6` |
| `--accent-hover` | `#7DB0FF` | `#5A9EFF` |
| `--accent-soft` | color-mix of accent | color-mix of accent |
| `--accent-border` | color-mix of accent | color-mix of accent |
| `--success` | `#4ADE80` | `#22C58E` |
| `--backdrop` | dark scrim | light scrim |

### Typography

| Token | Font | Use |
|---|---|---|
| `--font-sans` | Satoshi (wght 400, 500, 700, 900) | UI, body text, headings |
| `--font-mono` | JetBrains Mono (wght 400, 500, 700) | Labels, tags, percentages, code |

### Spacing & sizing

```
--radius-sm:   4px
--radius-md:   8px
--radius-lg:   12px
--radius-pill: 999px

--sidebar-width: 64px
--bottom-nav-height: 64px
--speed-fast: 180ms
--speed-normal: 300ms
```

### Semantic CSS classes

- `.eyebrow` — small uppercase label at the top of sections.
- `.btn` / `.btn--primary` / `.btn--ghost` — shared button styles with visible focus rings.
- `.tag` — small rounded badge for focus areas and labels.
- `.visually-hidden` — screen-reader-only text.
- `.skip-link` — "Skip to main content" link visible on keyboard focus.

---

## Accessibility

- **Semantic HTML**: `<main>`, `<nav>`, `<section>`, `<figure>`, `<ul>`/`<li>` used appropriately.
- **Skip link**: visible on keyboard focus to skip to `#main-content`.
- **Focus management**: Tab/Shift+Tab navigation, Escape to close panels, focus returns to trigger on close.
- **ARIA**: panels use `role="dialog"` + `aria-modal="true"`, progress bars use `role="progressbar"` with `aria-valuenow`, form errors use `aria-describedby`.
- **Keyboard**: all interactive elements are button elements or have proper role/keyboard handling.
- **Reduced motion**: `prefers-reduced-motion: reduce` disables all non-essential animations (typing, code streaming, progress bars, panel transitions, quote reveal, caret blink).
- **Contrast**: all color combinations checked for WCAG AA compliance in both themes.

---

## Contact Form (Web3Forms)

The contact form submits via `fetch` POST to `https://api.web3forms.com/submit`:

- Access key from `import.meta.env.VITE_WEB3FORMS_ACCESS_KEY` (env variable, never hardcoded).
- `from_name: "Gad Portfolio Contact Form"`.
- `subject` defaults to `"New portfolio message from {name}"` if the subject field is empty.
- Hidden `botcheck` honeypot field for spam protection (no visible CAPTCHA).
- Submit button disabled with "Sending message..." while in flight.
- Success confirmed only when the API returns `{ success: true }`.
- Error message with fallback contact instructions on failure.
- Inline validation: Full name (required, min 2 chars), Email (required, valid format), Subject (optional), Message (required, min 10 chars).
- Validation errors connected to inputs via `aria-describedby`.

---

## Build & Development

```bash
npm run dev       # Development server at http://localhost:5173
npm run build    # Production build to /dist
npm run preview  # Preview production build locally
```

- The build output goes to `dist/`.
- CSS is scoped with PostCSS; no global style leaks between components.
- All animations respect `prefers-reduced-motion: reduce`.

---

## Deployment

The application can be deployed to:

- **Vercel**: Connect your Git repository — Vite is auto-detected.
- **Netlify**: Build command `npm run build`; publish directory `dist/`.
- **GitHub Pages**: Use `npm run build` and push the `dist/` directory.
- **Cloudflare Pages**: Build command `npm run build`; publish directory `dist/`.

Before deployment:

```bash
npm run build
npm run preview
```

---

## Author

**Gad NiY0GiSUBiZ0**

Software Developer  |  Kigali, Rwanda

- GitHub: [Gad-off](https://github.com/niyogado)
- Email: [offgad200@gmail.com](mailto:offgad200@gmail.com)
- WhatsApp: [Chat on WhatsApp](https://wa.me/250785662308)
- Instagram: [@true_p.ath](https://instagram.com/true_p.ath/)

---

## License

This is personal portfolio software. All rights reserved unless a different license is added to this repository.