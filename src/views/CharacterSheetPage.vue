<script setup>
import {reactive,onMounted,ref} from "vue"
import {CharacterSheetRepository} from "../lib/repositories.js"

// import CharacterSheet from "../mock/characterSheet.json";
import Skill from "../components/Skill.vue";
import PlayerInfo from "../components/PlayerInfo.vue";
import AbilityScores from "../components/AbilityScores.vue";
import SavingThrow from "../components/SavingThrow.vue";
import HpBox from "../components/HpBox.vue"
import AcInitMove from "../components/AcInitMove.vue";
import Abilities from "../components/Abilities.vue";
import Feats from "../components/feats.vue";
import Inventory from "../components/Inventory.vue";
import Proficienies from "../components/Proficienies.vue";

var data = reactive({
  player : {},
  sheets : [],
});

let playerIsLoaded = ref(false);


const skillArray = [
  {
    _id: "619dffba488d28fdd03ee5b6",
    id: 1,
    skillname: "Acrobatic",
    statModifier: "dexterity",
  },
  {
    _id: "619e0283488d28fdd03ee6a2",
    id: 2,
    skillname: "Animal Handling",
    statModifier: "wisdom",
  },
  {
    _id: "619e0283488d28fdd03ee6a5",
    id: 3,
    skillname: "Arcana",
    statModifier: "wisdom",
  },
  {
    _id: "619e0283488d28fdd03ee6a8",
    id: 4,
    skillname: "Athletic",
    statModifier: "strength",
  },
  {
    _id: "619e0283488d28fdd03ee6ab",
    id: 5,
    skillname: "Deception",
    statModifier: "charisma",
  },
  {
    _id: "619e0283488d28fdd03ee6ae",
    id: 6,
    skillname: "History",
    statModifier: "intelligent",
  },
  {
    _id: "619e0283488d28fdd03ee6b1",
    id: 7,
    skillname: "Insight",
    statModifier: "wisdom",
  },
  {
    _id: "619e0283488d28fdd03ee6b4",
    id: 8,
    skillname: "Intimidation",
    statModifier: "charisma",
  },
  {
    _id: "619e0283488d28fdd03ee6b7",
    id: 9,
    skillname: "Intvestigation",
    statModifier: "intelligent",
  },
  {
    _id: "619e0283488d28fdd03ee6ba",
    id: 10,
    skillname: "Medicine",
    statModifier: "wisdom",
  },
  {
    _id: "619e0283488d28fdd03ee6bd",
    id: 11,
    skillname: "Nature",
    statModifier: "intelligent",
  },
  {
    _id: "619e0283488d28fdd03ee6c0",
    id: 12,
    skillname: "Perception",
    statModifier: "wisdom",
  },
  {
    _id: "619e0283488d28fdd03ee6c3",
    id: 13,
    skillname: "Performance",
    statModifier: "charisma",
  },
  {
    _id: "619e0283488d28fdd03ee6c6",
    id: 14,
    skillname: "Persuasion",
    statModifier: "charisma",
  },
  {
    _id: "619e0283488d28fdd03ee6c9",
    id: 15,
    skillname: "Religion",
    statModifier: "intelligent",
  },
  {
    _id: "619e0283488d28fdd03ee6cc",
    id: 16,
    skillname: "Sleight of hand",
    statModifier: "dexterity",
  },
  {
    _id: "619e0283488d28fdd03ee6cf",
    id: 17,
    skillname: "Stealth",
    statModifier: "dexterity",
  },
  {
    _id: "619e0283488d28fdd03ee6d2",
    id: 18,
    skillname: "Survival",
    statModifier: "wisdom",
  },
];

const dices = [
  {
    _id: "619e0aed488d28fdd03ee853",
    diceName: "d0",
    nbFace: 0,
    maxFacepoint: 0,
    minFacepoint: 0,
  },
  {
    _id: "619e0aed488d28fdd03ee856",
    diceName: "d4",
    nbFace: 4,
    maxFacepoint: 4,
    minFacepoint: 1,
  },
  {
    _id: "619e0aed488d28fdd03ee859",
    diceName: "d6",
    nbFace: 6,
    maxFacepoint: 6,
    minFacepoint: 1,
  },
  {
    _id: "619e0aed488d28fdd03ee85c",
    diceName: "d8",
    nbFace: 8,
    maxFacepoint: 8,
    minFacepoint: 1,
  },
  {
    _id: "619e0aed488d28fdd03ee85f",
    diceName: "d10",
    nbFace: 10,
    maxFacepoint: 10,
    minFacepoint: 1,
  },
  {
    _id: "619e0aed488d28fdd03ee862",
    diceName: "d12",
    nbFace: 12,
    maxFacepoint: 12,
    minFacepoint: 1,
  },
  {
    _id: "619e0aed488d28fdd03ee865",
    diceName: "d20",
    nbFace: 20,
    maxFacepoint: 20,
    minFacepoint: 1,
  },
  {
    _id: "619e0aed488d28fdd03ee868",
    diceName: "d100",
    nbFace: 100,
    maxFacepoint: 100,
    minFacepoint: 1,
  },
];

onMounted( async ()=>{
  // let sheetData = await CharacterSheetRepository.getById(3);
  // console.log("data=",sheetData);
  // data.player = sheetData;
  // playerIsLoaded.value = true;
  if(!playerIsLoaded.value){
    await loadAnotherChar()
  }
})

function selectCharacter(character){
  data.player = character;
  playerIsLoaded.value = true;
}

async function loadAnotherChar(){
  let allSheetData = await CharacterSheetRepository.getAll();
    data.sheets = allSheetData;
  playerIsLoaded.value = false;
}

function lvUp(){
  data.player.level ++;
}
</script>

<template>
<div v-if="playerIsLoaded">
    <div class="row">
       <!-- when the event levelupevent is emitted from player info component, run the function lvUp-->
      <PlayerInfo :player="data.player" @loadAnotherChar="loadAnotherChar()" @levelUpEvent="lvUp()"/>
    </div>
    <div class="row">
      <div class="col-3">
      <AbilityScores :player ="data.player"/>
      <SavingThrow :player ="data.player"/>
      </div>

      <div class="col-3">
      <Skill :player="data.player" :skills="skillArray" />
      <!--<Skill is meant for component-->
      <!--skills meant the reqired prop from skill comp  -->
      <!-- skillArray meant the variable in the script section-->
      </div>

      <div class="col-3">
      <AcInitMove/>
      <HpBox :player ="data.player"/>
      </div>

      <div class="col-3">
      <Abilities/>
      <Feats/>
      <Inventory/>
      <Proficienies/>
      </div>
    </div>

    <div class="fixed-in-btn">
      <p>Dice roller</p>
    </div>
</div>

<div v-if="!playerIsLoaded">
  <div class="box-list content-box-list">
    <div v-for="character in data.sheets" :key= "character.id">
      <button class="btn-list" @click="selectCharacter(character)">View character {{character.name}}</button>
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
  --color-danger-hue: calc(var(--color-base-hue) - var(--color-danger-hue-offset));
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


.fixed-in-btn{
    color: white;
    position: fixed;
    bottom: 10%;
    right: 3%;
    background: #0FACF3;
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
