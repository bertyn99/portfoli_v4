<template>
  <transition :name="transition">
    <div v-show="visible" :data-slide="props.index">
      <slot></slot>
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
  }
})

const visible = computed(() => {
  return props.index === props.visibleIndex
})
const transition = computed(() => {
  return 'slide-' + props.direction
})

</script>

<style >
.slide-right-enter-active {
  animation: slideRightIn 0.5s;
}

.slide-right-leave-active {
  animation: slideRightOut 0.5s;
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

/* animat left */
.slide-left-enter-active {
  animation: slideLeftIn 0.5s;
}

.slide-left-leave-active {
  animation: slideLeftOut 0.5s;
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
</style>