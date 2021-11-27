<script setup>
const props = defineProps({
        player:{
            type: Object,
        },
    });
</script>

<template>
    <div class="section player-status">
        <h2>HP BOX</h2>
        <div class="hp">hp = {{ player.hp }}</div>
        <div class="maxhp">maxhp = {{ player.hp }}</div>
        <div class="hit-dice">hitdice = {{ "todo" }}</div>
    </div>
</template>

<style scoped lang="scss">
</style>