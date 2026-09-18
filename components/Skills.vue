<script setup>
const SKILLS_PANEL_ID = 'skills-panel'
const CATEGORY_LABELS = ['Front-End', 'Back-End', 'Design']

const prefersReducedMotion = usePreferredReducedMotion()

const cellMotionClass = computed(() =>
  prefersReducedMotion.value === 'reduce' ? '' : 'motion-safe:animate-skills-cell-reveal',
)

function cellStaggerStyle(i) {
  if (prefersReducedMotion.value === 'reduce')
    return {}
  return { animationDelay: `${Math.min(i, 23) * 30}ms` }
}

/** Explicit 6×4 board: empty squares + skill pieces. */
const gridLayout = [
  [
    { variant: 'accent', skill: { name: 'SEO', icon: 'mdi:search-web' }, categoryIndex: 0 },
    { variant: 'dark', skill: { name: 'HTML/CSS', icon: 'vscode-icons:file-type-html' }, categoryIndex: 0 },
    { variant: 'accent', skill: { name: 'Vue', icon: 'vscode-icons:file-type-vue' }, categoryIndex: 0 },
    { variant: 'light' },
    { variant: 'accent', skill: { name: 'Nuxt', icon: 'vscode-icons:file-type-nuxt' }, categoryIndex: 0 },
    { variant: 'dark', skill: { name: 'React', icon: 'vscode-icons:file-type-reactjs' }, categoryIndex: 0 },
  ],
  [
    { variant: 'dark', skill: { name: 'Next', icon: 'vscode-icons:file-type-next' }, categoryIndex: 0 },
    { variant: 'accent', skill: { name: 'TailwindCSS', icon: 'vscode-icons:file-type-tailwind' }, categoryIndex: 0 },
    { variant: 'dark', skill: { name: 'Vitest', icon: 'vscode-icons:file-type-vitest' }, categoryIndex: 1 },
    { variant: 'accent', skill: { name: 'NodeJs', icon: 'vscode-icons:file-type-node' }, categoryIndex: 1 },
    { variant: 'dark', skill: { name: 'NestJs', icon: 'vscode-icons:file-type-nestjs' }, categoryIndex: 1 },
    { variant: 'accent', skill: { name: 'Vite', icon: 'vscode-icons:file-type-vite' }, categoryIndex: 0 },
  ],
  [
    { variant: 'accent', skill: { name: 'Laravel', icon: 'logos:laravel' }, categoryIndex: 1 },
    { variant: 'light' },
    { variant: 'accent', skill: { name: 'PHP', icon: 'vscode-icons:file-type-php' }, categoryIndex: 1 },
    { variant: 'dark', skill: { name: 'AdonisJs', icon: 'logos:adonisjs-icon' }, categoryIndex: 1 },
    { variant: 'accent', skill: { name: 'Performance', icon: 'mdi:speedometer' }, categoryIndex: 0 },
    { variant: 'dark', skill: { name: 'Figma', icon: 'logos:figma' }, categoryIndex: 2 },
  ],
  [
    { variant: 'light' },
    { variant: 'accent', skill: { name: 'UX', icon: 'majesticons:ux-circle-line' }, categoryIndex: 2 },
    { variant: 'dark', skill: { name: 'Webpack', icon: 'vscode-icons:file-type-webpack' }, categoryIndex: 0 },
    { variant: 'dark', skill: { name: 'Nitro JS', icon: 'i-unjs-nitro' }, categoryIndex: 1 },
    { variant: 'light' },
    { variant: 'accent', skill: { name: 'Playwright', icon: 'vscode-icons:file-type-playwright' }, categoryIndex: 0 },
  ],
]

const flatCells = computed(() => gridLayout.flat())
const COLS = 6

const categoryCounts = computed(() => {
  const counts = [0, 0, 0]
  for (const cell of gridLayout.flat()) {
    if (cell.skill)
      counts[cell.categoryIndex] += 1
  }
  return counts
})

const skillTabItems = computed(() => [
  {
    label: 'Toutes',
    value: 'all',
    icon: 'i-mdi-dots-grid',
    badge: categoryCounts.value.reduce((a, b) => a + b, 0),
  },
  {
    label: 'Front-End',
    value: '0',
    icon: 'i-mdi-monitor',
    badge: categoryCounts.value[0],
  },
  {
    label: 'Back-End',
    value: '1',
    icon: 'i-mdi-server-outline',
    badge: categoryCounts.value[1],
  },
  {
    label: 'Design',
    value: '2',
    icon: 'i-mdi-palette-outline',
    badge: categoryCounts.value[2],
  },
])

