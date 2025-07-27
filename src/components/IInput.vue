<!-- Uses base code from shadcn-vue Input component and extends it's functionality-->
<template>
  <div
    ref="inputContainerRef"
    :class="cn('group/input rounded-lg p-[2px] transition duration-300', props.containerClass)"
    :style="{
      background: containerBg,
    }"
    @mouseenter="() => (visible = true)"
    @mouseleave="() => (visible = false)"
    @mousemove="handleMouseMove"
  >
    <input
      ref="inputRef"
      v-bind="$attrs"
      v-model="modelValue"
      @input="handleInput"
      :class="
        cn(
          `flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover/input:shadow-none transition duration-400`,
          props.class
        )
      "
    />

    <p
      v-if="errorMsg.length > 0"
      class="relative z-50 mb-4 text-base font-normal text-red-400"
      style="text-align: start"
    >
      {{ errorMsg }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { useVModel } from '@vueuse/core'
import { ref, computed, onMounted } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
  containerClass?: HTMLAttributes['class']
  autoFocus: boolean
  trim: boolean
  errorHandler?: any
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const inputContainerRef = ref<HTMLDivElement | null>(null)
const mouse = ref<{ x: number; y: number }>({ x: 0, y: 0 })
const radius = 100
const visible = ref(false)

const inputRef: any = ref(null)

const containerBg = computed(() => {
  return `
        radial-gradient(
          ${visible.value ? radius + 'px' : '0px'} circle at ${mouse.value.x}px ${mouse.value.y}px,
          var(--blue-500),
          transparent 80%
        )
      `
})

const errorMsg = ref('')

function handleMouseMove({ clientX, clientY }: MouseEvent) {
  if (!inputContainerRef.value) return

  const { left, top } = inputContainerRef.value.getBoundingClientRect()
  mouse.value = { x: clientX - left, y: clientY - top }
}

function validate(s: any) {
  // console.log(props.errorHandler)
  let validateFunc = props.errorHandler ? props.errorHandler : () => ''
  errorMsg.value = validateFunc(s)
  return errorMsg.value.length <= 0
}

function handleInput(e: any) {
  let currentValue: any = modelValue.value
  modelValue.value = currentValue.trimStart()
  validate(modelValue.value)
}

onMounted(() => {
  if (props.autoFocus) inputRef.value?.focus()
})

defineExpose({
  validate,
})
</script>

<style scoped>
input {
  box-shadow: 0px 2px 3px -1px rgba(0, 0, 0, 0.1), 0px 1px 0px 0px rgba(25, 28, 33, 0.02),
    0px 0px 0px 1px rgba(25, 28, 33, 0.08);
}
</style>
