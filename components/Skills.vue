<template>
  <section id="skills" class="skills section">
    <h2 class="section-title text-xl text-center font-medium mb-4 animate-fadeIn">COMPÉTENCES</h2>
    <span class="section-subtitle animate-fadeIn">MON NIVEAU TECHNIQUE</span>
    
    <div class="skills-grid container mx-auto px-4 sm:px-6 lg:px-8">
      <div v-for="(category, categoryIndex) in skills" :key="categoryIndex" class="skill-category">
        <h3 class="category-title">{{ category.name }}</h3>
        <div class="skill-items">
          <div v-for="(skill, skillIndex) in category.lang" :key="skillIndex"
               class="skill-item"
               :class="{ 'bg-primary/10': (categoryIndex + skillIndex) % 2 === 0 }">
            <div class="skill-icon-wrapper group">
              <Icon :name="getIconName(skill.name)" 
                    class="skill-icon group-hover:scale-110 group-hover:translate-y-[-4px] transition-all duration-300"
                    :title="skill.name"/>
              <span class="skill-tooltip">{{ skill.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const skills = ref([
  {
    name: 'Front-End',
    lang: [
      { name: 'HTML/CSS' },
      { name: 'Vue' },
      { name: 'Nuxt' },
      { name: 'React' },
      { name: 'Next' },
      { name: 'TailwindCSS' },
    ],
  },
  {
    name: 'Back-End',
    lang: [
      { name: 'NodeJs' },
      { name: 'NestJs' },
      { name: 'Laravel' },
      { name: 'AdonisJs' }
    ],
  },
  {
    name: 'Design',
    lang: [
      { name: 'Figma' },
      { name: 'UX' },
      { name: 'UI' },
    ],
  },
])

const getIconName = (skillName) => {
  const iconMap = {
    'HTML/CSS': 'vscode-icons:file-type-html',
    'Vue': 'vscode-icons:file-type-vue',
    'Nuxt': 'vscode-icons:file-type-nuxt',
    'React': 'vscode-icons:file-type-reactjs',
    'Next': 'vscode-icons:file-type-next',
    'TailwindCSS': 'vscode-icons:file-type-tailwind',
    'NodeJs': 'vscode-icons:file-type-node',
    'NestJs': 'vscode-icons:file-type-nest',
    'Laravel': 'vscode-icons:file-type-php',
    'AdonisJs': 'vscode-icons:file-type-js',
    'Figma': 'vscode-icons:file-type-figma',
    'UX': 'mdi:palette-outline',
    'UI': 'mdi:palette-swatch-outline',
  }
  return iconMap[skillName] || 'mdi:code-tags'
}
</script>

<style lang="postcss">
.skills {
  @apply py-16;

  &-grid {
    @apply mt-12 space-y-12;
  }

  .skill-category {
    @apply space-y-6;
  }

  .category-title {
    @apply text-2xl font-bold text-primary mb-6;
  }

  .skill-items {
    @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4;
  }

  .skill-item {
    @apply aspect-square rounded-xl p-4 transition-all duration-300
           hover:shadow-lg hover:shadow-primary-skill/20;
  }

  .skill-icon-wrapper {
    @apply relative flex items-center justify-center h-full;
  }

  .skill-icon {
    @apply w-12 h-12 text-primary;
  }

  .skill-tooltip {
    @apply absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 
           bg-gray-900 text-white text-sm rounded-md opacity-0
           pointer-events-none transition-all duration-300
           group-hover:opacity-100 group-hover:-top-12;

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