const skillTabItemsMobile = [
  { label: 'Toutes', value: 'all' },
  { label: 'Front', value: '0' },
  { label: 'Back', value: '1' },
  { label: 'Design', value: '2' },
]

const activeTab = ref('all')
const featuredIndex = ref(null)

const filterIndex = computed(() =>
  activeTab.value === 'all' ? null : Number(activeTab.value),
)

watch(activeTab, () => {
  featuredIndex.value = null
})

const filterStatus = computed(() => {
  if (featuredIndex.value !== null) {
    const cell = flatCells.value[featuredIndex.value]
    return cell?.skill
      ? `${cell.skill.name} mise en évidence sur le podium.`
      : 'Pièce mise en évidence sur le podium.'
  }
  if (filterIndex.value === null)
    return 'Plateau au repos, toutes les compétences au même niveau.'
  return `Famille ${CATEGORY_LABELS[filterIndex.value]} hissée sur le podium.`
})

function selectFamily(value) {
  activeTab.value = value
}

function featurePiece(i) {
  featuredIndex.value = featuredIndex.value === i ? null : i
}

/** Checkerboard: lozenge blobs on one colour, rectangle blobs on the other. */
function blobClass(_cell, i) {
  const col = i % COLS
  const row = Math.floor(i / COLS)
  const lozenge = (row + col) % 2 === 0
  const alt = Math.floor(i / 2) % 2 === 0
  if (lozenge)
    return alt ? 'skills-blob-lozenge-a' : 'skills-blob-lozenge-b'
  return alt ? 'skills-blob-rect-a' : 'skills-blob-rect-b'
}

function faceClasses(cell, i) {
  const out = [blobClass(cell, i)]

  if (cell.variant === 'accent') {
    out.push('bg-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]')
  }
  else if (cell.variant === 'light') {
    out.push('bg-skills-tile-light skills-empty')
  }
  else if (cell.variant === 'dark') {
    out.push('bg-skills-tile-dark skills-filled-dark')
  }

  return out
}

function cellStateClass(cell, i) {
  if (cell.skill && featuredIndex.value === i)
    return 'is-featured'
  if (
    filterIndex.value !== null
    && cell.skill
    && cell.categoryIndex === filterIndex.value
  ) {
    return 'is-up'
  }
  if (filterIndex.value !== null || featuredIndex.value !== null)
    return 'is-back'
  return ''
}

function iconToneClass(cell) {
  if (cell.variant === 'accent')
    return 'text-white drop-shadow-sm [&_svg]:drop-shadow-sm'
  if (cell.variant === 'light')
    return 'text-primary-title/90'
  return ''
}
</script>

<template>
  <section id="skills" class="skills relative overflow-x-clip bg-skills-bg py-16 text-primary-text md:py-28 md:pb-32 dark:text-skills-muted">
    <div class="container relative">
      <header class="skills-heading">
        <h2 id="skills-heading" class="skills-display">
          <span class="skills-display-kicker">Mes</span>
          <span>compétences</span>
        </h2>
        <p class="skills-lede">
          Une famille monte sur le podium. Cliquez une pièce pour la mettre en évidence.
        </p>
      </header>

      <p class="sr-only" aria-live="polite">{{ filterStatus }}</p>

      <div class="skills-stage">
        <aside class="skills-rail">
          <UTabs
            v-model="activeTab"
            class="w-full lg:hidden"
            :items="skillTabItemsMobile"
            :content="false"
            variant="link"
            color="primary"
            size="md"
            :ui="{ list: 'justify-start border-0' }"
            aria-label="Catégories de compétences"
          />

          <nav
            class="skills-rail-desktop hidden lg:flex"
            aria-label="Catégories de compétences"
          >
            <span class="skills-rail-spine" aria-hidden="true" />
            <UTooltip
              v-for="item in skillTabItems"
              :key="item.value"
              :text="`${item.label} · ${item.badge}`"
              :delay-duration="120"
              :content="{ side: 'right', align: 'center', sideOffset: 12 }"
            >
              <span class="skills-rail-hit">
                <UButton
                  :icon="item.icon"
                  color="primary"
                  size="lg"
                  :variant="activeTab === item.value ? 'solid' : 'subtle'"
                  :active="activeTab === item.value"
                  class="skills-rail-btn size-11"
                  :aria-label="`${item.label}, ${item.badge} compétences`"
                  :aria-pressed="activeTab === item.value"
                  @click="selectFamily(item.value)"
                />
                <UBadge
                  :label="String(item.badge)"
                  color="primary"
                  :variant="activeTab === item.value ? 'solid' : 'subtle'"
                  size="xs"
                  class="skills-rail-count"
                />
              </span>
            </UTooltip>
          </nav>
        </aside>

        <div class="skills-board relative">
          <div
            :id="SKILLS_PANEL_ID"
            class="relative grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-5 lg:grid-cols-6 lg:gap-4 xl:gap-5"
            role="grid"
            aria-labelledby="skills-heading"
            :aria-rowcount="gridLayout.length"
            :aria-colcount="6"
          >
          <div
            v-for="(cell, i) in flatCells"
            :key="i"
            role="gridcell"
            class="skills-bento-cell relative aspect-square min-h-0 min-w-0"
            :class="[cellMotionClass, cellStateClass(cell, i)]"
            :style="cellStaggerStyle(i)"
          >
            <span class="skills-podium" aria-hidden="true" />

            <button
              v-if="cell.skill"
              type="button"
              class="skills-lift skills-bento-piece group relative flex h-full w-full items-center justify-center"
              :aria-pressed="featuredIndex === i"
              :aria-label="`${cell.skill.name}, ${CATEGORY_LABELS[cell.categoryIndex]}`"
              @click="featurePiece(i)"
            >
              <span
                class="skills-bento-face flex items-center justify-center"
                :class="faceClasses(cell, i)"
              >
                <span class="skills-icon-slot flex items-center justify-center">
                  <Icon
                    :name="cell.skill.icon"
                    class="skills-icon-host flex h-full! w-full! items-center justify-center"
                    :class="iconToneClass(cell)"
                    :aria-hidden="true"
                  />
                </span>
              </span>
              <span class="skills-tooltip pointer-events-none absolute -top-1 left-1/2 z-10 -translate-x-1/2 -translate-y-full rounded-md px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                {{ cell.skill.name }}
              </span>
            </button>

            <div
              v-else
              class="skills-lift flex h-full w-full items-center justify-center"
              aria-hidden="true"
            >
              <span
                class="skills-bento-face block"
                :class="faceClasses(cell, i)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </section>
