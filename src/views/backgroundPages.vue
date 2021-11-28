<script setup>
import {reactive,onMounted,ref} from "vue"
import {BackgroundRepository} from "../lib/repositories.js"
import BackgroundInfo from "../components/BackgroundInfo.vue";



var data = reactive({
  background : {},
  backgrounds : [],
});

let backgroundIsLoaded = ref(false);

onMounted( async ()=>{
  if(!backgroundIsLoaded.value){
    await loadAnotherBackground()
  }
})

function selectBackground(backgroundData){
  data.background = backgroundData;
  backgroundIsLoaded.value = true;
}

async function loadAnotherBackground(){
  let allbackgroundsData = await BackgroundRepository.getAll();
    data.backgrounds = allbackgroundsData ;
  backgroundIsLoaded.value = false;
}

</script>

<template>
<div v-if="backgroundIsLoaded">
    <BackgroundInfo :background="data.background" @loadAnotherBackground="loadAnotherBackground()"/>
</div>

<div v-if="!backgroundIsLoaded">
  <div v-for="Background in data.backgrounds" :key= "Background .id">
    <button @click="selectBackground(Background )">View Backgounds {{Background .id}}</button>
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
