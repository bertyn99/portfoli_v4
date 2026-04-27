<template>
  <section id="services" class="@container services shell-section animate-in slide-in-from-bottom">
    <h2 class="section-title">EXPERTISE</h2>
    <span class="section-subtitle">& SERVICES</span>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:flex lg:items-center lg:justify-between lg:gap-12 xl:gap-16">
        <div class="flex justify-center lg:w-1/2 lg:max-w-xl lg:justify-end">
          <div class="w-[30.375rem] max-w-full flex-none lg:w-[40.5rem]">
            <StylizedImg src="/img/laptop.jpg" alt="services" sizes="(min-width: 1024px) 36.9rem, 27.9rem"
              class="justify-center lg:justify-end" />
          </div>
        </div>
        <ul role="list" class="mt-16 w-full max-w-2xl text-base text-primary-text lg:mt-0 lg:w-1/2 lg:min-w-0 lg:max-w-none">
          <li class="group mt-10 first:mt-0" v-for="service in services">
            <Border
              class="pt-10 group-first:pt-0 group-first:before:hidden group-first:after:hidden text-primary-text">
              <strong class="dark:text-primary">{{ service.name }}</strong>
              {{ service.description }}
            </Border>
          </li>
        </ul>
        <!--  <div class="col-span-4 h-72 bg-primary"></div> -->
      </div>
    </div>

  </section>

</template>

<script setup>
const services = [
  {
    name: "Developpement Web",
    icon: "streamline:paint-palette-solid",
    description: "Je suis spécialisés dans la création de belles pages marketing de haute qualité. Le reste du site sera une coquille qui utilise du lorem ipsum partout.",
  },
  {
    name: "Developpement d'application fullstack",
    description: "Je suis développeurs qualifiés experts dans les derniers frameworks d'applications, comme React, Vuejs, NUxt et Nextjs.",
    icon: "ion:desktop",
  },

  {
    name: "Prise en main",
    description: "Je comprend l’importance d’avoir un CMS robuste et personnalisé pour les client. C’est pourquoi je peux pouvons gérer vos projets clients à partir de cms tels que Strapi, Nuxt Studio, Directus, etc.",
    icon: "clarity:blocks-group-line",
  },

  {
    name: "Prise en main",
    description: "Je comprend l’importance d’avoir un CMS robuste et personnalisé pour les client. C’est pourquoi je peux pouvons gérer vos projets clients à partir de cms tels que Strapi, Nuxt Studio, Directus, etc.",
    icon: "clarity:blocks-group-line",
  },
];
</script>

<style lang="postcss"></style>
