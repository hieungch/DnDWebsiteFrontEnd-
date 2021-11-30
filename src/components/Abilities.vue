<script setup>
import { onMounted, reactive } from "vue";
import { AbilityRepository } from "../lib/repositories.js";
const props = defineProps({
  player: Object,
});

const data = reactive({
  abilities: [],
});

onMounted(async () => {
  data.abilities = await AbilityRepository.getAll();
});
//player.level === data.abilities.levelRequirement

</script>

<template>
    <div class="ability-score-field">
            <div class="ability-score-box">
                <h3 >Abilities</h3>
                <!-- <div v-if="player.level === data.abilities.levelRequirement">
                    {{ ability.name }}
                </div> -->
                <div class="row skill-box" 
                v-for="ability in data.abilities" :key="ability.name">
                    {{ ability.name }}
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