<script setup>
import {reactive,onMounted,ref} from "vue"
import {SubraceRepository} from "../lib/repositories.js"
import RaceInfo from "../components/RaceInfo.vue";



var data = reactive({
  race : {},
  races : [],
});

let raceIsLoaded = ref(false);

onMounted( async ()=>{
  if(!raceIsLoaded.value){
    await loadAnotherRace()
  }
})

function selectRace(raceData){
  data.race = raceData;
  raceIsLoaded.value = true;
}

async function loadAnotherRace(){
  let allracesData = await SubraceRepository.getAll();
    data.races = allracesData;
  raceIsLoaded.value = false;
}

</script>

<template>
<div v-if="raceIsLoaded">
    <RaceInfo :race="data.race" @loadAnotherRace="loadAnotherRace()"/>
</div>

<div v-if="!raceIsLoaded">
  <div v-for="Race in data.races" :key= "Race .id">
    <button @click="selectRace(Race )">View races {{Race .id}}</button>
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
