<script setup>
import {reactive,onMounted,ref} from "vue"

import {SpellRepository} from "../lib/repositories.js"
import SpellInfo from "../components/SpellInfo.vue";

var data = reactive({
  spell : {},
  spells : [],
});

let spellIsLoaded = ref(false);

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

<div v-if="!spellIsLoaded">
  
  <div class="box-list content-box-list">
    <div v-for="Spell in data.spells" :key= "Spell.id">
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
