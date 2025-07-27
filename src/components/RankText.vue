<script setup lang="ts">
import { numberToOrdinal } from '@/utils'
import SparklesText from '@/components/SparklesText.vue'

const props = defineProps({
  value: {
    type: Number,
    default: 2,
  },
  spark: {
    type: Boolean,
    default: true,
  },
  suffixSize: {
    default: 'medium'
  }
})
</script>

<template>
  <span v-if="!props.spark"
    >{{ props.value
    }}<span class="rank-text-suffix" :style="{
      fontSize: suffixSize
    }">
      {{ numberToOrdinal(props.value).replace(props.value.toString(), '') }}
    </span>
  </span>
  <span class="flex flex-row" v-else>
    <span>
        <sparkles-text
        :text="props.value.toString()"
        :colors="{ first: '#9E7AFF', second: '#FE8BBB' }"
        :sparkles-count="10"
        style="font-size: 2.4rem;"
        />
    </span>
    <span class="rank-text-suffix" :style="{
      fontSize: suffixSize
    }">
      {{ numberToOrdinal(props.value).replace(props.value.toString(), '') }}
    </span>
  </span>

</template>

<style lang="css" scoped>
.rank-text-suffix {
  vertical-align: super;
  font-size: medium;
  line-height: normal;
}
</style>