</template>

<style lang="postcss">
.skills-heading {
  margin-bottom: 1.25rem;
}

.skills-display {
  margin: 0;
  font-family: var(--font-family-display);
  font-size: clamp(3.1rem, 1.3rem + 8vw, 6.4rem);
  font-weight: 800;
  line-height: 0.84;
  letter-spacing: -0.07em;
  color: var(--title-color);
  text-wrap: balance;
}

.skills-display span {
  display: block;
}

.skills-display-kicker {
  color: var(--first-color);
}

.skills-lede {
  margin: 0.9rem 0 0;
  max-width: 36ch;
  font-size: 1.05rem;
  font-weight: 500;
  line-height: 1.55;
  color: var(--text-color);
  text-wrap: pretty;
}

.skills-stage {
  display: grid;
  gap: 1.25rem;
}

.skills-rail {
  min-width: 0;
}

.skills-rail-desktop {
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
  width: 3.25rem;
  min-height: 100%;
  padding-block: 0.85rem;
}

.skills-rail-spine {
  position: absolute;
  top: 0.4rem;
  bottom: 0.4rem;
  left: 50%;
  z-index: 0;
  width: 1px;
  border-radius: 999px;
  background: color-mix(in oklab, var(--first-color) 32%, transparent);
  transform: translateX(-50%);
}

.skills-rail-hit {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
}

.skills-rail-btn {
  border-radius: 0.9rem;
}

.skills-rail-count {
  position: absolute;
  top: -0.3rem;
  right: -0.35rem;
  z-index: 2;
  min-width: 1.15rem;
  justify-content: center;
  padding-inline: 0.28rem;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
}

.skills-board {
  isolation: isolate;
  overflow: visible;
  width: 100%;
}

@media (min-width: 768px) {
  .skills-heading {
    margin-bottom: 1.75rem;
  }

  .skills-stage {
    grid-template-columns: 3.5rem minmax(0, 1fr);
    align-items: stretch;
    column-gap: 1.75rem;
    row-gap: 0;
  }

  .skills-board {
    max-width: 56rem;
    justify-self: start;
  }
}

.skills-empty {
  box-shadow: inset 0 0 0 1px hsla(250, 28%, 62%, 0.22);
}

.dark .skills-empty {
  box-shadow: inset 0 0 0 1px hsla(250, 20%, 70%, 0.18);
}

.skills-filled-dark {
  box-shadow: inset 0 0 0 1px hsla(250, 16%, 32%, 0.35);
}

.dark .skills-filled-dark {
  box-shadow: inset 0 0 0 1px hsla(250, 14%, 38%, 0.55);
}

.skills-bento-cell {
  z-index: 1;
  overflow: visible;
  animation-fill-mode: backwards;
}

