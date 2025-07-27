<script setup lang="ts">
import { ref } from 'vue'
import RankView from '@/views/RankView.vue'
import InteractiveHoverButton from '@/components/InteractiveHoverButton.vue'

const props = defineProps({
  topRanks: Array<string>,
  target: {
    default: {
      name: '',
      score: -1,
      rank: -1,
    },
  },
})

const emits = defineEmits(['click-retest'])

function handleReTestClick(){
  emits('click-retest')
}

</script>

<template>
  <div>
  <RankView :top-ranks="topRanks" :target="target" />
  <interactive-hover-button
      text="Re-test"
      class="retest-button"
      ref="noButtonRef"
      @click="handleReTestClick"
    />
  </div>
  
</template>

<style lang="css" scoped>
.retest-button {
  position: fixed;
  top: 2rem;
  right: 1rem;
  z-index: 1000;
}
</style>
