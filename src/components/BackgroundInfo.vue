<script setup>
const props = defineProps({
        background: Object,
    });

    const emit = defineEmits(["loadAnotherBackground"]);
</script>

<template>
    <div class="col player-info-box">
        <div>Name: {{background.name}} </div>
        <div>Description: {{background.description}}  </div>
        <div>Languagues: {{background.languages}}  </div>
        <div>Equipment: {{background.equipment}}  </div>
        <div>Tool proficiency: {{background.toolprof}}  </div>
        <div>
            Skill proficiency: {{background.skillprof[0].skillname}}, {{background.skillprof[1].skillname}}
        </div>
        <div class="btn-center">
            <button @click='emit("loadAnotherBackground")' class="btn btn-primary">Load background list</button>
         </div>       
    </div> 
</template>

<style>
</style>