.skills-podium {
  position: absolute;
  left: 16%;
  right: 16%;
  bottom: 2%;
  height: 28%;
  z-index: 0;
  pointer-events: none;
  border-radius: 50%;
  background: radial-gradient(
    ellipse at center,
    color-mix(in oklab, var(--first-color) 55%, transparent) 0%,
    transparent 72%
  );
  opacity: 0;
  transform: scale(0.55);
  transition:
    opacity 0.4s ease,
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.dark .skills-podium {
  background: radial-gradient(
    ellipse at center,
    color-mix(in oklab, var(--first-color) 70%, transparent) 0%,
    transparent 74%
  );
}

.skills-lift {
  position: relative;
  z-index: 1;
  transition:
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.45s ease,
    opacity 0.35s ease;
}

.skills-bento-face {
  flex: none;
}

.skills-blob-rect-a,
.skills-blob-rect-b {
  width: 100%;
  height: 100%;
}

.skills-blob-rect-a {
  border-radius: 28% 22% 30% 24%;
}

.skills-blob-rect-b {
  border-radius: 22% 30% 20% 28%;
}

.skills-blob-lozenge-a,
.skills-blob-lozenge-b {
  width: 72%;
  height: 72%;
  transform: rotate(45deg);
}

.skills-blob-lozenge-a {
  border-radius: 22%;
}

.skills-blob-lozenge-b {
  width: 68%;
  height: 68%;
  border-radius: 28%;
}

.skills-blob-lozenge-a .skills-icon-slot,
.skills-blob-lozenge-b .skills-icon-slot {
  transform: rotate(-45deg);
}

.skills-bento-cell.is-up {
  z-index: 3;
}

.skills-bento-cell.is-featured {
  z-index: 4;
}

.skills-bento-cell.is-up .skills-podium,
.skills-bento-cell.is-featured .skills-podium {
  opacity: 1;
  transform: scale(1);
}

.skills-bento-cell.is-up .skills-lift {
  transform: translateY(-10%) scale(1.06);
  filter: drop-shadow(0 14px 16px hsla(250, 40%, 8%, 0.38));
}

.skills-bento-cell.is-featured .skills-lift {
  transform: translateY(-18%) scale(1.12);
  filter: drop-shadow(0 20px 20px hsla(250, 40%, 8%, 0.48));
}

.skills-bento-cell.is-back .skills-lift {
  opacity: 0.4;
  transform: scale(0.92);
}

.skills-bento-cell:not(.is-back):not(.is-up):not(.is-featured) .skills-bento-piece:hover {
  transform: translateY(-6%);
}

.skills-bento-piece:focus-visible {
  outline: 3px solid color-mix(in oklab, var(--first-color) 55%, transparent);
  outline-offset: 4px;
  border-radius: 1rem;
}

#skills [role='gridcell'] {
  container-name: skill-tile;
  container-type: size;
}

#skills [role='gridcell'] .skills-icon-slot {
  box-sizing: border-box;
  flex-shrink: 0;
  width: 42%;
  height: auto;
  aspect-ratio: 1;
  max-width: calc(100% - 0.25rem);
  max-height: calc(100% - 0.25rem);
}

@supports (width: 1cqmin) {
  #skills [role='gridcell'] .skills-icon-slot {
    width: 46cqmin;
    height: 46cqmin;
  }

  #skills [role='gridcell'] :is(.skills-blob-lozenge-a, .skills-blob-lozenge-b) .skills-icon-slot {
    width: 40cqmin;
    height: 40cqmin;
  }
}

#skills [role='gridcell'] .skills-icon-slot .skills-icon-host {
  display: flex !important;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 0;
  min-width: 0;
  align-items: center;
  justify-content: center;
}

#skills [role='gridcell'] .skills-icon-slot .skills-icon-host :is(svg) {
  display: block;
  box-sizing: border-box;
  width: 100% !important;
  height: 100% !important;
  min-width: 0;
  min-height: 0;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

@media (min-width: 768px) {
  .skills-bento-cell.is-up .skills-lift {
    transform: translateY(-14%) scale(1.08);
  }

  .skills-bento-cell.is-featured .skills-lift {
    transform: translateY(-22%) scale(1.14);
  }
}

@media (prefers-reduced-motion: reduce) {
  #skills .skills-bento-cell {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }

  .skills-lift,
  .skills-podium {
    transition: none;
  }

  .skills-bento-cell.is-up .skills-lift,
  .skills-bento-cell.is-featured .skills-lift,
  .skills-bento-cell.is-back .skills-lift {
    transform: none;
    filter: none;
  }
}

.skills-tooltip {
  background-color: var(--color-primary-alt);
}

.skills-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 4px;
  border-style: solid;
  border-color: var(--color-primary-alt) transparent transparent transparent;
}
</style>
