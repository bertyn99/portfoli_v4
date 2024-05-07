<template>
  <section id="skills" class="skills section">
    <h2 class="section-title">Compétences</h2>
    <span class="section-subtitle">Mon Niveau Technique</span>
    <div class="skills-container container grid mx-auto px-4 sm:px-6 lg:px-8">
      <div v-for="(skill, i) in skills" :key="i" class="skills-content"
        :class="[skill.isOpen == true ? 'skills-open' : 'skills-close']">
        <div class="skills-header" @click="skill.isOpen = !skill.isOpen">
          <svg v-if="skill.name == 'Front-End'" class="h-8 w-8 skills-icon" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M8,3A2,2 0 0,0 6,5V9A2,2 0 0,1 4,11H3V13H4A2,2 0 0,1 6,15V19A2,2 0 0,0 8,21H10V19H8V14A2,2 0 0,0 6,12A2,2 0 0,0 8,10V5H10V3M16,3A2,2 0 0,1 18,5V9A2,2 0 0,0 20,11H21V13H20A2,2 0 0,0 18,15V19A2,2 0 0,1 16,21H14V19H16V14A2,2 0 0,1 18,12A2,2 0 0,1 16,10V5H14V3H16Z" />
          </svg>
          <svg v-if="skill.name == 'Back-End'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 skills-icon"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
          </svg>
          <svg v-if="skill.name == 'Design'" class="h-8 w-8 skills-icon" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
          <div>
            <h1 class="skills-title">{{ skill.name }}</h1>
            <span class="skills-subtitle">{{ skill.time }}</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div class="skills-list grid">
          <div v-for="l in skill.lang" :key="l.name" class="skills-data">
            <div class="skills-titles">
              <h3 class="skills-name">{{ l.name }}</h3>
              <span class="skills-number">{{ l.percentage }}%</span>
            </div>
            <div class="skills-bar">
              <span class="skills-percentage" :style="{ width: l.percentage + '%' }"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      skills: [
        {
          name: 'Front-End',
          time: 'Depuis +1 an',
          isOpen: true,
          lang: [
            { name: 'Php ', percentage: 75 },
            { name: 'Vue', percentage: 75 },
            { name: 'React', percentage: 70 },
            { name: 'Tailwind', percentage: 80 },],
        },
        {
          name: 'Back-End',
          time: 'Depuis +1 an',
          isOpen: false,
          lang: [
            { name: 'NodeJs/Express', percentage: 90 },
            { name: 'Laravel', percentage: 70 },
            { name: 'adonisJs', percentage: 70 }
          ],
        },
        {
          name: 'Design',
          time: 'Depuis +6 mois',
          isOpen: false,
          lang: [
            { name: 'Figma', percentage: 50 },
            { name: 'UX', percentage: 40 },
            { name: 'UI', percentage: 50 },
          ],
        },
      ],
    }
  },
}
</script>

<style lang="postcss">
.skills {
  &-container {
    @screen md {
      @apply grid-cols-2;
    }
  }

  &-title {
    @apply text-base;
  }

  &-header {
    @apply flex items-center mb-10 cursor-pointer;
  }

  &-icon {
    @apply text-3xl text-primary mr-3;
  }

  &-arrow {
    @apply text-3xl text-primary ml-auto transition duration-500;
  }

  &-subtitle {
    @apply text-sm text-primary-textLight;
  }

  &-list {
    @apply gap-y-6 pl-11;
  }

  &-titles {
    @apply flex justify-between mb-2;
  }

  &-name {
    @apply text-base font-medium;
  }

  &-bar,
  &-percentage {
    @apply h-1 rounded;
  }

  &-bar {
    @apply bg-primary-lighter;
  }

  &-percentage {
    @apply block bg-primary;
  }

  &-close>&-list {
    @apply h-0 overflow-hidden;
  }

  &-open,
  &-list {
    @apply h-auto mb-10;
  }

  &-open>&-arrow {
    @apply transform -rotate-180;
  }
}
</style>