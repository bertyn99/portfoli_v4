---
name: Portfolio Bertyn Boulikou
description: Site portfolio une page — sobre, violet comme accent, Barlow, thème clair/sombre par variables CSS.
colors:
  accent-primary: "#6e57e0"
  accent-primary-alt: "#5a43cb"
  accent-primary-lighter: "#eae7fe"
  text-title-light: "#242329"
  text-body-light: "#6d6a7c"
  text-muted-light: "#a19fad"
  surface-input-light: "#f0eefc"
  surface-body-light: "#fbfbfe"
  surface-container-light: "#ffffff"
  text-title-dark: "#f2f1f3"
  text-body-dark: "#b8b5c4"
  surface-body-dark: "#191627"
  surface-container-dark: "#211d35"
  surface-input-dark: "#25213b"
  skills-strip-dark: "#13121c"
typography:
  display:
    fontFamily: "\"Barlow\", sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "0.05em"
  title:
    fontFamily: "\"Barlow\", sans-serif"
    fontSize: "1.25rem"
    fontWeight: 900
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "\"Barlow\", sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "\"Barlow\", sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  sm: "4px"
  md: "6px"
spacing:
  section-padding-y-mobile: "32px"
  section-padding-y-desktop: "96px"
  section-padding-bottom-mobile: "64px"
  button-padding: "16px"
components:
  button-primary:
    backgroundColor: "{colors.accent-primary}"
    textColor: "{colors.surface-container-light}"
    rounded: "{rounded.md}"
    padding: "16px"
  button-primary-hover:
    backgroundColor: "{colors.accent-primary-alt}"
    textColor: "{colors.surface-container-light}"
    rounded: "{rounded.md}"
    padding: "16px"
  button-white:
    backgroundColor: "{colors.surface-container-light}"
    textColor: "{colors.accent-primary}"
    rounded: "{rounded.md}"
    padding: "16px"
---

# Design System: Portfolio Bertyn Boulikou

## Overview

**Creative North Star: « La vitrine calme »**

Le système visuel repose sur des **surfaces neutres teintées violet** et un **accent saturé contrôlé**: le site se lit comme une vitrine professionnelle, pas comme une campagne marketing. La hiérarchie passe par la **typographie Barlow** (titres francs, sous-titres en majuscules pour les sections) et par le **rythme vertical** des sections (`shell-section`). Le mode sombre (classe `.dark` sur `<html>`) recycle les mêmes rôles sémantiques via des variables CSS dans `assets/css/main.css`.

Le design **refuse explicitement** les clichés énumérés dans `PRODUCT.md`: metrics hero génériques, grilles de cartes identiques, néon gratuit, ambiance crypto ou finance marine/or non assumée.

**Caractéristiques clés:**

- Accent **violet** (HSL autour de `--hue-color: 250`) pour actions et liens; neutres dominants.
- **Peu d’ombre portée système**: profondeur surtout par **couches de fond** et bande Skills optionnellement lumineuse.
- **Animations** centrées sur **opacity** et **transform** (apparition sections, tuiles Skills), pas sur la mise en page.
- **Cohérence des jetons**: `--color-primary-*`, `--color-skills-*` exposés via `@theme` dans `main.css`.

## Colors

Palette **une voix d’accent** + neutres tirés vers la même teinte. Les valeurs ci-dessous sont des **approximations sRGB en hex** pour interop (projet source: **HSL** sur `:root` / `.dark`).

### Primary

- **Violet accent (Primaire)** (`#6e57e0`, source `hsl(250, 69%, 61%)` → `--first-color`): boutons primaires, liens d’action, états de marque.
- **Violet profond (Hover)** (`#5a43cb`, `--first-color-alt`): survol des boutons et des liens `.button`.
- **Lavande surface (Très clair)** (`#eae7fe`, `--first-color-lighter`): fonds d’accent légers si nécessaire.

### Neutral

- **Titres (clair)** (`#242329`, `--title-color`): `h1`–`h4`, titres de section.
- **Texte corps (clair)** (`#6d6a7c`, `--text-color`): paragraphes.
- **Texte atténué (clair)** (`#a19fad`, `--text-color-light`): métadonnées, lignes secondaires.
- **Fond page (clair)** (`#fbfbfe`, `--body-color`): toile de fond générale.
- **Conteneur section (clair)** (`#ffffff`, `--container-color`): surfaces de carte/section là où `bg-primary-container` s’applique.
- **Champ / surface formulaire (clair)** (`#f0eefc`, `--input-color`): zones de saisie.
- **Titres (sombre)** (`#f2f1f3`, `.dark` `--title-color`), **fond page (sombre)** (`#191627`, `--body-color`), **conteneur (sombre)** (`#211d35`, `--container-color`), **input (sombre)** (`#25213b`, `--input-color`): mêmes rôles qu’en clair.

### Skills (signature)

- Bandeau et tuiles utilisent `--skills-strip-bg`, `--skills-tile-light`, `--skills-tile-dark`, `--skills-tile-dark-border`, `--skills-tile-glow` (éclat léger `rgb(124 58 237 / 0.22)` en clair). En sombre, valeurs redéfinies dans `.dark` (bandeau `#13121c` en hex approximatif pour documentation).

### Règles nommées

