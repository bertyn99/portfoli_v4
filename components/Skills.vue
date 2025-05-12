<template>
  <section id="skills" class="skills section">
    <h2 class="section-title text-xl text-center font-medium mb-4 animate-fadeIn">COMPÉTENCES</h2>
    <span class="section-subtitle animate-fadeIn">MON NIVEAU TECHNIQUE</span>
    <div class="skills-container container grid mx-auto px-4 sm:px-6 lg:px-8">
      <div v-for="(skill, i) in skills" :key="i" 
           class="skills-content group transition-all duration-300 hover:scale-105"
           :class="[skill.isOpen ? 'skills-open' : 'skills-close']">
        <div class="skills-header cursor-pointer transition-colors duration-300 hover:bg-primary-lighter/10 rounded-lg p-4" 
             @click="skill.isOpen = !skill.isOpen">
          <Icon :name="skill.icon" class="text-3xl text-primary mr-3 transition-transform duration-300 group-hover:scale-110"/>
          <div>
            <h1 class="skills-title">{{ skill.name }}</h1>
            <span class="skills-subtitle">{{ skill.time }}</span>
          </div>
          <Icon name="heroicons:chevron-down" 
                class="ml-auto h-5 w-5 transition-transform duration-300"
                :class="{ 'rotate-180': skill.isOpen }"/>
        </div>
        <div class="skills-list grid transition-all duration-500 ease-in-out"
             :class="{ 'max-h-0 opacity-0': !skill.isOpen, 'max-h-[1000px] opacity-100': skill.isOpen }">
          <div v-for="l in skill.lang" :key="l.name" 
               class="skills-data transform transition-all duration-500 hover:translate-x-2">
            <div class="skills-titles">
              <h3 class="skills-name">{{ l.name }}</h3>
              <span class="skills-number">{{ l.percentage }}%</span>
            </div>
            <div class="skills-bar bg-primary-lighter/20 rounded-full overflow-hidden">
              <div class="skills-percentage h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                   :style="{ width: l.percentage + '%', transform: skill.isOpen ? 'scaleX(1)' : 'scaleX(0)' }">
              </div>
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
    time: 'Depuis +3 ans',
    isOpen: true,
    icon: 'vscode-icons:file-type-html',
    lang: [
      { name: 'PHP', percentage: 75 },
      { name: 'Vue', percentage: 75 },
      { name: 'Nuxt', percentage: 85 },
      { name: 'React', percentage: 70 },
      { name: 'Next', percentage: 80 },
      { name: 'TailwindCSS', percentage: 90 },
    ],
  },
  {
    name: 'Back-End',
    time: 'Depuis +2 ans',
    isOpen: false,
    icon: 'vscode-icons:file-type-node',
    lang: [
      { name: 'NodeJs/Express', percentage: 90 },
      { name: 'NestJs', percentage: 90 },
      { name: 'Laravel', percentage: 70 },
      { name: 'AdonisJs', percentage: 70 }
    ],
  },
  {
    name: 'Design',
    time: 'Depuis +6 mois',
    isOpen: false,
    icon: 'vscode-icons:file-type-figma',
    lang: [
      { name: 'Figma', percentage: 60 },
      { name: 'UX', percentage: 50 },
      { name: 'UI', percentage: 65 },
    ],
  },
])
</script>

<style lang="postcss">
.skills {
  @apply py-16;

  &-container {
    @screen md {
      @apply grid-cols-2 gap-8;
    }
  }

  &-content {
    @apply bg-white/5 backdrop-blur-sm rounded-xl p-4 mb-8 shadow-lg;
  }

  &-header {
    @apply flex items-center mb-6;
  }

  &-title {
    @apply text-lg font-semibold;
  }

  &-subtitle {
    @apply text-sm text-primary-textLight;
  }

  &-list {
    @apply gap-y-6 pl-11 overflow-hidden;
  }

  &-titles {
    @apply flex justify-between mb-2;
  }

  &-name {
    @apply text-base font-medium;
  }

  &-bar {
    @apply h-2;
  }

  &-percentage {
    @apply transform-gpu origin-left;
  }

  &-close &-list {
    @apply max-h-0 opacity-0;
  }
}

.section-subtitle {
  @apply block text-2xl text-center mb-16 text-primary uppercase font-black;
}
</style>