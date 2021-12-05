<script setup>
import { reactive, onMounted, ref } from "vue";
import { CharacterSheetRepository } from "../lib/repositories.js";

// import components
import Skill from "../components/Skill.vue";
import DiceRoller from "../components/DiceRoller.vue";
import PlayerInfo from "../components/PlayerInfo.vue";
import AbilityScores from "../components/AbilityScores.vue";
import SavingThrow from "../components/SavingThrow.vue";
import HpBox from "../components/HpBox.vue";
import AcInitMove from "../components/AcInitMove.vue";
import Abilities from "../components/Abilities.vue";
import Feats from "../components/feats.vue";
import Inventory from "../components/Inventory.vue";
import Proficienies from "../components/Proficienies.vue";
import RacialAbilities from "../components/RacialAbilities.vue";

var data = reactive({
  player: {},
  sheets: [],
});

let playerIsLoaded = ref(false);

onMounted(async () => {
  if (!playerIsLoaded.value) {
    await loadAnotherChar();
  }
});


function selectCharacter(character) {
  data.player = character;
  playerIsLoaded.value = true;
}

async function loadAnotherChar() {
  let allSheetData = await CharacterSheetRepository.getAll();
  data.sheets = allSheetData;
  playerIsLoaded.value = false;
}

function lvUp() {
  if (data.player.level < 20) {
    data.player.level++;
  }
}

function lvDown() {
  if (data.player.level > 1) {
    data.player.level--;
  }
}

function healing(amount) {
  data.player.hp = data.player.hp + amount
  if (data.player.hp > data.player.maxHp) {
    data.player.hp = data.player.maxHp
  }
}

function damaging(amount) {
  data.player.hp = data.player.hp - amount ;
  if (data.player.hp < 0) {
    data.player.hp = 0
  }
}

function inspirationUp() {
  if (data.player.inspiration < 20) {
    data.player.inspiration++;
  }
}

function inspirationDown() {
  if (data.player.inspiration > 0) {
    data.player.inspiration--;
  }
}

// function chargeUp() {
//   if (data.player.characterClass.specialStat.scale.point < 20) {
//     data.player.characterClass.specialStat.scale.point++;
//   }
// }

// function chargeDown() {
//   if (data.player.characterClass.specialStat.scale.point > 0) {
//     data.player.characterClass.specialStat.scale.point--;
//   }
// }


// ... meant clone
async function updateCharacter() {
  try{
    let savingCharacter = {...data.player};
    savingCharacter.background = data.player.background.id;
    savingCharacter.race = data.player.race.id;
    savingCharacter.characterClass = data.player.characterClass.id;
    // console.log(savingCharacter);
    await CharacterSheetRepository.update(savingCharacter);
  } catch(err){
    console.error(err);
  }

}

async function deleteCharacter() {
  try{
    let deletingCharacter = {...data.player};
    // console.log(savingCharacter);
    await CharacterSheetRepository.delete(deletingCharacter);
  } catch(err){
    console.error(err);
  }

}
</script>

<template>
  <div v-if="playerIsLoaded">
    <DiceRoller ref="child" />
    <div class="row">
      <!-- when the event levelupevent is emitted from player info component, run the function lvUp-->
      <!-- @spendChargeEvent="chargeDown()" @restoreChargeEvent="chargeUp()"  -->
      <PlayerInfo
        :player="data.player"
        @loadAnotherChar="loadAnotherChar()" @characterSavingEvent="updateCharacter()"
        @levelUpEvent="lvUp()" @levelDownEvent="lvDown()"
        @inspirationUpEvent="inspirationUp()" @inspirationDownEvent="inspirationDown()"
        @characterDeletingEvent="deleteCharacter()"
      />
    </div>
    <div class="row">
      <div class="col-3">
        <AbilityScores :player="data.player" />
        <SavingThrow :player="data.player" />
        <Proficienies :player="data.player"/>
      </div>

      <div class="col-3">
        <Skill :player="data.player" />
      </div>

      <div class="col-3">
        <AcInitMove :player="data.player" />
        <!-- $event is -->
        <HpBox :player="data.player" @damagingHpEvent="damaging($event)" @healingHpEvent="healing($event)" />
        <Feats />
        <Inventory />
      </div>

      <div class="col-3">
        <Abilities :player="data.player" />
        <RacialAbilities :player="data.player"/>
      </div>
    </div>
  </div>

  <div v-if="!playerIsLoaded">
    <div class="box-list content-box-list">
      <div v-for="character in data.sheets" :key="character.id">
        <button class="btn-list" @click="selectCharacter(character)">
          View character
          {{ character.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  font-size: 20px;
  color: var(--color-text-light);
  --color-base-hue: 200;
  --color-danger-hue-offset: 180;
  --color-danger-hue: calc(
    var(--color-base-hue) - var(--color-danger-hue-offset)
  );
  --color-background-dark: hsl(var(--color-base-hue), 100%, 8%);
  --color-background-light: hsl(var(--color-base-hue), 100%, 16%);
  --color-text-light: hsl(var(--color-base-hue), 100%, 87%);

  --color-btn-primary-background: hsl(var(--color-base-hue), 100%, 83%);
  --color-btn-primary-background-dark: hsl(var(--color-base-hue), 100%, 73%);
  --color-btn-primary-text: hsl(var(--color-base-hue), 100%, 20%);
  --color-btn-primary-text-dark: hsl(var(--color-base-hue), 100%, 10%);
  --color-btn-border: black;
  --color-btn-danger-background: hsl(var(--color-danger-hue), 100%, 83%);
  --color-btn-danger-background-dark: hsl(var(--color-danger-hue), 100%, 73%);
  --color-btn-danger-text: black;
  --color-btn-danger-text-dark: black;
}

.fixed-in-btn {
  color: white;
  position: fixed;
  bottom: 10%;
  right: 3%;
  background: #0facf3;
  width: 180px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  border-radius: 3px;
  box-shadow: 4px 4px 4px #0a78aa;
  cursor: pointer;
}

body {
  background: linear-gradient(
    to right,
    var(--color-background-dark),
    var(--color-background-light)
  );
}
</style>
