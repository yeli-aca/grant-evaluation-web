<script setup lang="ts">
import { ref, onMounted } from 'vue'
import IInput from '@/components/IInput.vue'
import InteractiveHoverButton from '@/components/InteractiveHoverButton.vue'
import { animateNodeEntrance, animateNodeExit, hideNode } from '@/utils'
import grantJsonData from '@/assets/grants.json'

const grantName = ref('')
const emits = defineEmits(['name-submit'])

const titleRef: any = ref(null)
const inputRef: any = ref(null)
const buttonRef: any = ref(null)

function show() {
  animateNodeEntrance(titleRef.value, 'zoomInDown')
  hideNode(inputRef.value)
  setTimeout(() => {
    animateNodeEntrance(inputRef.value, 'fadeIn')
  }, 800)
  animateNodeEntrance(buttonRef.value, 'zoomInUp')
}

function hide() {
  animateNodeExit(inputRef.value, 'fadeOut')
  setTimeout(() => {
    animateNodeExit(titleRef.value, 'zoomOutUp')
    animateNodeExit(buttonRef.value, 'zoomOutDown')
  }, 800)
}

function handleStartTestClick() {
  grantName.value = grantName.value.trim()
  if (inputRef.value.validate(grantName.value)) {
    hide()
    setTimeout(() => {
      emits('name-submit', grantName.value)
    }, 1800)
  }
}

function validateGrantName(name: string) {
  if (name.length == 0) {
    return 'Grant name cannot be empty'
  } else if (grantJsonData.map((grant) => grant.name).includes(grantName.value)) {
    return 'Grant name exists'
  } else {
    return ''
  }
}

onMounted(() => {
  show()
})
</script>

<template>
  <div style="width: 100%" class="flex flex-col justify-center items-center">
    <h1
      ref="titleRef"
      class="relative z-50 mb-4 text-xl font-bold text-white"
      style="width: 100%; margin-bottom: 2rem"
    >
      Please input your grant name
    </h1>

    <!-- <p class="relative z-50 mb-4 text-base font-normal text-slate-500">
                I don&apos;t know what to write so I&apos;ll just paste something cool here. One more
                sentence because lorem ipsum is just unacceptable. Won&apos;t ChatGPT the shit out of
                this.
            </p> -->
    <IInput
      ref="inputRef"
      id="inputDemo"
      placeholder="Input here"
      container-class="w-full max-w-sm"
      auto-focus
      trim
      v-model="grantName"
      :error-handler="validateGrantName"
      @keyup.enter="handleStartTestClick"
    ></IInput>
    <interactive-hover-button
      ref="buttonRef"
      text="Start Test"
      style="margin-top: 2rem"
      @click="handleStartTestClick"
    />
  </div>
</template>

<style lang="css" scoped></style>
