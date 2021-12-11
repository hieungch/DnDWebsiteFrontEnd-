<script setup>
import {reactive,onMounted,ref,computed} from "vue"
import {SubraceRepository} from "../lib/repositories.js"
import RaceInfo from "../components/RaceInfo.vue";



var data = reactive({
  race : {},
  races : [],
  searchedRace: null,
});

let raceIsLoaded = ref(false);

const searchedRaceList = computed(()=>{
  let result = [...data.races??[]]
  if(data.searchedRace != null){
    result = result.filter((element)=>{
      return element.name.toLowerCase().includes(data.searchedRace.toLowerCase()) 
    })
  }
  return result
})

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

<div class="row g-3" v-if="!raceIsLoaded">
  <div class="col-12">
      <label class="form-label">Search</label>
      <input v-model="data.searchedRace" class="form-control" type="text" placeholder="Enter race name here">
  </div>

  <div class="col-12 box-list content-box-list">
    <div v-for="Race in searchedRaceList" :key= "Race .id">
      <button class="btn-list" @click="selectRace(Race )">{{Race.name}}</button>
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
