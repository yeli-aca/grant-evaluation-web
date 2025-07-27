<script setup lang="ts">
import { ref, onMounted, h, reactive, computed } from 'vue'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { gsap } from 'gsap'
import LocaleItem from '@/components/LocaleItem.vue'
import {
  animateNode,
  hideNode,
  animateNodeEntrance,
  numberToOrdinal,
  findNodeByContentAndTag,
  replaceNodeWithComponent,
} from '@/utils'
import FallingStarsBg from '@/components/FallingStarsBg.vue'
import RankText from '@/components/RankText.vue'
import LetterPullup from '@/components/LetterPullup.vue'
import TextHighlight from '@/components/TextHighlight.vue'
import AnimatedList from '@/components/AnimatedList.vue'
import Notification from '@/components/Notification.vue'
import Meteors from '@/components/Meteors.vue'
// import BlackHoleBackground from '@/components/BlackHoleBackground.vue'

const props = defineProps({
  topRanks: {
    type: Array<string>,
    default: ['Microsoft', 'Apple', 'Nvidia', 'OpenAI', 'SpaceX', 'Amazon', 'Tesla', 'Facebook'],
  },
  target: {
    default: {
      score: 6,
      rank: 13,
      name: '211',
    },
  },
})

const podiumAnimPlayerRef: any = ref(null)
const firstPriceNameRef: any = ref(null)
const secondPriceNameRef: any = ref(null)
const thirdPriceNameRef: any = ref(null)
const pullupRef: any = ref(null)

const podiumTipShows = reactive([false, false, false])

// const leftRanks = computed(()=>{
//   return props.topRanks.slice(3).map((grantName, i)=>{
//     return {
//       name: grantName,
//       rank: i,
//       color: '',
//       showTip: grantName == props.target.name
//     }
//   })
// })

const rankListData = computed(() => {
  let results = props.topRanks.slice(3).map((rankName, i) => {
    return {
      name: rankName,
      rank: i + 4,
      color: '',
      showTip: rankName == props.target.name,
    }
  })

  if (props.target.rank > props.topRanks.length) {
    if (props.target.rank !== props.topRanks.length + 1) {
      results.push({
        name: '',
        rank: -1,
        color: '',
        showTip: false,
      })
    }
    results.push({
      name: props.target.name,
      rank: props.target.rank,
      color: '',
      showTip: true,
    })
  }

  return results
})

function animateEntranceAfterPoiumShow(
  node: any,
  delay: number = 0,
  entraceName: string = 'zoomInUp'
) {
  setTimeout(() => {
    animateNodeEntrance(node, entraceName)
  }, 800 + delay)
}

function showPoium() {
  const player = podiumAnimPlayerRef.value.getDotLottieInstance()
  player.play()
  animateEntranceAfterPoiumShow(firstPriceNameRef.value)
  animateEntranceAfterPoiumShow(secondPriceNameRef.value, 500)
  animateEntranceAfterPoiumShow(thirdPriceNameRef.value, 1000)
  setTimeout(() => {
    detectPoiumTipShow()
  }, 2600)
}

function changeRank() {
  let rankSpan = findNodeByContentAndTag('$', 'span', pullupRef.value.$el)
  let newNode = replaceNodeWithComponent(rankSpan, h(RankText, { value: props.target.rank }))
  let parentNode: any = newNode.parentNode!.parentNode
  parentNode.classList.add('flex', 'items-center')
}

function changeScore() {
  let scoreSpan = findNodeByContentAndTag('@', 'span', pullupRef.value.$el)
  replaceNodeWithComponent(
    scoreSpan,
    h(
      TextHighlight,
      {
        class: 'bg-gradient-to-r from-indigo-300 to-purple-300',
        style: 'line-height: 2.5rem; padding: 0 0.5rem;',
      },
      props.target.score.toString()
    )
  )
}

function detectPoiumTipShow() {
  if (props.topRanks.length > 0 && props.topRanks[0] == props.target.name) {
    podiumTipShows[0] = true
  } else if (props.topRanks.length > 1 && props.topRanks[1] == props.target.name) {
    podiumTipShows[1] = true
  } else if (props.topRanks.length > 2 && props.topRanks[2] == props.target.name) {
    podiumTipShows[2] = true
  }
}

onMounted(() => {
  hideNode(firstPriceNameRef.value)
  hideNode(secondPriceNameRef.value)
  hideNode(thirdPriceNameRef.value)

  changeScore()
  changeRank()
  setTimeout(() => {
    showPoium()
  }, 1000)
})
</script>

<template>
  <div class="flex flex-col justify-center items-center" style="margin-bottom: 3rem">
    <div class="fixed top-0" style="width: 100%; z-index: 1000">
      <div class="flex w-full flex-col items-center justify-center">
        <div class="relative w-full">
          <div
            class="absolute inset-0 size-full scale-[0.80] rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl"
          />
          <div
            class="relative flex h-full flex-col items-center justify-end overflow-hidden rounded border border-gray-800 bg-gray-900 px-4 py-2 shadow-xl"
          >
            <span class="relative z-50 text-white">
              <LetterPullup
                ref="pullupRef"
                :words="`Your grant achieved a score of @ and ranked $`"
                :delay="0.02"
                class="text-white"
              />
            </span>
            <Meteors />
          </div>
        </div>
      </div>
    </div>
    <div class="podium-names flex flex-row justify-center" style="margin-top: 4rem">
      <locale-item class="podium-name second-price-name" :show-tip="podiumTipShows[1]">
        <h1 ref="secondPriceNameRef">
          {{ props.topRanks.length > 1 ? props.topRanks[1] : '' }}
        </h1>
      </locale-item>
      <locale-item class="podium-name first-price-name" :show-tip="podiumTipShows[0]">
        <h1 ref="firstPriceNameRef">
          {{ props.topRanks.length > 0 ? props.topRanks[0] : '' }}
        </h1>
      </locale-item>
      <locale-item class="podium-name third-price-name" :show-tip="podiumTipShows[2]">
        <h1 ref="thirdPriceNameRef">
          {{ props.topRanks.length > 2 ? props.topRanks[2] : '' }}
        </h1>
      </locale-item>
    </div>

    <DotLottieVue
      ref="podiumAnimPlayerRef"
      style="height: 28rem; width: 38rem"
      :speed="1.8"
      src="/podium.lottie"
    />
    <AnimatedList :delay="150">
      <template #default>
        <Notification
          v-for="(item, idx) in rankListData"
          :key="idx"
          :name="item.name"
          :rank="item.rank"
          :color="item.color"
          :show-tip="item.showTip"
        />
      </template>
    </AnimatedList>
  </div>
  <!-- <locale-item class="podium-name second-price-name" :show-tip="true" tip-direction="left">
    test
  </locale-item> -->
  <FallingStarsBg color="#7f6f6f56" style="z-index: -1 !important" />
</template>

<style lang="css" scoped>
.podium-names {
  position: relative;
  background-color: blue;
  top: 3rem;
  width: 100%;
}

.podium-name {
  position: absolute;
}

.second-price-name {
  top: 10rem;
  right: 50%;
}

.third-price-name {
  top: 13rem;
  left: 50%;
}
</style>
