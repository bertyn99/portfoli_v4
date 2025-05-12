<template>
  <section id="skills" class="skills section">
    <h2 class="section-title text-xl text-center font-medium mb-4 animate-fadeIn">COMPÉTENCES</h2>
    <span class="section-subtitle animate-fadeIn">MON NIVEAU TECHNIQUE</span>

    <div class="skills-container container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Category Tabs -->
      <div class="category-tabs">
        <button v-for="(category, index) in skills" 
                :key="index"
                @click="selectCategory(index)"
                :class="['category-tab', { 'active': category.selected }]"
                :aria-selected="category.selected"
                role="tab">
          {{ category.name }}
        </button>
      </div>

      <!-- Skills Grid -->
      <div class="skills-grid">
        <template v-for="(row, rowIndex) in gridRows" :key="rowIndex">
          <div v-for="(cell, cellIndex) in row" 
               :key="cellIndex"
               :class="[
                 'skill-cell',
                 { 'glass-effect': !cell.icon },
                 { 'elevated': cell.categoryIndex === selectedCategoryIndex },
                 { 'dimmed': selectedCategoryIndex !== null && cell.categoryIndex !== selectedCategoryIndex },
                 { 'chess-dark': (rowIndex + cellIndex) % 2 === 0 }
               ]"
               role="gridcell"
               :aria-label="cell.name || 'Empty cell'">
            <template v-if="cell.icon">
              <div class="skill-content group">
                <Icon :name="cell.icon" 
                      class="skill-icon"
                      :aria-label="cell.name"/>
                <div class="skill-tooltip">{{ cell.name }}</div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
const selectedCategoryIndex = ref(null)

const skills = ref([
  {
    name: 'Front-End',
    selected: false,
    lang: [
      { name: 'HTML/CSS', icon: 'vscode-icons:file-type-html' },
      { name: 'Vue', icon: 'vscode-icons:file-type-vue' },
      { name: 'Nuxt', icon: 'vscode-icons:file-type-nuxt' },
      { name: 'React', icon: 'vscode-icons:file-type-reactjs' },
      { name: 'Next', icon: 'vscode-icons:file-type-next' },
      { name: 'TailwindCSS', icon: 'vscode-icons:file-type-tailwind' },
    ],
  },
  {
    name: 'Back-End',
    selected: false,
    lang: [
      { name: 'NodeJs', icon: 'vscode-icons:file-type-node' },
      { name: 'NestJs', icon: 'vscode-icons:file-type-nest' },
      { name: 'Laravel', icon: 'vscode-icons:file-type-php' },
      { name: 'AdonisJs', icon: 'vscode-icons:file-type-js' }
    ],
  },
  {
    name: 'Design',
    selected: false,
    lang: [
      { name: 'Figma', icon: 'logos:figma' },
      { name: 'UX', icon: 'mdi:palette-outline' },
      { name: 'UI', icon: 'mdi:palette-swatch-outline' },
    ],
  },
])

// Create a 6x6 grid with skills and empty cells
const gridRows = computed(() => {
  const grid = []
  const totalRows = 3
  const totalCols = 6
  let skillIndex = 0

  for (let i = 0; i < totalRows; i++) {
    const row = []
    for (let j = 0; j < totalCols; j++) {
      // Add empty cells strategically
      if ((i + j) % 3 === 0) {
        row.push({})
      } else if (skillIndex < getAllSkills().length) {
        row.push(getAllSkills()[skillIndex++])
      } else {
        row.push({})
      }
    }
    grid.push(row)
  }
  return grid
})

// Flatten all skills into a single array with category index
const getAllSkills = () => {
  return skills.value.flatMap((category, categoryIndex) => 
    category.lang.map(skill => ({
      ...skill,
      categoryIndex
    }))
  )
}

const selectCategory = (index) => {
  selectedCategoryIndex.value = selectedCategoryIndex.value === index ? null : index
  skills.value.forEach((category, i) => {
    category.selected = i === index
  })
}
</script>

<style lang="postcss">
.skills {
  @apply py-16;

  .skills-container {
    @apply mt-12;
  }

  .category-tabs {
    @apply flex justify-center gap-4 mb-12;
  }

  .category-tab {
    @apply px-6 py-2 rounded-full transition-all duration-300
           text-primary-text hover:text-primary hover:bg-primary-lighter;

    &.active {
      @apply bg-primary text-white;
    }
  }

  .skills-grid {
    @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 
           max-w-6xl mx-auto;
  }

  .skill-cell {
    @apply aspect-square rounded-xl p-4 transition-all duration-300
           relative flex items-center justify-center;

    &.elevated {
      @apply transform -translate-y-2 shadow-xl shadow-primary;
    }

    &.dimmed {
      @apply opacity-40;
    }

    &.chess-dark {
      @apply bg-primary;
    }

    &.glass-effect {
      @apply backdrop-blur-sm bg-white/10 border border-white/20;
    }
  }

  .skill-content {
    @apply relative flex items-center justify-center h-full w-full;
  }

  .skill-icon {
    @apply w-12 h-12 text-primary transition-transform duration-300
           group-hover:scale-110 group-hover:transform group-hover:-translate-y-1;
  }

  .skill-tooltip {
    @apply absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 
           bg-gray-900 text-white text-sm rounded-md opacity-0
           pointer-events-none transition-opacity duration-200
           group-hover:opacity-100;

    &::after {
      content: '';
      @apply absolute top-full left-1/2 -translate-x-1/2
             border-4 border-transparent border-t-gray-900;
    }
  }
}

.section-subtitle {
  @apply block text-2xl text-center mb-16 text-primary uppercase font-black;
}
</style>
