    <script setup>
import { onMounted } from "vue";
import {calculateProficiency} from "../lib/dndCalculation.js";
const props = defineProps({
        player: Object,
    });
// this is for leveling up
// it can be used many time defineEmits(["","",...])
const emit = defineEmits(["levelUpEvent","loadAnotherChar"]);
</script>

<template>
    <div class="col-4 player-col-divider-right">
     <div class="row player-info-box">
        <div class="player-name">
            Character name: {{ player.name }} 
        </div>
        <div class="player-sheet-option">
            <button @click='emit("levelUpEvent")' class="btn btn-primary">Level Up</button>
            <button @click='emit("levelUpEvent")' class="btn btn-primary">Edit</button>
            <button @click='emit("loadAnotherChar")' class="btn btn-primary">Load character's list</button>
        </div>
     </div>
    </div>

    <div class="col-8 player-col-divider-left">
        <div class="row">
            <div class="col player-info-box">
                <div>
                    Class: {{ player.characterClass.className}}
                </div>
                <div >
                    Race: Human
                </div>
                <div>
                    Background: sage
                </div>
            </div>
            
            <div class="col player-info-box"> 
                <div>
                    Lvl: {{ player.level }}
                </div>
                <div class="">Inspiration: 0</div>
                <div class="">
                    Proficiency bonus: {{ calculateProficiency(player.level) }}
                </div>
            </div>
        </div>
    </div>

</template>

<style lang="scss">


.player-info-box{
    border-radius: 25px;
    background-color: #000957;
    margin: 10px;
}

.player-name{
  text-align: center;
}

.player-sheet-option{
  text-align: center;
}


.btn {
  border: 1px solid var(--color-btn-border);
  margin: .2rem;
  border-radius: .5rem;
  padding: .5rem 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
}

.btn-primary {
  color: var(--color-btn-primary-text);
  background-color: #344CB7;
}

div{
    color: hsl(var(--color-base-hue), 100%, 87%);
}

</style>