<template>
  <div :class="cn('flex flex-col items-center gap-4', $props.class)">
    <transition-group
      name="list"
      tag="div"
      class="flex flex-col-reverse items-center gap-3"
      move-class="move"
    >
      <!-- Only render the items up to the current index -->
      <Motion
        v-for="data in itemsToShow"
        :key="data.id"
        as="div"
        :initial="{ scale: 0, opacity: 0 }"
        :animate="{
          scale: 1,
          opacity: 1,
          y: 0,
        }"
        :exit="{
          scale: 0,
          opacity: 0,
          y: 0,
        }"
        :transition="{
          type: 'spring',
          stiffness: 350,
          damping: 40,
        }"
        :class="cn('mx-auto w-full')"
      >
        <component :is="data.node" :ref="`node${data.id}`" />
      </Motion>
    </transition-group>
  </div>
</template>

<script lang="ts" setup>
import { Motion } from "motion-v";
import { computed, onMounted, ref, useSlots, getCurrentInstance } from "vue";
import { cn } from "@/lib/utils";

interface Props {
  class?: string;
  delay?: number;
}

const that:any = getCurrentInstance()

const props = withDefaults(defineProps<Props>(), {
  delay: 1000,
});

const slots = useSlots();
const displayedItems:any = ref<{ node: unknown; id: string }[]>([]);
const nextIndex = ref(0);

onMounted(startLoop);

async function startLoop() {
    const notifications:any = slots.default ? (slots.default()[0].children ?? []) : [];
    // console.log(notifications)
    if (!notifications.length) return;
    let locateIndex = notifications.length-notifications.findIndex((notification:any)=>{
        let child = notification
        return ('show-tip' in child.props) && child.props['show-tip']
    })-1
    while (displayedItems.value.length < notifications.length) {
        displayedItems.value.push({
        node: notifications[notifications.length-nextIndex.value-1],
        id: `${nextIndex.value}-${Date.now()}`,
        });
        nextIndex.value = (nextIndex.value + 1) % notifications.length;
        await wait(props.delay);
    }
    let targetNode:any = Object.entries(that.refs).find((item:any)=>item[0].startsWith(`node${locateIndex}`))![1]
    setTimeout(()=>{
        targetNode[0].$el.scrollIntoView({behavior: 'smooth'})
        setTimeout(()=>{
            targetNode[0].startShowTip()
        }, 400)
    }, 2500)
  
//   while (true) {
//     displayedItems.value.shift();
//     displayedItems.value.push({
//       node: notifications[nextIndex.value],
//       id: `${nextIndex.value}-${Date.now()}`,
//     });
//     nextIndex.value = (nextIndex.value + 1) % notifications.length;
//     await wait(props.delay);
//   }
}

const itemsToShow = computed(() => displayedItems.value);

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
</script>

<style scoped>
.move {
  transition: transform 0.4s ease-out;
}
</style>