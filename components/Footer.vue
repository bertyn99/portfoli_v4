<template>
  <footer class="footer">
    <div class="footer-bg">
      <div class="footer-container container grid mx-auto px-5">
        <div>
          <h1 class="footer-title">Bertyn</h1>
          <span class="footer-subtitle">Web Developper Junior</span>
        </div>
        <ul class="footer-links">
          <li><a href="#services" class="footer-link">Services</a></li>
          <li><a href="#porfolio" class="footer-link">Portfolio</a></li>
          <li><a href="#contact" class="footer-link">Contact</a></li>
        </ul>
        <div class="footer-socials">
          <a
            href="https://www.facebook.com/helenbertyn.boulikoudamours"
            target="_blank"
            class="footer-social"
          >
            <svg
              class="h-5 w-5 footer-social"
              enable-background="new 0 0 24 24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m6.812 13.937h2.518v9.312c0 .414.335.75.75.75l4.007.001c.415 0 .75-.337.75-.75v-9.312h2.387c.378 0 .697-.282.744-.657l.498-4c.056-.446-.293-.843-.744-.843h-2.885c.113-2.471-.435-3.202 1.172-3.202 1.088-.13 2.804.421 2.804-.75v-3.577c0-.375-.277-.692-.648-.743-.314-.043-1.555-.166-3.094-.166-7.01 0-5.567 7.772-5.74 8.437h-2.519c-.414 0-.75.336-.75.75v4c0 .414.336.75.75.75zm.75-3.999h2.518c.414 0 .75-.336.75-.75v-3.151c0-2.883 1.545-4.536 4.24-4.536.878 0 1.686.043 2.242.087v2.149c-.402.205-3.976-.884-3.976 2.697v2.755c0 .414.336.75.75.75h2.786l-.312 2.5h-2.474c-.414 0-.75.336-.75.75v9.311h-2.505v-9.312c0-.414-.336-.75-.75-.75h-2.519z"
              />
            </svg>
          </a>
          <a
            href="https://github.com/bertyn99"
            target="_blank"
            class="footer-social"
          >
            <svg class="h-6 w-6 footer-social" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
              />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/bertyn-boulikou/"
            target="_blank"
            class="footer-social"
            ><svg
              id="Bold"
              enable-background="new 0 0 24 24"
              class="h-5 w-5 footer-social"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m23.994 24v-.001h.006v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07v-2.185h-4.773v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243v7.801z"
              />
              <path d="m.396 7.977h4.976v16.023h-4.976z" />
              <path
                d="m2.882 0c-1.591 0-2.882 1.291-2.882 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909c-.001-1.591-1.292-2.882-2.882-2.882z"
              /></svg
          ></a>
        </div>
      </div>
      <p class="footer-copy">&#169; Bertyn. Tous drois réserved</p>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="postcss">
.footer {
  @apply pt-8 bg-primary;

  &-container {
    @apply grid-flow-row gap-14;
    @screen md {
      @apply grid-cols-2 px-4 py-0;
    }
    @screen lg {
      @apply grid-cols-3;
    }
    @screen xl {
      @apply p-0;
    }
  }
  &-bg {
    @apply pt-4 px-0 pb-12;
    @screen lg {
      @apply pt-12 pb-14;
    }
  }
  &-title {
    @apply text-2xl mb-1;
  }
  &-subtitle {
    @apply text-sm;
  }
  &-links {
    @apply flex flex-col gap-6;
    @screen lg {
      @apply flex-row gap-8;
    }
    &:hover {
      @apply text-primary-lighter;
    }
  }
  &-socials {
    @apply flex;
    @screen lg {
      @apply justify-self-end;
    }
  }
  &-social {
    @apply mr-4;

    &:hover {
      @apply text-primary-lighter fill-current;
    }
  }
  &-copy {
    @apply text-xs text-center text-primary-textLight mt-12;
    @screen lg {
      @apply text-base;
    }
  }
  &-title,
  &-subtitle,
  &-link,
  &-social {
    @apply text-white fill-current;
  }
}
</style>