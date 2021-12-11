<script setup>
import {reactive,onMounted,ref,computed} from "vue"
import {FeatRepository} from "../lib/repositories.js"

import FeatInfo from "../components/FeatInfo.vue";

var data = reactive({
  feat : {},
  feats : [],
  searchedFeat: null,
});

let featIsLoaded = ref(false);

const searchedFeatList = computed(()=>{
  let result = [...data.feats??[]]
  if(data.searchedFeat != null){
    result = result.filter((element)=>{
      return element.featName.toLowerCase().includes(data.searchedFeat.toLowerCase())
    })
  }
  return result
})

onMounted( async ()=>{
  if(!featIsLoaded.value){
    await loadAnotherFeat()
  }
})

function selectFeat(featData){
  data.feat = featData;
  featIsLoaded.value = true;
}

async function loadAnotherFeat(){
  let allfeatsData = await FeatRepository.getAll();
    data.feats = allfeatsData ;
  featIsLoaded.value = false;
}

</script>

<template>
<div v-if="featIsLoaded">
    <FeatInfo :feat="data.feat" @loadAnotherFeat="loadAnotherFeat()"/>
</div>

<div class="row g-3" v-if="!featIsLoaded">
  <div class="col-12">
      <label class="form-label">Search</label>
      <input v-model="data.searchedFeat" class="form-control" type="text" placeholder="Feats">
  </div>

  <div class="col-12 box-list content-box-list">
    <div  v-for="feat in searchedFeatList" :key= "feat.id">
      <button class="btn-list" @click="selectFeat(feat)">{{feat.featName}}</button>
    </div>
  </div>
</div>

</template>

<style lang="scss">

body {
  background: linear-gradient(
    to right,
    var(--color-background-dark),
    var(--color-background-light)
  );
}
</style>
