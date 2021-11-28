<script setup>
import {calculateModifier,calculateProficiency} from "../lib/dndCalculation.js"
    const props = defineProps({
        skills: {
            type: Array,
            default() {
                return [];
            },
        },
        player: Object
    });
    function getSkillProfs(){
        const result = [
        // the ... meant to take all the data within player. and but it into a array
            ...props.player.skillProficency,
            ...props.player.background.skillprof
        ];
        // console.log("rs=", result);
        return result;
    }
</script>

<template>
    <div class="skill-field">
        <div class="row skill-box" v-for="skill in skills" :key="skill.skillname">
            <div class="col-1">
                <input type="checkbox"
                :checked="getSkillProfs().includes(skill.id)"
                disabled/>
            </div>
            <div class="col">
                {{ skill.skillname }} ({{skill.statModifier}}) |->
                {{calculateModifier(player[skill.statModifier]) + 
                (getSkillProfs().includes(skill.id) ? calculateProficiency(player.level) : 0) }} 
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .skill-field{
    border-radius: 25px;
    background-color: #000957;
    margin: 10px;
    padding-bottom: 5px;
    padding-top: 5px;
}

    .skill-box{
    border-radius: 25px;
    background-color: #344CB7;
    margin: 10px;
}

    div{
    color: hsl(var(--color-base-hue), 100%, 87%);
    }
</style>