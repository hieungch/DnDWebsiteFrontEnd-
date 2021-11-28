<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Home from "./views/Home.vue"
import NavigationBar from "./components/NavigationBar.vue";
</script>

<template>
  <div class="container-fluid">
    <NavigationBar />
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  background-color: azure;
}
</style>
