<script setup>
const props = defineProps({
        race: Object,
    });

    const emit = defineEmits(["loadAnotherRace"]);
</script>

<template>
    <div class="col player-info-box">
        <div>Main Race: {{race.mainRace.name}}  </div>
        <div>Sub race: {{race.name}} </div>
        <div>Aligment: {{race.mainRace.alignment}}  </div>
        <div>Size: {{race.mainRace.size}}  </div>
        <div>Speed: {{race.mainRace.speed}}  </div>
        <div>Languages: {{race.mainRace.languages}}  </div>
        <div>Ability score increase: 
            {{race.abilityScoreIncrease[0].stat}} (+{{race.abilityScoreIncrease[0].scoreBonus}}),
            {{race.abilityScoreIncrease[1].stat}} (+{{race.abilityScoreIncrease[1].scoreBonus}})
        </div>

        <br>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Abilities: </th>
                <th scope="col">Description</th>
                <th scope="col">level requirement</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ability in race.subRacialAbilities" :key="ability.id">
                    <td>{{ ability.name}}</td>
                    <td>{{ ability.description}}</td>
                    <td>{{ ability.levelRequirement}}</td>
                </tr>
            </tbody>
        </table>
        
        <button @click='emit("loadAnotherRace")' class="btn btn-primary">Load race list</button>
                
    </div> 
</template>

<style>
</style>