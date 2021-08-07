<template>
  <div>
    <Header />
    <main class="main">
      <home></home>
      <about></about>
      <skills></skills>
      <graduate></graduate>
      <services></services>
      <portfolio></portfolio>
    </main>
  </div>
</template>

<script>
import Home from '~/components/Home.vue'
import About from '~/components/About.vue'
import Skills from '~/components/Skills.vue'
import Graduate from '~/components/Graduate.vue'
import Portfolio from '~/components/Portfolio.vue'
import Services from '~/components/Services.vue'
export default {
  components: { Home, About, Portfolio, Skills, Graduate, Services },
}
</script>
