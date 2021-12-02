<script setup>
import { onMounted, reactive } from "vue";
import DiceRoller from "../components/DiceRoller.vue";
import {BackgroundRepository,CharacterClassRepository,SubraceRepository} from "../lib/repositories.js"

var data = reactive({
  backgrounds : [],
  races :[],
  charClasses: [],
});

onMounted(async () => {
  data.backgrounds = await BackgroundRepository.getAll();
  data.races = await SubraceRepository.getAll();
  data.charClasses = await CharacterClassRepository.getAll();
});

</script>

<template>
<h3 style="text-align: center;">Character creation page</h3>
<DiceRoller ref="child" />
<form class="row g-3" action="POST">
    
  <div class="col-12">
    <label for="inputAddress" class="form-label">Name</label>
    <input type="text" class="form-control" id="inputName" placeholder="Enter your character name">
  </div>
  <div class="col-md-2">
    <label for="inputStrength" class="form-label">Strength</label>
    <input type="number" class="form-control" id="inputStrength">
  </div>
  <div class="col-md-2">
    <label for="inputDexterity" class="form-label">Dexterity</label>
    <input type="number" class="form-control" id="inputDexterity">
  </div>
  <div class="col-md-2">
    <label for="inputConstitution" class="form-label">Constitution</label>
    <input type="number" class="form-control" id="inputConstitution">
  </div>
  <div class="col-md-2">
    <label for="inputIntelligent" class="form-label">Intelligent</label>
    <input type="number" class="form-control" id="inputIntelligent">
  </div>
  <div class="col-md-2">
    <label for="inputWisdom" class="form-label">Wisdom</label>
    <input type="number" class="form-control" id="inputWisdom">
  </div>
  <div class="col-md-2">
    <label for="inputCharisma" class="form-label">Charisma</label>
    <input type="number" class="form-control" id="inputCharisma">
  </div>
  <div class="col-md-4">
    <label for="inputState" class="form-label">Class</label>
    <select id="inputState" class="form-select">
        <option selected>Choose a Class</option>
        <option v-for="charClass in data.charClasses" :key="charClass.className">
            {{ charClass.className }}
        </option>
    </select>
  </div>
  <div class="col-md-4">
    <label for="inputState" class="form-label">Race</label>
    <select id="inputState" class="form-select">
        <option selected>Choose a Race</option>
        <option v-for="race in data.races" :key="race.name">
            {{ race.name }}
        </option>
    </select>
  </div>
  <div class="col-md-4">
    <label for="inputState" class="form-label">Background</label>
    <select id="inputState" class="form-select">
      <option selected>Choose a Background</option>
      <option v-for="background in data.backgrounds" :key="background.name">
            {{ background.name }}
        </option>
    </select>
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Create Character</button>
    <router-link class="btn btn-primary" to="/">Cancel</router-link>
    
  </div>
</form>
</template>

<style>


.test-align{
    text-align: center;
}

.teset-c1{
    background-color: purple;
}

.teset-c2{
    background-color: grey;
}

body {
  background: linear-gradient(
    to right,
    var(--color-background-dark),
    var(--color-background-light)
  );
}
</style>
