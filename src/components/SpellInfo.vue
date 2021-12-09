<script setup>
const props = defineProps({
        spell: Object,
    });

    const emit = defineEmits(["loadAnotherSpell"]);
</script>

<template>
    <div class="col player-info-box">
        <div>Name: {{spell.spName}} </div>
        <div>Spell level: {{spell.spLevel.spellLevel}} </div>
        <div>Spell school: {{spell.spMagicSchool.magicSchoolName}}  </div>
        <div>Cast time: {{spell.castTime}}   </div>
        <div>Component(s):  {{spell.spComponent}}  </div>
        <div>Range: {{spell.range}}  </div>
        <div>Spell duration: {{spell.spDuration}}  </div>
        <div>Spell description: {{spell.spDescription}}  </div>
        <div>Spell damage type: {{spell.damageType}}  </div>
        <div>Spell scaling: {{spell.spScaling}} </div>
    
        <div class="btn-center">
            <button @click='emit("loadAnotherSpell")' class="btn btn-primary">Load Spell list</button>
         </div>       
    </div> 
</template>

<style>

</style>