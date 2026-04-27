<template>
  <section id="skills" class="@container bg-skills-bg py-14 text-primary-text md:py-24 dark:text-skills-muted">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8 flex flex-col gap-6 lg:mb-10 items-center lg:gap-8">
        <header class="shrink-0">
          <h2 id="skills-heading" class="section-title dark:text-white">
            Compétences
          </h2>
          <span class="section-subtitle text-primary">
            Mon niveau technique
          </span>
        </header>

        <div class="flex flex-1 flex-wrap justify-center gap-8 sm:gap-10 md:gap-14" role="tablist"
          aria-label="Catégories de compétences">
          <button v-for="(tab, index) in skillTabs" :id="`skills-tab-${index}`" :key="tab.name" type="button"
            class="rounded-sm border-0 bg-transparent font-family-barlow text-sm font-medium tracking-wide text-primary-text/75 transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-skills-bg dark:text-skills-muted dark:hover:text-white"
            :class="{ 'font-semibold text-primary-title dark:text-white': index === activeTabIndex }" role="tab"
            :tabindex="index === activeTabIndex ? 0 : -1" :aria-selected="index === activeTabIndex"
            :aria-controls="SKILLS_PANEL_ID" @click="selectCategory(index)" @keydown="onTabKeydown($event, index)">
            {{ tab.name }}
          </button>
        </div>
      </div>

      <div :id="SKILLS_PANEL_ID" class="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-6 lg:grid-cols-6"
        role="grid" aria-labelledby="skills-heading" :aria-rowcount="gridLayout.length" :aria-colcount="6">
        <div v-for="(cell, i) in flatCells" :key="i" role="gridcell"
          class="skills-bento-cell flex aspect-square min-h-0 min-w-0 items-center justify-center rounded-2xl transition-[transform,box-shadow,opacity,filter] duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:duration-300"
          :class="[cellClasses(cell), cellMotionClass]" :style="cellStaggerStyle(i)"
          :aria-label="cell.skill ? cell.skill.name : 'Accent visuel'">
          <template v-if="cell.skill">
            <div
              class="group relative box-border flex h-full min-h-0 w-full min-w-0 items-center justify-center p-1 sm:p-1.5">
              <div class="skills-icon-slot flex items-center justify-center">
                <Icon :name="cell.skill.icon"
                  class="skills-icon-host flex h-full! w-full! items-center justify-center transition-transform duration-300 ease-out motion-safe:group-hover:scale-110 motion-safe:group-hover:-translate-y-0.5"
                  :class="iconToneClass(cell)" :aria-hidden="true" />
              </div>
              <span class="sr-only">{{ cell.skill.name }}</span>
              <div
                class="skills-tooltip pointer-events-none absolute -top-2 left-1/2 z-10 -translate-x-1/2 -translate-y-full rounded-md px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {{ cell.skill.name }}
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const SKILLS_PANEL_ID = 'skills-panel'

const prefersReducedMotion = usePreferredReducedMotion()

const cellMotionClass = computed(() =>
  prefersReducedMotion.value === 'reduce' ? '' : 'motion-safe:animate-skills-cell-reveal',
)

function cellStaggerStyle(i) {
  if (prefersReducedMotion.value === 'reduce')
    return {}
  return { animationDelay: `${Math.min(i, 23) * 30}ms` }
}

/** Explicit 6×4 bento (primary accent + light + dark icon cells). */
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

const skillTabs = [
  { name: 'Front-End' },
  { name: 'Back-End' },
  { name: 'Design' },
]

const activeTabIndex = ref(0)
const filterIndex = ref(null)

function selectCategory(index) {
  activeTabIndex.value = index
  if (filterIndex.value === index) {
    filterIndex.value = null
  }
  else {
    filterIndex.value = index
  }
}

function onTabKeydown(e, index) {
  const len = skillTabs.length
  let next = null
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault()
    next = (index + 1) % len
  }
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault()
    next = (index - 1 + len) % len
  }
  else if (e.key === 'Home') {
    e.preventDefault()
    next = 0
  }
  else if (e.key === 'End') {
    e.preventDefault()
    next = len - 1
  }
  if (next === null)
    return
  selectCategory(next)
  nextTick(() => {
    document.getElementById(`skills-tab-${next}`)?.focus()
  })
}

function cellClasses(cell) {
  const out = []
  if (cell.variant === 'accent') {
    out.push(
      'border border-primary-alt/35 bg-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] motion-safe:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_12px_28px_-6px_rgba(0,0,0,0.2)] dark:motion-safe:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_14px_36px_-8px_rgba(0,0,0,0.45)]',
    )
  }
  else if (cell.variant === 'light') {
    out.push(
      'border border-primary/12 bg-skills-tile-light motion-safe:hover:border-primary/25 motion-safe:hover:shadow-md motion-safe:hover:shadow-primary/10',
    )
  }
  else if (cell.variant === 'dark') {
    out.push(
      'border border-skills-tile-border bg-skills-tile-dark shadow-[0_0_28px_-8px_var(--skills-tile-glow)] motion-safe:hover:shadow-[0_0_36px_-6px_var(--skills-tile-glow),0_10px_24px_-10px_rgba(0,0,0,0.35)]',
    )
  }

  if (
    filterIndex.value !== null
    && cell.skill
    && cell.categoryIndex !== filterIndex.value
  ) {
    out.push('opacity-[0.38] grayscale')
  }
  if (
    filterIndex.value !== null
    && cell.skill
    && cell.categoryIndex === filterIndex.value
  ) {
    out.push(
      '-translate-y-0.5 shadow-[0_0_36px_-4px_var(--skills-tile-glow),0_14px_28px_-8px_rgba(0,0,0,0.35)]',
    )
  }
  return out
}

function iconToneClass(cell) {
  if (cell.variant === 'accent')
    return 'text-white drop-shadow-sm [&_svg]:drop-shadow-sm'
  if (cell.variant === 'light')
    return 'text-primary-title/90'
  return ''
}
</script>

<style lang="postcss">
/*
 * Tile = query container so icon size tracks the *cell*, not ambiguous % parents.
 * 72cqmin ≈ 72% of the shorter tile edge — clearly “half+” of the visible square.
 */
#skills [role='gridcell'] {
  container-name: skill-tile;
  container-type: size;
}

#skills [role='gridcell'] .skills-icon-slot {
  box-sizing: border-box;
  flex-shrink: 0;
  width: 45%;
  height: auto;
  aspect-ratio: 1;
  max-width: calc(100% - 0.25rem);
  max-height: calc(100% - 0.25rem);
}

@supports (width: 1cqmin) {
  #skills [role='gridcell'] .skills-icon-slot {
    width: 55cqmin;
    height: 55cqmin;
  }
}

/* Nuxt Icon / Iconify host fills slot; SVG ignores Iconify inline px */
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

@media (prefers-reduced-motion: reduce) {
  #skills .skills-bento-cell {
    animation: none !important;
    transition-duration: 0.01ms !important;
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
