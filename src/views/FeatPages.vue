<script setup>
import {reactive,onMounted,ref} from "vue"
import {FeatRepository} from "../lib/repositories.js"

import FeatInfo from "../components/FeatInfo.vue";



var data = reactive({
  feat : {},
  feats : [],
});

let featIsLoaded = ref(false);

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

<div v-if="!featIsLoaded">
  <div class="box-list content-box-list">
    <div  v-for="feat in data.feats" :key= "feat.id">
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
