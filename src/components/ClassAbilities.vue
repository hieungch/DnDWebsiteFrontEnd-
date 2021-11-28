<script setup>
const props = defineProps({
        classRole: Object,
    });

    // console.log("data ability =",props.classRole.ability)
</script>

<template>
    <div class="col player-info-box">
        <table class="table">
            <thead>
                <tr>
                <th scope="col">Abilities: </th>
                <th scope="col">Description</th>
                <th scope="col">level requirement</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ability in classRole.ability" :key="ability.id">
                    <td>{{ ability.name}}</td>
                    <td>{{ ability.description}}</td>
                    <td>{{ ability.levelRequirement}}</td>
                </tr>
            
                
            </tbody>
        </table>
        
                
    </div> 
</template>

<style>
</style>