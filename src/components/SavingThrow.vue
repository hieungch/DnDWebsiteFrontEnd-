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
    <div class="section saving-throws">
      <h2>Saving throws</h2>
        <div class="saving-thows-item" v-for="stat in savesScore" :key="stat.name">
          <input
            type="checkbox"
            :name="'cbk' + stat.name"
            :checked="isStatProficient(stat.name)"
          />
          <span>
            +{{
              calculateModifier(stat.value) +
              (isStatProficient(stat.name) ? proficiencyBonus : 0)
            }}
            {{ stat.name }}</span
          >
        </div>
    </div>
</template>

<style scoped lang="scss">
</style>