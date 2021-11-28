<script setup>
import { ref } from "vue";
import {calculateModifier} from "../lib/dndCalculation.js"
import {isStatProficient} from "../lib/dndCalculation.js"
const props = defineProps({
        savesScore:{
            type: Array,
            default() {
                return [];
            },
        },
    });
    const proficiencyBonus = ref(2);
</script>

<template>
    <div class="saving-throw-field">
      <!-- <h2>Saving throws</h2> -->
        <div class="row saving-throw-box" v-for="stat in savesScore" :key="stat.name">
          <div class="col-1">
            <input
            type="checkbox"
            :name="'cbk' + stat.name"
            :checked="isStatProficient(stat.name)"/>
          </div>

          <div class="col">
            <span>
            {{ stat.name }} |->
            {{
              calculateModifier(stat.value) +
              (isStatProficient(stat.name) ? proficiencyBonus : 0)
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