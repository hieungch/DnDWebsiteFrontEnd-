<script setup>
import {reactive,onMounted,ref,computed} from "vue"
import {CharacterClassRepository} from "../lib/repositories.js"

import ClassDescription from "../components/ClassDescription.vue"
import ClassProficientSkills from "../components/ClassProficientSkills.vue";
import ClassAbilities from "../components/ClassAbilities.vue";

var data = reactive({
  classStyle : {},
  classes : [],
  searchedClass: null,
});

let classIsLoaded = ref(false);

const searchedClassList = computed(()=>{
  let result = [...data.classes??[]]
  if(data.searchedClass != null){
    result = result.filter((element)=>{
      return element.className.toLowerCase().includes(data.searchedClass.toLowerCase())
    })
  }
  return result
})

onMounted( async ()=>{
  if(!classIsLoaded.value){
    await loadAnotherClass()
  }
})

function selectClass(classRole){
  data.classStyle = classRole;
  classIsLoaded.value = true;
}

async function loadAnotherClass(){
  let allClassesData = await CharacterClassRepository.getAll();
    data.classes = allClassesData ;
  classIsLoaded.value = false;
}

</script>

<template>
<div v-if="classIsLoaded">
    <div class="row">
        <ClassDescription :classRole="data.classStyle"/>

        <ClassProficientSkills :classRole="data.classStyle"/>

    </div>

    <div class="row">
        <ClassAbilities :classRole="data.classStyle" @loadAnotherClass="loadAnotherClass()"/>
    </div>
</div>

<div class="row g-3" v-if="!classIsLoaded">

  <div class="col-12">
      <label class="form-label">Search</label>
      <input v-model="data.searchedClass" class="form-control" type="text" placeholder="Character classes">
  </div>

  <div class="col-12 box-list content-box-list">
    <div v-for="PickClass in searchedClassList" :key= "PickClass.id">
      <button class="btn-list" @click="selectClass(PickClass)">{{PickClass.className}}</button>
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
