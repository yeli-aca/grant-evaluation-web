<template>
  <div class="group relative -mr-4" style="display: flex; flex-direction: row">
    <!-- Tooltip -->
    <Motion
      v-if="showTip"
      :initial="{
        opacity: 0,
        y: 20,
        scale: 0.6,
      }"
      :animate="{
        opacity: 1,
        y: 0,
        scale: 1,
      }"
      :transition="{
        type: 'spring',
        stiffness: 260,
        damping: 10,
      }"
      :exit="{
        opacity: 0,
        y: 20,
        scale: 0.6,
      }"
      :class="fullMotionClasses"
    >
      <div
        class="absolute right-1/2 translate-x-1/2 -bottom-px z-30 h-px w-2/5 me-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
      />
      <div
        class="absolute left-1/2 -translate-x-1/2 -bottom-px z-30 h-px w-2/5 ms-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent"
      />
      <div class="relative z-30 text-base font-bold text-white">
        {{ tipUp }}
      </div>
      <div
        class="text-xs text-white"
        :style="{ marginLeft: tipDirection == 'left' ? '0.5rem' : 0 }"
      >
        {{ tipDown }}
      </div>
    </Motion>

    <!-- Avatar Image -->
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { motion, Motion } from 'motion-v'

interface Item {
  name: string
  designation: string
}

const props = defineProps({
  tipUp: {
    default: 'Your Grant',
  },
  tipDown: {
    default: '↓',
  },
  showTip: {
    default: false,
  },
  tipDirection: {
    default: 'top',
  },
  xClass: {
    default: '',
  },
  yClass: {
    default: '',
  },
  extraMotionClasses: {
    default: '',
  },
})

const motionClasses = computed(() => {
  switch (props.tipDirection) {
    case 'top':
      {
        let xClass = props.xClass.length > 0 ? props.xClass : 'left-1/2'
        let yClass = props.yClass.length > 0 ? props.yClass : '-top-16'
        return `absolute ${xClass} ${yClass} z-50 flex -translate-x-1/2 flex-col items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-xs shadow-xl`
      }
      break
    case 'left':
      {
        let xClass = props.xClass.length > 0 ? props.xClass : '-left-1/3'
        let yClass = props.yClass.length > 0 ? props.yClass : 'top-1/5'
        return `absolute ${xClass} ${yClass} z-50 flex -translate-x flex-row items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-xs shadow-xl`
      }
      break
  }
})

const fullMotionClasses = computed(() => {
  // console.log(motionClasses.value + ' ' + props.extraMotionClasses)
  return motionClasses.value + ' ' + props.extraMotionClasses
})
</script>
