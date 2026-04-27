# AGENTS.md

## Project

Personal portfolio site for Bertyn Boulikou — a single-page Nuxt 3 site (SSG/static generation). French-language content throughout. Deploys as a static site (`target: "static"`).

## Design context

Defaults for strategic and visual work live at the repo root (Impeccable-style context):

- **`PRODUCT.md`** — register (`brand` vs `product`), users, purpose, personality, anti-references, principles.
- **`DESIGN.md`** — Stitch-format design spec (YAML frontmatter + sections Overview / Colors / Typography / Elevation / Components / Do's and Don'ts); aligned with `assets/css/main.css`.
- **`DESIGN.json`** — sidecar (motion, breakpoints, métadonnées couleur, snippets de composants pour tooling / panneaux).

Read these before sizable UI or UX changes so variants stay on-brand.

## Stack

- **Nuxt 3** (~3.15) with `@nuxt/content` v2 (not v3), `@nuxtjs/tailwindcss`, `@nuxt/image`, `@nuxt/icon`, `@vueuse/nuxt`
- **Tailwind CSS** with `postcss-nested` and `tailwindcss-animate` — custom breakpoints (`sm:375 md:568 lg:768 xl:1024`)
- **Font**: Barlow via `@nuxtjs/google-fonts`, Poppins via self-hosted `@font-face` in CSS
- **Icons**: `@iconify-json/mdi`, `@iconify-json/vscode-icons`, plus the `uil` collection (configured in `nuxt.config.js`)
- **Contact form**: EmailJS (`@emailjs/browser`) — requires env vars (see below)
- **No `app.vue`** — uses `layouts/default.vue` + `pages/index.vue` as the single page

## Commands

```bash
nuxi dev          # dev server
nuxi build        # production build
nuxt generate     # static site generation (SSG)
nuxi preview      # preview production build
npm run lint      # eslint on .js/.vue
```

No test runner configured. No CI workflows.

## Environment Variables

Required in `.env`:

```
NUXT_PUBLIC_EMAILJS_SERVICE_ID=
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID_MYSELF=
NUXT_PUBLIC_EMAILJS_TEMPLATE_ID_VISITOR=
NUXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

These are exposed via `runtimeConfig.public` in `nuxt.config.js`.

## Architecture

Single-page app — all sections are components on `pages/index.vue`:

```
pages/index.vue          → Home → About → Skills → Graduate → Services → Portfolio → ProjectInMind → Contactme
layouts/default.vue      → Header + <slot/> + Footer + ScrollTop
components/              → flat .vue files + Carousel/ subfolder
content/project/         → Nuxt Content markdown files (project case studies)
services/                → ArticleService.js (empty — unused)
public/img/              → project screenshots
public/article/          → article assets
```

## Key Conventions

- **Mixed Vue API styles**: Roughly half Options API (`Header.vue`, `Home.vue`, `Graduate.vue`, `Footer.vue`, `ScrollTop.vue`, `TheButton.vue`, `ServicesModal.vue`, `ProjectInMind.vue`), half `<script setup>` Composition API (`Contactme.vue`, `Portfolio.vue`, `Skills.vue`, `Services.vue`, `About.vue`, `Carousel/carousel.vue`, `Carousel/carouselSlide.vue`). Match the existing style of the file being edited.
- **Styling**: All component styles use `<style lang="postcss">` with Tailwind `@apply` directives and PostCSS nesting (`&-suffix` BEM-like pattern). **Both `@screen` and raw `@media` breakpoints are used** — `@screen` in Home, Header, Contactme; raw `@media` in Graduate, ProjectInMind. Match whichever the file already uses.
- **Style scoping**: Most components use **unscoped** `<style>` blocks. Only 5 components use `<style scoped>` (index.vue, Header.vue, Portfolio.vue, Carousel/carousel.vue, StylizedImg.vue). Match existing.
- **Dark mode**: CSS variable–based via `.dark` class toggle on `<html>`. Variables defined in `assets/css/main.css` `:root` and `.dark` blocks. Theme toggled client-side via `localStorage` in `Header.vue`.
- **Color system**: Colors reference CSS custom properties (`--first-color`, `--title-color`, etc.) mapped to Tailwind's `primary.*` in `tailwind.config.js`. Some older components hardcode `rgb()`/`#hex` values (Contactme, Footer, ProjectInMind) — avoid introducing new hardcoded colors.
- **Icons**: Inline SVGs are common in older components (Header, Home, Graduate, ProjectInMind). Newer components use `<Icon name="...">` from `@nuxt/icon` with Iconify collection names (e.g., `vscode-icons:file-type-vue`).
- **Component imports**: Most components rely on Nuxt auto-import. A few explicitly import: `About.vue` and `Home.vue` import `TheButton`; `Portfolio.vue` imports `Carousel`/`CarouselSlide`.
- **No TypeScript strictness**: `tsconfig.json` just extends `.nuxt/tsconfig.json`. Only `Border.vue` uses `<script setup lang="ts">`. The project has no type-checking step.

## Package Manager

Both `package-lock.json` and `pnpm-lock.yaml` exist. The `.npmrc` has `shamefully-hoist=true`, indicating pnpm is used but needs hoisting for Nuxt compatibility. **Use pnpm**.

## Gotchas

- The `store/` directory contains only a boilerplate Vuex README — no actual store is used. Do not add Vuex/Pinia files there.
- `services/ArticleService.js` is empty and unused.
- `@nuxt/content` v2 is installed and markdown files exist in `content/project/`, but **no component queries or renders this content**. The Portfolio section uses hardcoded data in `Portfolio.vue` instead.
- No ESLint config file exists (no `.eslintrc*`). The `lint` script in `package.json` runs `eslint --ext ".js,.vue"` but relies on defaults only.
- The `postcss` config in `nuxt.config.js` explicitly lists plugins in a specific order — changes to Tailwind or PostCSS may need updates in both `tailwind.config.js` and `nuxt.config.js`.
- `devtools: { enabled: false }` — Nuxt DevTools are disabled.
- No `composables/` or `plugins/` directories exist.
- Reusable CSS classes `.section`, `.button` (with variants) are defined in `assets/css/main.css` — use them for consistency.
