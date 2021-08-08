<template>
  <header id="header" class="header">
    <nav class="nav">
      <nuxt-link to="/" class="nav-logo"
        ><img src="/BB.png" alt="bertyn boulikou initiale"
      /></nuxt-link>

      <div class="nav-menu" :class="[isOpen ? 'show-menu' : '']">
        <ul class="nav-list">
          <li class="nav-item">
            <nuxt-link to="/" class="nav-link" @click="iOpen = false"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                /></svg
              >Accueil</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link to="#about" class="nav-link" @click="iOpen = false"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                /></svg
              >A propros</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link to="#skills" class="nav-link" @click="iOpen = false"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                /></svg
              >Compétences</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link to="#services" class="nav-link" @click="iOpen = false"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                /></svg
              >Services</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link to="#portfolio" class="nav-link" @click="iOpen = false"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                /></svg
              >Portfolio</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link to="#contact" class="nav-link" @click="iOpen = false"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                /></svg
              >Contact</nuxt-link
            >
          </li>
        </ul>
        <button class="nav-close" @click="isOpen = !isOpen">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div class="nav-btns">
        <button class="change-theme" @click="theme">
          <svg
            v-if="!isDark"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
          <svg
            v-if="isDark"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>
        <div class="nav-toggle" @click="isOpen = !isOpen">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      isDark: false,
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollHeader)
  },
  mounted() {
    this.loadTheme()
    window.addEventListener('scroll', this.scrollHeader)
  },
  methods: {
    scrollHeader() {
      const nav = document.getElementById('header')
      if (window.scrollY >= 80) {
        nav.classList.add('scroll-header')
      } else {
        nav.classList.remove('scroll-header')
      }
    },
    theme() {
      this.isDark = !this.isDark
      localStorage.theme = this.isDark ? 'dark' : 'light'
      document.documentElement.classList.toggle('dark')
    },
    loadTheme() {
      if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        this.isDark = true
        document.documentElement.classList.add('dark')
      } else {
        this.isDark = false
        document.documentElement.classList.remove('dark')
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.header {
  @apply w-full fixed bottom-0 left-0 z-20 bg-primary-body;
}
.nav {
  @apply max-w-screen-lg flex h-16 justify-between items-center;
  &-logo {
    @apply text-primary-title font-medium;
    &:hover {
      @apply text-primary;
    }
  }
  &-toggle {
    @apply text-primary-title font-medium text-base cursor-pointer;
    &:hover {
      @apply text-primary;
    }
  }
  &-btns {
    @apply flex items-center;
  }

  @media screen and (max-width: 380px) {
    &-menu {
      @apply fixed -bottom-full left-0 w-full bg-primary-body pt-8 px-1 pb-16 shadow-md rounded-t-xl transition duration-300;
    }
  }
  &-list {
    @apply grid grid-cols-3 gap-8;
  }
  &-link {
    @apply flex flex-col items-center font-medium text-primary-title text-sm;
    &:hover {
      @apply text-primary;
    }
  }

  &-close {
    @apply absolute right-5 bottom-2 text-2xl cursor-pointer text-primary;
    &:hover {
      @apply text-primary-alt;
    }
  }
}
.change-theme {
  @apply h-6 w-6 text-primary mr-4 cursor-pointer;
  &:hover {
    @apply text-primary-alt;
  }
}
.show-menu {
  @apply bottom-0;
}

.scroll-header {
  box-shadow: 0 -1px 4px;
}
</style>