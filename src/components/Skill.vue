<script setup>
    const props = defineProps({
        skills: {
            type: Array,
            default() {
                return [];
            },
        },
    });
</script>

<template>
    <div class="skill-field">
        <div class="row skill-box" v-for="skill in skills" :key="skill.skillname">
            <div class="col-1">
                <input type="checkbox"/>
            </div>
            <div class="col">
                {{ skill.skillname }} |->
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