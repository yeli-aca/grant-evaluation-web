<script setup lang="ts">
import { ref, onMounted } from 'vue'
import InteractiveHoverButton from '@/components/InteractiveHoverButton.vue'
import { animateNodeEntrance, animateNodeExit } from '@/utils'

const grantName = ref('')

const props = defineProps({
  questions: {
    default: [
      'Is your grant a Fortune 1500?',
      'Is your grant a Fortune 1000?'
    ],
  },
})

const currentQestionIndex = ref(0)

const questionRef: any = ref(null)
const yesButtonRef: any = ref(null)
const noButtonRef: any = ref(null)
const indexRef:any = ref(null)

let answers: any = []

const emits = defineEmits(['answer-submit'])

function animateRefsEntrance() {
  animateNodeEntrance(questionRef.value, 'zoomInDown')
  animateNodeEntrance(yesButtonRef.value, 'bounceInLeft')
  animateNodeEntrance(noButtonRef.value, 'bounceInRight')
  animateNodeEntrance(indexRef.value, 'fadeIn')
}

function showNext(yesDelay: number = 0, noDelay: number = 0) {
    animateNodeExit(indexRef.value, 'fadeOut')
  setTimeout(() => {
    animateNodeExit(yesButtonRef.value, 'bounceOutLeft')
    if (yesDelay > 0) {
      animateNodeExit(questionRef.value, 'zoomOutUp')
    }
  }, yesDelay)
  setTimeout(() => {
    animateNodeExit(noButtonRef.value, 'bounceOutRight')
    if (noDelay > 0) {
      animateNodeExit(questionRef.value, 'zoomOutUp')
    }
  }, noDelay)
  setTimeout(() => {
    if (currentQestionIndex.value + 1 < props.questions.length) {
      currentQestionIndex.value += 1
      animateRefsEntrance()
    } else {
      emits('answer-submit', answers)
    }
  }, yesDelay + noDelay + 600)
}

function handleYesClick() {
  answers.push(true)
  showNext(0, 400)
}

function handleNoClick() {
  answers.push(false)
  showNext(400, 0)
}

onMounted(() => {
  animateRefsEntrance()
  answers = []
})
</script>

<template>
  <div style="width: 100%" class="flex flex-col justify-center items-center">
    <p ref="indexRef" class="relative z-50 mb-4 text-base font-normal text-slate-500">
      Question {{ currentQestionIndex + 1 }} ( {{ currentQestionIndex + 1 }}/{{
        questions.length
      }}
      )
    </p>

    <h1
      ref="questionRef"
      class="relative z-50 mb-4 text-xl font-bold text-white"
      style="width: 100%; margin-bottom: 2rem;text-align: start;"
    >
      {{ questions[currentQestionIndex] }}
    </h1>

    <div class="flex flex-row gap-5">
      <interactive-hover-button
        text="Yes"
        class="answer-button"
        ref="yesButtonRef"
        @click="handleYesClick"
      >
        <!-- <template #icon>
                <div style="width: 2rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 12 12"><g fill="none"><path d="M9.854 3.146a.5.5 0 0 1 0 .708l-4.5 4.5a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L5 7.293l4.146-4.147a.5.5 0 0 1 .708 0z" fill="currentColor"></path></g></svg>
                </div> 
            </template> -->
      </interactive-hover-button>
      <interactive-hover-button
        text="No"
        class="answer-button"
        ref="noButtonRef"
        @click="handleNoClick"
      >
        <!-- <div style="width: 2rem;">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 12 12"><g fill="none"><path d="M9.854 3.146a.5.5 0 0 1 0 .708l-4.5 4.5a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L5 7.293l4.146-4.147a.5.5 0 0 1 .708 0z" fill="currentColor"></path></g></svg>
            </div>  -->
      </interactive-hover-button>
    </div>
  </div>
</template>

<style lang="css" scoped>
.answer-button {
  padding: 0.5rem 2rem;
  font-size: 1.3rem;
}
</style>
