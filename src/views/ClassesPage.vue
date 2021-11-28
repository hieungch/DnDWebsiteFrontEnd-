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
        <ClassDescription :classRole="data.classStyle" @loadAnotherClass="loadAnotherClass()"/>

        <ClassProficientSkills :classRole="data.classStyle"/>

    </div>

    <div class="row">
        <ClassAbilities :classRole="data.classStyle"/>
    </div>
</div>

<div v-if="!classIsLoaded">
  <div v-for="PickClass in data.classes" :key= "PickClass.id">
    <button @click="selectClass(PickClass)">View class {{PickClass.id}}</button>
  </div>
</div>

</template>

<style>
:root {
  font-size: 20px;
  color: var(--color-text-light);
  --color-base-hue: 200;
  --color-danger-hue-offset: 180;
  --color-danger-hue: calc(var(--color-base-hue) - var(--color-danger-hue-offset));
  --color-background-dark: hsl(var(--color-base-hue), 100%, 8%);
  --color-background-light: hsl(var(--color-base-hue), 100%, 16%);
  --color-text-light: hsl(var(--color-base-hue), 100%, 87%);
}

body {
  background: linear-gradient(
    to right,
    var(--color-background-dark),
    var(--color-background-light)
  );
}
</style>
