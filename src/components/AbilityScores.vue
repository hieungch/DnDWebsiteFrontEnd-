<script setup>
import {calculateModifier} from "../lib/dndCalculation.js"
 
const props = defineProps({
        statScore:{
            type: Array,
            default() {
                return [];
            },
        },
    });
</script>

<template>
    <div class="section basic-stats">
        <h2>Ability Score</h2>
        <div class="stat" v-for="stat in statScore" :key="stat.name">
          {{ stat.name }}: {{ stat.value }} ({{
            calculateModifier(stat.value)
          }})
        </div>
    </div>
</template>

<style scoped lang="scss">
</style>