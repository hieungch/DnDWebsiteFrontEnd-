<script setup>
import { onMounted, reactive } from "vue";
import { AbilityRepository } from "../lib/repositories.js";
const props = defineProps({
  player: Object,
});

const data = reactive({
  abilities: [],
});

onMounted(async () => {
  data.abilities = await AbilityRepository.getAll();
});
// player.level === data.abilities.levelRequirement
// v-if="player.level === player.characterClass.ability.levelRequirement"
//  <div style="overflow:scroll; height:400px;">
// Get the modal

</script>

<template>
    <div class="ability-score-field">
        <h3>Abilities</h3>
        
            <div class="ability-score-box" >
                <div class="row skill-box "  
                v-for="abilities in player.characterClass.ability" :key="abilities.name">
                   <div v-if="player.level >= abilities.levelRequirement">
                       {{ abilities.name }} 
                       <!-- {{ abilities.description }} -->
                       <span class="btn btn-primary" 
                            data-bs-toggle="modal"
                            data-bs-target="#infoTable"> 
                           More details
                        </span> 
            
                        <div class="modal" id="infoTable">
                            <div class="modal-dialog">
                                <div class="modal-content modal-box-bg">
                                   {{ abilities.name }}: {{ abilities.description }}
                                </div>
                            </div>
                        </div>
                           
                   </div>
                </div>
            </div>
    </div>
</template>

<style scoped lang="scss">

.modal-box-bg{
    background-color: #000957;
    color: white;
    padding: 10px;
}

h3{
    text-align: center;
}

.ability-score-field{
    border-radius: 25px;
    background-color: #000957;
    margin: 10px;
    padding-bottom: 5px;
    padding-top: 5px;
}

.ability-score-box{
    border-radius: 25px;
    background-color: #344CB7;
    margin: 10px;
    padding-left: 10%;
}


div{
    color: hsl(var(--color-base-hue), 100%, 87%);
}

</style>