<script setup>
import { onMounted, reactive } from "vue";

const props = defineProps({
  diceType: {
    type: Object,
    default() {
      return { minPoint: 1, maxPoint: 6 };
    },
  },
  quantity: Number,
});

let results = reactive([]);

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function roolDice(diceType, quantity) {
  results.length = 0;
  for (let i = 0; i < quantity; i++) {
    results.push(getRndInteger(diceType.minPoint, diceType.maxPoint));
  }
}

onMounted(() => {
  roolDice(props.diceType, props.quantity);
});
</script>

<template>
  <div class="dice-board">
    <div class="result" v-for="(result, index) in results" :key="index">
      {{ result }}
    </div>
  </div>
</template>