**La règle d’une voix.** L’accent violet structure les CTA et la hiérarchie; pas d’arc-en-ciel ni d’accents concurrents sans raison stratégique.

**La règle des neutres teintés.** Les gris reprennent la teinte `--hue-color` pour éviter le gris « Excel » sur du blanc pur.

## Typography

**Police d’affichage / titres:** Barlow (`--font-family-barlow`, repli `sans-serif`).

**Police corps:** Barlow pour le corps de page (`body`).

**Poppins:** déclarée dans `@theme` (`--font-family-poppins`) ; usage ponctuel selon composants (ne pas introduire une troisième famille sans besoin).

**Caractère:** sobre, lisible, légèrement technique sans être froid; les sous-titres de section en **majuscules** donnent le rythme sans crier.

### Hierarchy

- **Display (sous-titre de section)** (800–900, `text-2xl`, `leading-tight`, tracking large, **uppercase** via `.section-subtitle`): ligne d’accroche sous le `h2` de section.
- **Title (titre de section)** (900, `text-xl`, centré via `.section-title`): `h2` des blocs « section ».
- **Title (titres génériques)** (`font-semibold`, `text-primary-title` sur `h1`–`h4`): pages et blocs hors patron `.section-*`.
- **Body** (400, `text-base`, `text-primary-text`, Barlow): texte courant; viser **65–75ch** sur les paragraphes importants.
- **Label / UI** (`font-medium` sur `.button`, texte des champs): actions et libellés de formulaire.

### Règles nommées

**La règle de la mesure.** Les blocs de texte long restent dans une colonne lisible; pas de lignes interminables sur grand écran sans contrainte de largeur.

## Elevation

Le système est **plat par défaut**: séparation des régions par **couleur de fond** (`body` vs `container` vs bande Skills), pas par une échelle d’ombres Material. Les **tuiles Skills** peuvent porter un **léger glow** (`--skills-tile-glow`) pour suggestion de profondeur, sans carte « box-shadow lourde » généralisée.

### Shadow Vocabulary

- Pas de liste d’ombres globales obligatoires. Les états interactifs reposent sur **changement de couleur** (`--first-color` → `--first-color-alt`) et **transitions** (`duration-300` sur icônes de bouton).

### Règles nommées

**La règle du plat utile.** N’ajouter des ombres ou du glow que lorsqu’ils clarifient un groupe interactif (ex. grille Skills), pas pour décorer chaque bloc.

## Components

### Sections (`shell-section`)

- **Surface:** `bg-primary-container`, padding vertical `pt-8` / `pb-16` mobile, `md:pt-24` / `md:pb-8` desktop, souvent avec `@container` sur le `<section>` associé.
- **Titres:** combinaison `h2.section-title` + `span.section-subtitle` (ou `p` équivalent pour le sous-titre).

### Buttons (`.button` dans `main.css`)

- **Forme:** coins **légèrement arrondis** (`rounded-md` → **6px** environ en `rem` Tailwind).
- **Primary:** fond `bg-primary` (accent), texte blanc, `p-4`, `font-medium`; hover → `bg-primary-alt`.
- **White:** fond blanc, texte `text-primary`; hover → fond `--first-color-alt`, texte blanc avec transition.
- **Link:** pas de fond, `text-primary`, hover vers teinte alt.
- **Petit:** variante `.button-small` (`py-3 px-4`).
- **Flex:** `.button-flex` aligne icône et libellé (`inline-flex items-center`); `.button-icon` dimensionne l’icône (`h-6 w-6`, transition).

### Skills (bandeau)

- Couleurs dédiées `--skills-*` et animation `skillsCellReveal` (**cubic-bezier** type ease-out, **0,52s**) pour l’entrée des cellules.

### Icons

- `@nuxt/icon` (Iconify: mdi, vscode-icons, uil). Préférer les icônes déjà utilisées dans le projet pour la cohérence.

## Do's and Don'ts

### Do:

- **Do** utiliser les variables `--first-color`, `--title-color`, `--body-color` et les classes `primary.*` / `skills.*` déjà mappées dans `@theme`.
- **Do** conserver **Barlow** pour le corps et les titres de section, sauf exception localisée et documentée.
- **Do** respecter **le focus clavier** et les contrastes sur les boutons du header, du thème et du formulaire de contact.
- **Do** limiter les animations à **opacity/transform** et prévoir **prefers-reduced-motion** pour toute nouvelle animation décorative.

### Don't:

- **Don't** reproduire les **templates portfolio génériques « startup »** (metrics hero, grille de cartes identiques, accents néon sans intention) — cf. `PRODUCT.md` **Anti-references**.
- **Don't** basculer vers une ambiance **crypto néon** ou **finance marine/or** si ce n’est pas une décision de marque assumée — cf. `PRODUCT.md`.
- **Don't** ajouter **effets gadgets** (glassmorphism, dégradés texte décoratifs, bandes latérales colorées épaisses sur les cartes) sans besoin utilisateur clair — aligné avec les principes « confiance par la sobriété » et « pas d’effets gadgets par défaut » dans `PRODUCT.md`.
- **Don't** **animer width/height/margin** pour des transitions décoratives; privilégier transform/opacity.
- **Don't** introduire de **nouvelles couleurs en dur** (`#hex`, `rgb()` isolés) là où un token existe déjà — les composants hérités peuvent encore en contenir; ne pas en ajouter.
