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
    <div class="section skills">
        <div class="skill" v-for="skill in skills" :key="skill.skillname">
          <div>{{ skill.skillname }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    div{
        color: orange;
    }
</style>