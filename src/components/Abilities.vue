<script setup>
import {ref} from "vue";
import {Modal} from "bootstrap";

const props = defineProps({
  player: Object,
});

const abilityModal = ref(null);
const abilityName = ref("");
const abilityDescription = ref("");

function showAbilityInfo(ability){
    abilityDescription.value = ability.description;
    abilityName.value = ability.name;
    let modal = new Modal(abilityModal.value);
    modal.toggle()
}
</script>

<template>
    <div class="ability-score-field">
        <h3>Abilities</h3>
        
        <!-- things that behind ":" like :key="" will turn the "" from string to statment -->
            <div class="ability-score-box info-table-scroll" >
                <div class=" row skill-box "  
                v-for="ability in player.characterClass.ability" :key="ability.name">
                   <div v-if="player.level >= ability.levelRequirement">
                    <div>
                        {{ ability.name }} 
                    </div>
                    
                    <div>
                       <div class="btn btn-primary" 
                            @click="showAbilityInfo(ability)"
                            > 
                           More details
                        </div> 
                    </div>
                           
                   </div>
                    
                </div>

                <div class="modal" ref="abilityModal">
                    <div class="modal-dialog">
                        <div class="modal-content modal-box-bg">
                            {{ abilityName }}: {{ abilityDescription }} 
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