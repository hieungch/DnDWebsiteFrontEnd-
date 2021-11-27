<script setup>
import { ref } from "vue";
const proficiencyBonus = ref(2);
const props = defineProps({
        player: {
            type: Object,
        }
    });
// this is for leveling up
// it can be used many time defineEmits(["","",...])
const emit = defineEmits(["levelUpEvent"])

</script>

<template>
    <div class="col-4">
        <div class="section player-name">
            Character Name: {{ player.name }} <span>#{{ player.id }}</span>
        </div>
        <button @click='emit("levelUpEvent")'>press me</button>
    </div>

    <div class="col-8">
        <div class="row">
            <div class=" ">
            CLASS : Lvl {{ player.level }} {{ player.characterClass.className }}
            <span class="player-race">RACE : Human</span>
            <span class="player-background">BACKGROUND : sage</span>
            </div>
            
        </div>
        <div class="row">
            <div class="">
                <span class="inspiration">Inspiration: 0</span>
                <span class="proficiency-bonus">
                    Proficiency bonus: {{ proficiencyBonus }}
                </span>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">
</style>