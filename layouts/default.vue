<template>
  <div>
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-inverted"
    >
      Aller au contenu
    </a>
    <Header />
    <UMain id="main">
      <slot />
    </UMain>
    <Footer />
    <ScrollTop />
  </div>
</template>
