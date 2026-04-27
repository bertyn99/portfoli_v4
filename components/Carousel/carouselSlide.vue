<template>
  <transition :name="transition">
    <div v-show="visible" class="relative" :data-slide="props.index">
      <slot />
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
  visibleIndex: {
    type: Number,
    default: 0,
  },
  direction: {
    type: String,
    default: 'right',
  },
})

const visible = computed(() => props.index === props.visibleIndex)

const transition = computed(() => `slide-${props.direction}`)
</script>

<style>
/* ease-out (~quart); respect reduced motion */
.slide-right-enter-active {
  animation: slideRightIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.slide-right-leave-active {
  animation: slideRightOut 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
}

@keyframes slideRightIn {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}

@keyframes slideRightOut {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-100%);
  }
}

.slide-left-enter-active {
  animation: slideLeftIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.slide-left-leave-active {
  animation: slideLeftOut 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
}

@keyframes slideLeftIn {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}

@keyframes slideLeftOut {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(100%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    animation-duration: 0.01ms !important;
  }
}
</style>
