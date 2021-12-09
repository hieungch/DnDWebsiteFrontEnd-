<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import NavigationBar from "./components/NavigationBar.vue";
</script>

<template>
  <div class="container-fluid">
    <NavigationBar />
    <router-view/>
  </div>
</template>

<style lang="scss">
:root {
  font-size: 20px;
  color: var(--color-text-light);
  --color-base-hue: 200;
  --color-background-dark: hsl(var(--color-base-hue), 100%, 8%);
  --color-background-light: hsl(var(--color-base-hue), 100%, 16%);
  --color-text-light: hsl(var(--color-base-hue), 100%, 87%);
}


th,td{
    color: hsl(var(--color-base-hue), 100%, 87%);
}

.box-list{
  background-color: #2E4C6D;
}

.content-box-list{
  border-radius: 25px ;
  text-align: center;
}

.btn-list{
  border-radius: 25px ;
  margin: 10px;
  background-color: #577BC1;
  color: white;
  padding: 10px;
}

.btn-center{
  text-align: center;
}


button:hover{
  background-color: #2b18d6;
  transition: 0.5s;
  
}

input[type=checkbox][disabled]{
        outline:2px solid white;
    }

    input[type=checkbox]:checked {
    outline:3px solid #EBE645; 
    }
    
.clickable {
  cursor: pointer;
} 
</style>
