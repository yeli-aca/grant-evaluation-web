<script setup lang="ts">
import { reactive, ref } from 'vue'
import HomeView from '@/views/HomeView.vue';
import ResultPage from './ResultPage.vue';
import grantJsonData from '@/assets/grants.json'

const showHomeView = ref(true)

const targetGrant:any = reactive({
    name: '',
    score: -1,
    rank: -1
})

const resultData:any = reactive({
  topRanks: [],
  target: {}
})

function handleNameSubmit(name:string){
  targetGrant.name = name
  // console.log(targetGrant)
}

function handleScoreSubmit(score:number){
  targetGrant.score = score
  displayResult()
}

function computeTopRanksAndTarget(){
  let ranks = grantJsonData.concat([{name: targetGrant.name, score: targetGrant.score}]).sort((a, b)=>b.score - a.score)
  // console.log(ranks)
  let result:any = {}
  result.topRanks = ranks.slice(0, 10).map(rank=>rank.name)
  result.target = {name: targetGrant.name, score: targetGrant.score, rank: ranks.findIndex(rank=>rank.name == targetGrant.name)+1}
  return result
}

function displayResult(){
  let result = computeTopRanksAndTarget()
  resultData.topRanks = result.topRanks
  resultData.target = result.target
  showHomeView.value = false
}

function handleClickRetest(){
  showHomeView.value = true
}

</script>

<template>
  <HomeView v-if="showHomeView" @name-submit="handleNameSubmit"  @score-submit="handleScoreSubmit" />
  <ResultPage v-else :top-ranks="resultData.topRanks" :target="resultData.target" @click-retest="handleClickRetest" />
</template>

<style lang="css" scoped>

</style>
