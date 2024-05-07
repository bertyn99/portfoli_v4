<template>
  <section id="services" class="services section  animate-in  slide-in-from-bottom">
    <h2 class="text-xl text-center font-medium mb-4">EXPERTISE</h2>
    <span class="section-subtitle">& SERVICES</span>
    <div class="services-container container grid grid-cols-4 gap-2 mx-auto px-12 sm:px-14 lg:px-20">
      <div v-for="(service, i) in services" :key="i"
        class=" h-48 border border-gray-200 rounded-md cursor-pointer hover:shadow-xl group   hover:bg-primary-lighter"
        :class="[service.active ? 'bg-primary' : 'bg-primary-dark']">
        <div class="flex flex-col h-full gap-4 justify-around items-center">
          <Icon :name="service.icon" class="h-10 w-10 text-primary-lighter group-hover:text-primary lg:h-20 lg:w-20" />
          <h3 class="leading-5  text-primary dark:text-white">
            {{ service.name }}
          </h3>
        </div>
      </div>
      <!--  <div class="col-span-4 h-72 bg-primary"></div> -->
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    name: "Integration Web",

    icon: "uim:web-grid",
  },
  {
    name: "Développeur FullStack",
    icon: "ion:desktop",
  },
  {
    name: "Ux/Ui Design",
    icon: "streamline:paint-palette-solid",
  },
  {
    name: "Consulting",
    icon: "clarity:blocks-group-line",
  },
];
</script>

<style lang="postcss">
.services {
  &-button {
    @apply cursor-pointer text-sm;

    &:hover>.button-icon {
      @apply transform translate-x-2;
    }
  }
}
</style>
