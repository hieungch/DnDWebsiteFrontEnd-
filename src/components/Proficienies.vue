<script setup>
const props = defineProps({
  player: Object,
});
</script>

<template>
    <div class="ability-score-field">
        <h3>Proficiencies</h3>
           <div class="ability-score-box" >  
                Tool (background): {{ player.background.toolprof}}
            </div>
            <div class="ability-score-box" >
                Tool (class): {{player.characterClass.proftools}}
            </div>
            <div class="ability-score-box" >
                Weapon: {{player.characterClass.profWeapon}}
            </div>
            <div class="ability-score-box" >
                Armor: {{player.characterClass.profArmor}}
            </div>
    </div>
</template>

<style scoped lang="scss">

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