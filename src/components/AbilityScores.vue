<script setup>
import {calculateModifier} from "../lib/dndCalculation.js"
 
const props = defineProps({
        player: Object,
    });
const statScore = [
  {
    name: "strength",
    value: props.player.strength,
  },
  {
    name: "dexterity",
    value: props.player.dexterity,
  },
  {
    name: "constitution",
    value: props.player.constitution,
  },
  {
    name: "intelligent",
    value: props.player.intelligent,
  },
  {
    name: "wisdom",
    value: props.player.wisdom,
  },
  {
    name: "charisma",
    value: props.player.charisma,
  },
];
</script>

<template>
    <div class="ability-score-field">
            <div class="ability-score-box" v-for="stat in statScore" :key="stat.name">
                    <div>
                      {{ stat.name }}: {{ stat.value }} |-> {{calculateModifier(stat.value)}}
                    </div>       
            </div>
    </div>
</template>

<style scoped lang="scss">

.ability-score-field{
    border-radius: 25px;
    background-color: #000957;
    margin: 10px;
    padding-bottom: 5px;
    padding-top: 5px;
}

.ability-score-box{
    border-radius: 25px;
    background-color: #344CB7;
    margin: 10px;
    padding-left: 10%;
}


div{
    color: hsl(var(--color-base-hue), 100%, 87%);
}
</style>