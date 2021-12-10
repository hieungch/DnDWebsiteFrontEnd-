<script setup>
import { onMounted, reactive,computed } from "vue";
import DiceRoller from "../components/DiceRoller.vue";
import {
  CharacterSheetRepository,BackgroundRepository,
  CharacterClassRepository,
  SubraceRepository,FeatRepository,SpellRepository
} from "../lib/repositories.js"

const props = defineProps({
        id: Number,
    });

var data = reactive({
  charlevel:null, // fetched
  charInpriration:null, // fetched
  characterId: null, // fetched
  backgrounds: [], //fetched
  selectedBackground: null,// fetched
  selectedClass: null,//fetched
  selectedClassSkillProfOne: null, // fetched
  selectedClassSkillProfTwo: null, // fetched
  races :[], //fetched
  selectedRace: null, // fetched
  charClasses: [], //fetched
  characterName: null,//fetched
  strengthScore: null,//fetched
  dexterityScore: null,//fetched
  constitutionScore: null,//fetched
  intelligentScore: null,//fetched
  wisdomScore: null,//fetched
  charismaScore: null,//fetched
  maxHp:null,//fetched
  feats:[],//fetched
  selectedFeats:[], //fetched
  additionalFeat: null,
  spells:[], //fetched
  selectedSpells:[], //fetched
  additionalSpell: null, //fetched
  notes: []
});

// v = virtual
// ? = if its null then is return as null 
// ??= if its null the replace it will the value after it
// computed is a var based on multiple or one variable(s)

const availableFeats = computed(()=>{
  return data.feats.filter((f)=>{

    return data.selectedFeats.find((x)=>{
      return x.id == f.id
    }) === undefined

  })
  
})

const availableSpells = computed(()=>{
  return data.spells.filter((f)=>{

    return data.selectedSpells.find((x)=>{
      return x.id == f.id
    }) === undefined

  })
  
})

const selectedBackgroundSkillProf = computed(()=>{
  return data.selectedBackground?.skillprof??[]
})

const selectedClassAvailableSkillProfOne = computed(()=>{
  return data.selectedClass?.profSkill??[]
})
const selectedClassAvailableSkillProfTwo = computed(()=>{
  // it got the check because ?? since
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
  const player = await CharacterSheetRepository.getById(props.id);
  // console.log("this char info is= ", player);
  data.backgrounds = await BackgroundRepository.getAll();
  data.races = await SubraceRepository.getAll();
  data.charClasses = await CharacterClassRepository.getAll();
  data.feats = await FeatRepository.getAll();
  data.spells = await SpellRepository.getAll();
  //.find will FIND the first one that satisfy that condition
  data.selectedBackground = data.backgrounds.find(bg => player.background.id == bg.id);
  data.characterName = player.name;
  data.strengthScore = player.strength;
  data.dexterityScore = player.dexterity;
  data.constitutionScore = player.constitution;
  data.intelligentScore = player.intelligent;
  data.wisdomScore = player.wisdom;
  data.charismaScore = player.charisma;
  data.maxHp = player.maxHp;
  data.selectedRace = data.races.find(race => player.race.id == race.id);
  data.selectedClass = data.charClasses.find(chosenClass => player.characterClass.id == chosenClass.id );
  data.selectedClassSkillProfOne = data.selectedClass.profSkill.find(chosenClassProfOne => player.skillProficency[0] == chosenClassProfOne.id);
  data.selectedClassSkillProfTwo = data.selectedClass.profSkill.find(chosenClassProftwo => player.skillProficency[1] == chosenClassProftwo.id);
  data.characterId = player.id;
  data.charlevel = player.level;
  data.charInpriration = player.inspiration;
  data.selectedFeats = player.feats;
  data.selectedSpells = player.charSpells;
  data.notes = player.charNotes; 
});



async function saveCharacter(){
  let savingCharacter ={
    id: data.characterId,
    name: data.characterName,
    level: data.charlevel,
    inspiration: data.charInpriration,
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
      // the concat can only do as ... while in a array
      ...data.selectedBackground.skillprof.map(x=> x.id)
    ],
    // map(x=> x.id) and the one below is the same thing
    feats: data.selectedFeats.map((x)=> {
      return x.id;
    }),
    charSpells: data.selectedSpells.map((x)=> {
      return x.id;
    }),
    charNotes: data.notes.map((x)=>{
      return x.id;
    })
    
  };
  try{
    let result = await CharacterSheetRepository.update(savingCharacter);
    console.log("res=", result)
  } catch(err){
    console.error(err);
  }
}

function deleteChosenFeat(index) {
   data.selectedFeats.splice(index, 1);
}

function addNewFeat(){
  data.selectedFeats.push(data.additionalFeat);
}

function deleteChosenSpell(index) {
   data.selectedSpells.splice(index, 1);
}

function addNewSpell(){
  data.selectedSpells.push(data.additionalSpell);
}
</script>

<template>
<h3 style="text-align: center;">Edit character page</h3>
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
  <div class="col-md-12">
    <label for="inputCharisma" class="form-label">Max hp</label>
    <input v-model="data.maxHp" type="number" class="form-control" id="inputHp">
  </div>
  <div class="col-md-4">
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

  <div class="col-md-4">
    <label for="inputState" class="form-label">Race</label>
    <select id="inputState" class="form-select" v-model="data.selectedRace">
        <option selected disabled>Choose a Race</option>
        <option v-for="race in data.races" :key="race.name" :value="race">
            {{ race.name }}
        </option>
    </select>
  </div>
  <!-- @change="showBackgroundSkillProf()" -->
  <div class="col-md-4">
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
  <div class="col-md-6">
    <label for="inputState" class="form-label">
      Feats ||
  
    </label>
    <span class="btn btn-primary" @click="addNewFeat()">Add</span>
    <select id="inputState" class="form-select" v-model="data.additionalFeat" >
      <option selected disabled>Choose a Feat</option>
      <option v-for="feat in availableFeats" :key="feat.featName" :value="feat">
            {{ feat.featName }}
        </option>
    </select>
    
    <div v-for="(chosenFeat,index) in data.selectedFeats" :key="chosenFeat.featName">
        <div>
          {{ chosenFeat.featName }}
        <span class="badge clickable" @click="deleteChosenFeat(index)">Delete</span>
        </div>
    </div>

  </div>

   <div class="col-md-6">
    <label for="inputState" class="form-label">
      Spells ||
  
    </label>
    <span class="btn btn-primary" @click="addNewSpell()">Add</span>
    <select id="inputState" class="form-select" v-model="data.additionalSpell" >
      <option selected disabled>Choose a Spell</option>
      <option v-for="spell in availableSpells" :key="spell.spName" :value="spell">
            {{ spell.spName }}
        </option>
    </select>
    
    <div v-for="(chosenSpell,index) in data.selectedSpells" :key="chosenSpell.spName">
        <div>
          {{ chosenSpell.spName }}
        <span class="badge clickable" @click="deleteChosenSpell(index)">Delete</span>
        </div>
    </div>

    
  </div>
  <div class="col-12">
    <button @click="saveCharacter()" class="btn btn-primary" :disabled="!isFormDataValid">Save character</button>
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
