<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue'
import Spline from '@/components/spine/Spline.vue'
import Meteors from '@/components/Meteors.vue'
import NameInputView from './NameInputView.vue'
import QuestionView from './QuestionView.vue'
import questionJsonData from '@/assets/questions.json'
import { animateNodeExit } from '@/utils'

const sceneUrl = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

const questions: any = ref([])

const questionViewData = computed(() => questions.value.map((item: any) => item.question))

const showNameInput = ref(true)

const emits = defineEmits(['name-submit', 'score-submit'])

function handleNameSubmit(name: string) {
  emits('name-submit', name)
  showNameInput.value = false
}

function handleAnswerSubmit(answers: any) {
  let score = 0
  answers.forEach((answer: boolean, i: number) => {
    let question = questions.value[i]
    score += answer ?question.yes_score : question.no_score
  })
  emits('score-submit', score)
}

onMounted(() => {
  questions.value = questionJsonData
})
</script>

<template>
  <div class="relative w-full overflow-hidden rounded-lg bg-white">
    <div
      class="absolute flex w-full flex-col items-center justify-center gap-2 p-8 text-center font-heading text-grey"
      style="height: 100%; bottom: 15%"
    >
      <!-- <span class="text-4xl font-semibold"> Inspira UI </span>
      <span class="font-sans font-light">Build spline animations with style.</span> -->
      <div class="flex w-full flex-col items-center justify-center">
        <div class="relative w-full" style="width: 60%">
          <div
            class="absolute inset-0 size-full scale-[0.80] rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl"
          />
          <div
            class="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 px-8 py-10 shadow-xl"
          >
            <NameInputView v-if="showNameInput" @name-submit="handleNameSubmit" />
            <QuestionView v-else :questions="questionViewData" @answer-submit="handleAnswerSubmit" />
            <Meteors />
          </div>
        </div>
      </div>
    </div>
    <div class="flex relative top-100">
      <Spline :scene="sceneUrl" class="mt-24 size-full" />
    </div>
  </div>
</template>

<style lang="css" scoped></style>
