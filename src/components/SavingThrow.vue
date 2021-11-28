<script setup>

import {calculateModifier, calculateProficiency} from "../lib/dndCalculation.js"
const props = defineProps({
        savesScore:{
            type: Array,
            default() {
                return [];
            },
        },
        player: Object,
    });

</script>

<template>
    <div class="saving-throw-field">
      <!-- <h2>Saving throws</h2> -->
        <div class="row saving-throw-box" v-for="stat in savesScore" :key="stat.name">
          <div class="col-1">
            <input
            type="checkbox"
            :name="'cbk' + stat.name"
            :checked="player.characterClass.profSavingThrow.includes(stat.name)"/>
          </div>

          <div class="col">
            <span>
            {{ stat.name }} |->
            {{
              calculateModifier(stat.value) +
              (player.characterClass.profSavingThrow.includes(stat.name) ? calculateProficiency(player.level) : 0)
            }} 
          </span>
          </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

.saving-throw-field{
    border-radius: 25px;
    background-color: #000957;
    margin: 10px;
    padding-bottom: 5px;
    padding-top: 5px;
}

.saving-throw-box{
    border-radius: 25px;
    background-color: #344CB7;
    margin: 10px;
}


div{
    color: hsl(var(--color-base-hue), 100%, 87%);
}
</style>