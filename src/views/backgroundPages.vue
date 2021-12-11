<script setup>
import {reactive,onMounted,ref,computed} from "vue"
import {BackgroundRepository} from "../lib/repositories.js"
import BackgroundInfo from "../components/BackgroundInfo.vue";



var data = reactive({
  background : {},
  backgrounds : [],
  searchedBackground: null,
});

let backgroundIsLoaded = ref(false);

const searchedBackgroundList = computed(()=>{
  let result = [...data.backgrounds??[]]
  if(data.searchedBackground != null){
    result = result.filter((element)=>{
      return element.name.toLowerCase().includes(data.searchedBackground.toLowerCase())
    })
  }
  return result
})

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

<div class="row g-3" v-if="!backgroundIsLoaded">

  <div class="col-12">
      <label class="form-label">Search</label>
      <input v-model="data.searchedBackground" class="form-control" type="text" placeholder="Backgrounds">
  </div>
  
  <div class="col-12 box-list content-box-list">
    <div v-for="Background in searchedBackgroundList" :key= "Background .id">
      <button class="btn-list" @click="selectBackground(Background )">
       {{Background.name}}'s background
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
