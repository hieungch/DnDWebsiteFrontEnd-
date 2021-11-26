<script setup>
import { ref } from "vue";
import DiceBoard from "./DiceBoard.vue";

// defineProps({
//   msg: String,
//   msg2: String,
// });

const count = ref(0);
const player = {
  id: 2,
  name: "adramaliik",
  level: 1,
  inspiration: 0,
  strength: 20,
  dexterity: 15,
  constitution: 11,
  intelligent: 12,
  wisdom: 13,
  charisma: 8,
  background: 2,
  race: 2,
  characterClass: {
    _id: "619f5c8e488d28fdd03f0611",
    id: 5,
    className: "Divination wizard",
    profArmor: "None",
    profWeapon: "Daggers,darts,slings,quarterstaff,light crossbow",
    proftools: "None",
    profSavingThrow: ["intelligent", "wisdom"],
    hitDiceType: "d6",
    profSkill: [2, 6, 7, 9, 11, 15],
    specialStat: 0,
    ability: [25, 26, 27, 28, 29, 30, 31],
  },
  hp: 10,
  maxHp: 10,
  skillProficency: [1, 2, 3, 4],
  feats: [],
};

const stats = [
  {
    name: "strenth",
    value: player.strength,
  },
  {
    name: "dexterity",
    value: player.dexterity,
  },
  {
    name: "constitution",
    value: player.constitution,
  },
  {
    name: "inteligence",
    value: player.intelligent,
  },
  {
    name: "wisdom",
    value: player.wisdom,
  },
  {
    name: "charisma",
    value: player.charisma,
  },
];

function calculateModifier(score) {
  return Math.floor((score - 10) / 2);
}

const proficiencyBonus = ref(2);

const skills = [
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
    statModifier: "inteligence",
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
    statModifier: "inteligence",
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
    statModifier: "inteligence",
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
    statModifier: "inteligence",
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

function isStatProficient(statName) {
  return statName === "dexterity";
}
</script>

<template>
  <!-- title -->
  <h1>Dnd Project</h1>
  <div class="row">
    <div class="col col-1">
      <DiceBoard :diceType="{ minPoint: 2, maxPoint: 5 }" :quantity="5" />
    </div>
    <div class="col col 10">
      <!-- player name & id-->
      <div class="section player-name">
        {{ player.name }} <span>#{{ player.id }}</span>
      </div>

      <!-- player general info -->
      <div class="section player-general-info">
        <div class="class-adn-lvl">
          class : Lvl {{ player.level }} {{ player.characterClass.className }}
        </div>
        <div class="player-race">race : Human</div>
        <div class="player-background">background : sage</div>
      </div>

      <!-- basic stats -->
      <div class="section basic-stats">
        <div class="stat" v-for="stat in stats" :key="stat.name">
          {{ stat.name }}: {{ stat.value }} ({{
            calculateModifier(stat.value)
          }})
        </div>
      </div>

      <!-- proficiency -->
      <div class="section proficiency">
        <div class="inspiration">Inspiration: 0</div>
        <div class="proficiency-bonus">
          poficiency bonnus: {{ proficiencyBonus }}
        </div>
      </div>

      <!-- saving throw -->
      <div class="section saving-throws">
        <div class="saving-thows-item" v-for="stat in stats" :key="stat.name">
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

      <!-- skills -->
      <div class="section skills">
        <div class="skill" v-for="skill in skills" :key="skill.skillname">
          <div>{{ skill.skillname }}</div>
        </div>
      </div>

      <!-- player status -->
      <div class="section player-status">
        <div class="hp">hp = {{ player.hp }}</div>
        <div class="maxhp">maxhp = {{ player.hp }}</div>
        <div class="hit-dice">hitdice = {{ "todo" }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section {
  margin: 10px 0;
}
</style>
