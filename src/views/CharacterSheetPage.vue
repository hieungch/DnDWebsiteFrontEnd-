<script setup>
import { reactive, onMounted, ref,computed } from "vue";
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
import Notes from "../components/notes.vue";
import Proficienies from "../components/Proficienies.vue";
import RacialAbilities from "../components/RacialAbilities.vue";
import PlayerSpell from "../components/PlayerSpell.vue"

var data = reactive({
  player: {},
  sheets: [],
  searchedCharacter: null,
});

let playerIsLoaded = ref(false);

const searchedCharacterList = computed(()=>{
  let result = [...data.sheets??[]]
  if(data.searchedCharacter != null){
    result = result.filter((element)=>{
      return element.name.toLowerCase().includes(data.searchedCharacter.toLowerCase())
    })
  }
  return result
})

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
    savingCharacter.feats = data.player.feats.map((x)=> {
      return x.id;
    }),
    savingCharacter.charSpells = data.player.charSpells.map((x)=> {
      return x.id;
    });
    savingCharacter.charNotes = data.player.charNotes.map((x)=> {
      return x.id;
    });
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
        <Feats :player="data.player"/>
      </div>

      <div class="col-3">
        <Skill :player="data.player" />
      </div>

      <div class="col-3">
        <AcInitMove :player="data.player" />
        <!-- $event is -->
        <HpBox :player="data.player" @damagingHpEvent="damaging($event)" @healingHpEvent="healing($event)" />
        <!-- @saveNoteToCharEvent="updateCharacter()" -->
        <Notes :player="data.player"/>
      </div>

      <div class="col-3">
        <Abilities :player="data.player" />
        <RacialAbilities :player="data.player"/>
        <PlayerSpell :player="data.player"/>
      </div>
    </div>
  </div>

  <div class="row g-3" v-if="!playerIsLoaded">
    <div class="col-12">
      <label class="form-label">Search</label>
      <input v-model="data.searchedCharacter" class="form-control" type="text" placeholder="Feats">
    </div>

    <div class="col-12 box-list content-box-list">
      <div v-for="character in searchedCharacterList" :key="character.id">
        <button class="btn-list" @click="selectCharacter(character)">
          {{ character.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<style>


body {
  background: linear-gradient(
    to right,
    var(--color-background-dark),
    var(--color-background-light)
  );
}
</style>
