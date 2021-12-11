<script setup>
import {reactive,onMounted,ref,computed} from "vue"

import {SpellRepository} from "../lib/repositories.js"
import SpellInfo from "../components/SpellInfo.vue";

var data = reactive({
  spell : {},
  spells : [],
  searchedSpell: null,
});

let spellIsLoaded = ref(false);

const searchedSpellList = computed(()=>{
  let result = [...data.spells??[]]
  if(data.searchedSpell != null){
    result = result.filter((element)=>{
      // toLowerCase change capital to normal letter, 
      // includes check the string in parameter is in the same string
      // if the condition is true, in this case is from includes, the elements that match will show 
      // filter will always return a bollean value
      return element.spName.toLowerCase().includes(data.searchedSpell.toLowerCase())
      // ex: if the user enter st like "ar" on data.searchedSpell
      // then
    })
  }
  return result
})

onMounted( async ()=>{
  if(!spellIsLoaded.value){
    await loadAnotherSpell()
  }
})

function selectSpell(spellData){
  data.spell = spellData;
  spellIsLoaded.value = true;
}

async function loadAnotherSpell(){
  let allSpellData = await SpellRepository.getAll();
    data.spells = allSpellData ;
  spellIsLoaded.value = false;
}

</script>

<template>
<div v-if="spellIsLoaded">
    <SpellInfo :spell="data.spell" @loadAnotherSpell="loadAnotherSpell()"/>
</div>

<div class="row g-3" v-if="!spellIsLoaded">
  <div class="col-12">
      <label class="form-label">Search</label>
      <input v-model="data.searchedSpell" class="form-control" type="text" placeholder="Spells">
  </div>

  <div class=" col-12 box-list content-box-list">
    <div v-for="Spell in searchedSpellList" :key= "Spell.id">
      <button class="btn-list" @click="selectSpell(Spell)">
      {{Spell.spName}}
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
