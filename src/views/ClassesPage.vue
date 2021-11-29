<script setup>
import {reactive,onMounted,ref} from "vue"
import {CharacterClassRepository} from "../lib/repositories.js"

import ClassDescription from "../components/ClassDescription.vue"
import ClassProficientSkills from "../components/ClassProficientSkills.vue";
import ClassAbilities from "../components/ClassAbilities.vue";

var data = reactive({
  classStyle : {},
  classes : [],
});

let classIsLoaded = ref(false);

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

<div v-if="!classIsLoaded">

  <div class="box-list content-box-list">
    <div v-for="PickClass in data.classes" :key= "PickClass.id">
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
