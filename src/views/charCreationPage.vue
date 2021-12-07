<script setup>
import { onMounted, reactive,computed } from "vue";
import DiceRoller from "../components/DiceRoller.vue";
import {CharacterSheetRepository,BackgroundRepository,CharacterClassRepository,SubraceRepository} from "../lib/repositories.js"

var data = reactive({
  backgrounds : [],
  selectedBackground: null,
  selectedClass: null,
  selectedClassSkillProfOne: null,
  selectedClassSkillProfTwo: null,
  races :[],
  selectedRace: null,
  charClasses: [],
  characterName: null,
  strengthScore: null,
  dexterityScore: null,
  constitutionScore: null,
  intelligentScore: null,
  wisdomScore: null,
  charismaScore: null,
  maxHp:null,
});
// v = virtual
// ? = if its null then is return as null 
// ??= if its null the replace it will the value after it
// computed is a var based on multiple or one variable(s)

const selectedBackgroundSkillProf = computed(()=>{
  return data.selectedBackground?.skillprof??[]
})

const selectedSubRaceScorebonus = computed(()=>{
  return data.selectedRace?.abilityScoreIncrease??[]
})


const selectedClassAvailableSkillProfOne = computed(()=>{
  return data.selectedClass?.profSkill??[]
})
const selectedClassAvailableSkillProfTwo = computed(()=>{
  const skillProf = data.selectedClass?.profSkill??[];
  // return with the condition that the id of the second prof is not the same as the first
  return skillProf.filter(x => x.id != data.selectedClassSkillProfOne?.id)
})

const isFormDataValid = computed(()=>{
  return (data.characterName != null 
      && data.characterName != "" 
      && data.strengthScore !=null 
      && data.strengthScore >=6
      && data.strengthScore <=20
      && data.dexterityScore !=null 
      && data.dexterityScore >=6
      && data.dexterityScore <=20
      && data.constitutionScore !=null 
      && data.constitutionScore >=6
      && data.constitutionScore <=20
      && data.intelligentScore !=null 
      && data.intelligentScore >=6
      && data.intelligentScore <=20
      && data.wisdomScore !=null 
      && data.wisdomScore >=6
      && data.wisdomScore <=20
      && data.charismaScore !=null 
      && data.charismaScore >=6
      && data.charismaScore <=20
      && data.maxHp !=null 
      && data.maxHp >=2
      && data.selectedBackground !=null
      && data.selectedClass !=null
      && data.selectedRace !=null
      && data.selectedClassSkillProfOne !=null
      && data.selectedClassSkillProfOne !=null     
      )
})

onMounted(async () => {
  data.backgrounds = await BackgroundRepository.getAll();
  data.races = await SubraceRepository.getAll();
  data.charClasses = await CharacterClassRepository.getAll();
});



async function createCharacter(){
  let newChardata ={
    name: data.characterName,
    level: 1,
    inspiration: 0,
    strength: data.strengthScore,
    dexterity: data.dexterityScore,
    constitution: data.constitutionScore,
    intelligent: data.intelligentScore,
    wisdom: data.wisdomScore,
    charisma: data.charismaScore,
    background: data.selectedBackground.id,
    race: data.selectedRace.id,
    characterClass: data.selectedClass.id,
    maxHp: data.maxHp,
    hp: data.maxHp,
    skillProficency: [
      data.selectedClassSkillProfOne.id,
      data.selectedClassSkillProfTwo.id,
      // to "unwind"/concatenate the array below use "..."
      ...data.selectedBackground.skillprof.map(x=> x.id)
    ],
    feats: [],
    charNotes: [],
  };
  try{
    await CharacterSheetRepository.create(newChardata);
  } catch(err){
    console.error(err);
  }
}

// function showBackgroundSkillProf(){
//   console.log("selected bg is= ",data.selectedBackground);
//   console.log("v= ",v);
// }

</script>

