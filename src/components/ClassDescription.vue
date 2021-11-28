<script setup>
const props = defineProps({
        classRole: Object,
    });

const emit = defineEmits(["loadAnotherClass"]);
</script>

<template>
    <div class="col player-info-box">
        <div>
            Class: {{ classRole.className}}
        </div>
        <div >
            Proficient armor: {{ classRole.profArmor}}
        </div>
        <div>
            Proficient weapon: {{ classRole.profWeapon}}
        </div>
        <div>
            Proficient tools: {{ classRole.proftools}}
        </div>
        <div>
            Dice type: {{ classRole.hitDiceType}}
        </div>
        <div>
            special stat: {{ classRole.specialStat.specialStatName}}
        </div>
        <button @click='emit("loadAnotherClass")' class="btn btn-primary">Load classlist</button>
    </div>   

</template>

<style>

</style>