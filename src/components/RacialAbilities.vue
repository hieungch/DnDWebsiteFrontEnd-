<script setup>
import {ref} from "vue";
import {Modal} from "bootstrap";

const props = defineProps({
  player: Object,
});


</script>

<template>
   <div class="ability-score-field">
        <h3>Racial abilities</h3>
        <div class="ability-score-box" >
            <div class=" row skill-box "  
                v-for="ability in player.characterClass.ability" :key="ability.name">
                   {{ ability.name }}        
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