<script setup>
import {calculateProficiency} from "../lib/dndCalculation.js";
const props = defineProps({
        player: Object,
    });

// this is for leveling up
// it can be used many time defineEmits(["","",...])
const emit = defineEmits([
    "levelUpEvent","loadAnotherChar",
    "levelDownEvent","characterSavingEvent",
    "spendChargeEvent","restoreChargeEvent"
]);

// function chargeUp(point) {
//   if (point < player.characterClass.specialStat.point) {
//     point++;
//   }
// }

// function chargeDown(point) {
//   if (point > player.characterClass.specialStat.point) {
//     point--;
//   }
// }
</script>

<template>
    <div class="col-4 player-col-divider-right">
     <div class="row player-info-box">
        <div>
            Character name: {{ player.name }} 
        </div>
        <div >
            Unique feature: {{player.characterClass.specialStat.specialStatName}} 
        </div>
        <div >
            {{player.characterClass.specialStat.specialStatName}}'s charges:
            <span v-for="scaling in player.characterClass.specialStat.scale" :key="scaling.specialStatName">
                <span v-if="player.level == scaling.level">
                    {{scaling.point}}
                    <!-- <div class="player-sheet-option">
                        <button @click='chargeDown(scaling.point)' class="btn btn-primary">Spend charge</button>
                        <button @click='chargeUp(scaling.point)' class="btn btn-primary">Restore charge</button>  
                    </div> -->
                </span>
            </span>  
        </div>
        <div class="player-sheet-option">
            <router-link :to="`/editPage/${player.id}`" class="btn btn-primary">Edit</router-link>
            <button @click='emit("characterSavingEvent")' class="btn btn-primary">Save</button>
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
                    Race: {{ player.race.name}}
                </div>
                <div>
                    Background: {{ player.background.name}}
                </div>
                <div class="player-sheet-option">
                    <button @click='emit("loadAnotherChar")' class="btn btn-primary">Load character's list</button> 
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
                <div class="player-sheet-option">
                    <button @click='emit("levelUpEvent")' class="btn btn-primary">Level Up</button>
                    <button @click='emit("levelDownEvent")' class="btn btn-primary">Level Down</button>
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
  padding: .25rem .5rem;
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