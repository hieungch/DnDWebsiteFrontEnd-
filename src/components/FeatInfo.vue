<script setup>
const props = defineProps({
        feat: Object,
    });

    const emit = defineEmits(["loadAnotherFeat"]);
</script>

<template>
    <div class="col player-info-box">
        <div>Name: {{feat.featName}} </div>
        <div>Description: {{feat.prerequisite}}  </div>
        <div>Languagues: {{feat.description}}  </div>
        <div class="btn-center">
            <button @click='emit("loadAnotherFeat")' class="btn btn-primary">Load feat list</button>
        </div>
                
    </div> 
</template>

<style>
</style>