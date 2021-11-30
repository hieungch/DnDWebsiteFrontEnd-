<script setup>
import {calculateModifier} from "../lib/dndCalculation.js"

    const props = defineProps({
        player: Object,
    });

const statScore = [
  {
    name: "strength",
    value: props.player.strength,
  },
  {
    name: "dexterity",
    value: props.player.dexterity,
  },
  {
    name: "constitution",
    value: props.player.constitution,
  },
  {
    name: "intelligent",
    value: props.player.intelligent,
  },
  {
    name: "wisdom",
    value: props.player.wisdom,
  },
  {
    name: "charisma",
    value: props.player.charisma,
  },
];
</script>

<template>
        <div class="row ac-move-field">
            <div class=" col ac-move-box">
                <div>
                    AC
                </div>   
                <div>
                    {{10 + calculateModifier(statScore[1].value)}}
                </div>  
            </div>
            <div class=" col ac-move-box">
                <div>
                    Initiative
                </div>
                <div>
                    {{calculateModifier(statScore[1].value)}}
                </div>  
            </div>
            <div class=" col ac-move-box">
                <div>
                    Speed
                </div>   
                <div>
                    30
                </div> 
            </div>
        </div>
</template>

<style scoped lang="scss">
    .ac-move-field{
    border-radius: 25px;
    background-color: #000957;
    margin: 10px;
    padding-bottom: 5px;
    padding-top: 5px;
}

    .ac-move-box{
    border-radius: 25px;
    text-align: center;
    background-color: #344CB7;
    margin: 10px;
}


div{
    color: hsl(var(--color-base-hue), 100%, 87%);
}
</style>