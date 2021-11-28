<script setup>
const props = defineProps({
        classRole: Object,
    });

    console.log("data =",props.classRole.profSkill)
</script>

<template>
<div class="col player-info-box">
                <div >
                    Proficient saving throw: {{ classRole.profSavingThrow[0]}},
                    {{ classRole.profSavingThrow[1]}}
                </div>
                <br>
                <div>
                    Proficient skill: 
                    {{ classRole.profSkill[0].skillname}}, 
                    {{ classRole.profSkill[1].skillname}}, 
                    {{ classRole.profSkill[2].skillname}}, 
                    {{ classRole.profSkill[3].skillname}}, 
                    {{ classRole.profSkill[4].skillname}}, 
                    {{ classRole.profSkill[5].skillname}}
                    
                </div>
            
    </div> 
</template>

<style>
</style>