<template>
<h3 style="text-align: center;">Character creation page</h3>
<DiceRoller ref="child" />
<form class="row g-3">
    
  <div class="col-12">
    <label for="inputAddress" class="form-label">Name</label>
    <input v-model="data.characterName" type="text" class="form-control" id="inputName" placeholder="Enter your character name">
  </div>
  <div class="col-md-2">
    <label for="inputStrength" class="form-label">Strength</label>
    <input v-model="data.strengthScore" type="number" class="form-control" id="inputStrength">
  </div>
  <div class="col-md-2">
    <label for="inputDexterity" class="form-label">Dexterity</label>
    <input v-model="data.dexterityScore" type="number" class="form-control" id="inputDexterity">
  </div>
  <div class="col-md-2">
    <label for="inputConstitution" class="form-label">Constitution</label>
    <input v-model="data.constitutionScore" type="number" class="form-control" id="inputConstitution">
  </div>
  <div class="col-md-2">
    <label for="inputIntelligent" class="form-label">Intelligent</label>
    <input v-model="data.intelligentScore" type="number" class="form-control" id="inputIntelligent">
  </div>
  <div class="col-md-2">
    <label for="inputWisdom" class="form-label">Wisdom</label>
    <input v-model="data.wisdomScore" type="number" class="form-control" id="inputWisdom">
  </div>
  <div class="col-md-2">
    <label for="inputCharisma" class="form-label">Charisma</label>
    <input v-model="data.charismaScore" type="number" class="form-control" id="inputCharisma">
  </div>
  <div class="col-md-3">
    <label for="inputCharisma" class="form-label">Max hp</label>
    <input v-model="data.maxHp" type="number" class="form-control" id="inputHp">
  </div>
  <div class="col-md-3">
    <label for="inputState" class="form-label">Class</label>
    <select id="inputState" class="form-select" v-model="data.selectedClass" >
        <option selected disabled>Choose a Class</option>
        <option v-for="charClass in data.charClasses" :key="charClass.className" :value="charClass">
            {{ charClass.className }}
        </option>
        
    </select>

    <select id="inputState" class="form-select" v-model="data.selectedClassSkillProfOne">
        <option selected disabled>Choose the first proficient skill</option>
        <option v-for="classSkillProfOne in selectedClassAvailableSkillProfOne" :key="classSkillProfOne.skillname" :value="classSkillProfOne">
            {{ classSkillProfOne.skillname }}
        </option> 
    </select>

    <select v-if="data.selectedClassSkillProfOne != null" id="inputState" class="form-select" v-model="data.selectedClassSkillProfTwo">
        <option selected disabled>Choose the second proficient skill</option>
        <option v-for="classSkillProfTwo in selectedClassAvailableSkillProfTwo" :key="classSkillProfTwo.skillname" :value="classSkillProfTwo">
            {{ classSkillProfTwo.skillname }}
        </option> 
    </select>
  </div>

  <div class="col-md-3">
    <label for="inputState" class="form-label">Race</label>
    <select id="inputState" class="form-select" v-model="data.selectedRace">
        <option selected disabled>Choose a Race</option>
        <option v-for="race in data.races" :key="race.name" :value="race">
            {{ race.name }}
        </option>
    </select>

    <div v-for="raceScorebonus in selectedSubRaceScorebonus" :key="raceScorebonus.skillname">
          {{ raceScorebonus.stat }} |-> {{ raceScorebonus.scoreBonus }}
      </div>
  </div>
  <!-- @change="showBackgroundSkillProf()" -->
  <div class="col-md-3">
    <label for="inputState" class="form-label">Background</label>
    <select id="inputState" class="form-select" v-model="data.selectedBackground" >
      <option selected disabled>Choose a Background</option>
      <option v-for="background in data.backgrounds" :key="background.name" :value="background">
            {{ background.name }}
        </option>
    </select>

      <div v-for="bgSkillProf in selectedBackgroundSkillProf" :key="bgSkillProf.skillname">
          {{ bgSkillProf.skillname }}
      </div>
    
  </div>
  <div class="col-12">
    <button @click="createCharacter()" type="submit" class="btn btn-primary" :disabled="!isFormDataValid">Create Character</button>
    <router-link class="btn btn-primary" to="/">Cancel</router-link>
    
  </div>
</form>
</template>

<style>


.test-align{
    text-align: center;
}

.teset-c1{
    background-color: purple;
}

.teset-c2{
    background-color: grey;
}

body {
  background: linear-gradient(
    to right,
    var(--color-background-dark),
    var(--color-background-light)
  );
}
</style>
