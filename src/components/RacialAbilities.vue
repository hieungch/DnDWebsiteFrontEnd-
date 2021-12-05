<script setup>
import {ref} from "vue";
import {Modal} from "bootstrap";

const props = defineProps({
  player: Object,
});

const racialAbilityModal = ref(null);
const racialAbilityName = ref("");
const racialAbilityDescription = ref("");

function showRacialAbilityInfo(racialAbility){
    racialAbilityDescription.value = racialAbility.description;
    racialAbilityName.value = racialAbility.name;
    let modal = new Modal(racialAbilityModal.value);
    modal.toggle()
}

</script>

<template>
   <div class="ability-score-field">
        <h3>Racial abilities</h3>
        <div class="ability-score-box" >
            <div class=" row skill-box "  
                v-for="racialAbility in player.race.subRacialAbilities" :key="racialAbility.name">
                   <div>
                       {{ racialAbility.name }} 
                   </div>
                   
                   <div>
                        <!-- {{ ability.description }} -->
                       <div class="btn btn-primary" 
                            @click="showRacialAbilityInfo(racialAbility)"
                            > 
                           More details
                        </div> 
                    </div>
            </div> 

            <div class="modal" ref="racialAbilityModal">
                    <div class="modal-dialog">
                        <div class="modal-content modal-box-bg">
                            {{ racialAbilityName }}: {{ racialAbilityDescription }} 
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