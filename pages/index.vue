<template>
  <main class="main">
    <home></home>
    <about></about>
    <skills></skills>
    <graduate></graduate>
    <services></services>
    <portfolio></portfolio>
    <project-in-mind></project-in-mind>
    <derniers-post></derniers-post>
    <contactme></contactme>
  </main>
</template>

<script>
import Home from '~/components/Home.vue'
import About from '~/components/About.vue'
import Skills from '~/components/Skills.vue'
import Graduate from '~/components/Graduate.vue'
import Portfolio from '~/components/Portfolio.vue'
import Services from '~/components/Services.vue'
import Contactme from '~/components/Contactme.vue'
import ProjectInMind from '~/components/ProjectInMind.vue'
import DerniersPost from '~/components/DerniersPost.vue'

export default {
  components: {
    Home,
    About,
    Portfolio,
    Skills,
    Graduate,
    Services,
    Contactme,
    ProjectInMind,
    DerniersPost,
  },
  layout: 'default',
}
</script>
