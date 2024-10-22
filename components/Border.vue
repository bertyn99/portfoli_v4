<template>
    <component :is="as" :class="[
        className,
        'relative before:absolute after:absolute',
        invert
            ? 'before:bg-white after:bg-purple/10'
            : 'before:bg-purple-800 after:bg-purple-800/40',
        position === 'top' &&
        'before:left-0 before:top-0 before:h-px before:w-6 after:left-8 after:right-0 after:top-0 after:h-px',
        position === 'left' &&
        'before:left-0 before:top-0 before:h-6 before:w-px after:bottom-0 after:left-0 after:top-8 after:w-px',
    ]">
        <slot></slot>
    </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    as?: string
    className?: string
    position?: 'top' | 'left'
    invert?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    as: 'div',
    position: 'top',
    invert: false,
})

// If you need to use clsx for more complex class conditionals
// import { computed } from 'vue'
// import clsx from 'clsx'
//
// const classes = computed(() => clsx(
//   props.className,
//   'relative before:absolute after:absolute',
//   // ... rest of the class logic
// ))
</script>