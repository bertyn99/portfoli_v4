```vue
<template>
  <section id="skills" class="py-16">
    <h2 class="text-xl text-center font-medium mb-4 animate-fadeIn">COMPÉTENCES</h2>
    <span class="block text-2xl text-center mb-16 text-primary uppercase font-black animate-fadeIn">
      MON NIVEAU TECHNIQUE
    </span>

    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Frontend Category -->
        <div class="skill-category">
          <div class="flex items-center gap-3 mb-6">
            <Icon name="vscode-icons:file-type-html" class="text-4xl"/>
            <div>
              <h3 class="text-xl font-bold">Frontend</h3>
              <p class="text-sm text-gray-500">3+ ans d'expérience</p>
            </div>
          </div>
          <div class="grid gap-4">
            <div v-for="tech in frontendTech" :key="tech.name" 
                 class="tech-card group">
              <div class="flex items-center gap-3">
                <Icon :name="tech.icon" class="text-2xl"/>
                <span class="font-medium">{{ tech.name }}</span>
              </div>
              <div class="mt-2 space-y-2">
                <div class="flex justify-between text-sm">
                  <span>Maîtrise</span>
                  <span>{{ tech.mastery }}%</span>
                </div>
                <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full bg-primary transition-all duration-1000 ease-out rounded-full"
                       :style="{ width: `${tech.mastery}%` }">
                  </div>
                </div>
                <div class="mt-3 text-sm text-gray-500">
                  {{ tech.description }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Backend Category -->
        <div class="skill-category">
          <div class="flex items-center gap-3 mb-6">
            <Icon name="vscode-icons:file-type-node" class="text-4xl"/>
            <div>
              <h3 class="text-xl font-bold">Backend</h3>
              <p class="text-sm text-gray-500">2+ ans d'expérience</p>
            </div>
          </div>
          <div class="grid gap-4">
            <div v-for="tech in backendTech" :key="tech.name" 
                 class="tech-card group">
              <div class="flex items-center gap-3">
                <Icon :name="tech.icon" class="text-2xl"/>
                <span class="font-medium">{{ tech.name }}</span>
              </div>
              <div class="mt-2 space-y-2">
                <div class="flex justify-between text-sm">
                  <span>Maîtrise</span>
                  <span>{{ tech.mastery }}%</span>
                </div>
                <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full bg-primary transition-all duration-1000 ease-out rounded-full"
                       :style="{ width: `${tech.mastery}%` }">
                  </div>
                </div>
                <div class="mt-3 text-sm text-gray-500">
                  {{ tech.description }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tools & Design Category -->
        <div class="skill-category">
          <div class="flex items-center gap-3 mb-6">
            <Icon name="vscode-icons:file-type-figma" class="text-4xl"/>
            <div>
              <h3 class="text-xl font-bold">Outils & Design</h3>
              <p class="text-sm text-gray-500">6+ mois d'expérience</p>
            </div>
          </div>
          <div class="grid gap-4">
            <div v-for="tech in toolsTech" :key="tech.name" 
                 class="tech-card group">
              <div class="flex items-center gap-3">
                <Icon :name="tech.icon" class="text-2xl"/>
                <span class="font-medium">{{ tech.name }}</span>
              </div>
              <div class="mt-2 space-y-2">
                <div class="flex justify-between text-sm">
                  <span>Maîtrise</span>
                  <span>{{ tech.mastery }}%</span>
                </div>
                <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full bg-primary transition-all duration-1000 ease-out rounded-full"
                       :style="{ width: `${tech.mastery}%` }">
                  </div>
                </div>
                <div class="mt-3 text-sm text-gray-500">
                  {{ tech.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const frontendTech = [
  {
    name: 'Vue.js/Nuxt',
    icon: 'vscode-icons:file-type-vue',
    mastery: 85,
    description: 'Développement d\'applications complexes, SSR, et optimisation des performances'
  },
  {
    name: 'React/Next.js',
    icon: 'vscode-icons:file-type-reactjs',
    mastery: 80,
    description: 'Creation d\'interfaces utilisateur réactives et gestion d\'état'
  },
  {
    name: 'TailwindCSS',
    icon: 'vscode-icons:file-type-tailwind',
    mastery: 90,
    description: 'Création d\'interfaces modernes et responsive avec une approche utility-first'
  }
]

const backendTech = [
  {
    name: 'Node.js/Express',
    icon: 'vscode-icons:file-type-node',
    mastery: 90,
    description: 'APIs RESTful, authentification, et intégration de bases de données'
  },
  {
    name: 'NestJS',
    icon: 'vscode-icons:file-type-nest',
    mastery: 90,
    description: 'Architecture modulaire, microservices, et injection de dépendances'
  },
  {
    name: 'Laravel',
    icon: 'vscode-icons:file-type-php',
    mastery: 70,
    description: 'Développement d\'applications web full-stack avec PHP'
  }
]

const toolsTech = [
  {
    name: 'Figma',
    icon: 'vscode-icons:file-type-figma',
    mastery: 60,
    description: 'Création de maquettes et prototypes interactifs'
  },
  {
    name: 'UI Design',
    icon: 'mdi:palette-outline',
    mastery: 65,
    description: 'Conception d\'interfaces utilisateur modernes et intuitives'
  },
  {
    name: 'UX Design',
    icon: 'mdi:account-group-outline',
    mastery: 50,
    description: 'Recherche utilisateur et conception d\'expériences fluides'
  }
]
</script>

<style lang="postcss" scoped>
.skill-category {
  @apply bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-lg;
}

.tech-card {
  @apply bg-white/10 rounded-lg p-4 transition-all duration-300 hover:bg-white/20;
  @apply transform hover:-translate-y-1 hover:shadow-xl;
}
</style>
```