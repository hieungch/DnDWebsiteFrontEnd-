<script setup>
const props = defineProps({
        player:{
            type: Object,
        },
    });
const emit = defineEmits(["damagingHpEvent","healingHpEvent",]);
</script>

<template>
    <div class="row HP-field">
        <div class="col HP-box">
                <div>
                    Hit dices
                </div>   
                <div>
                    {{ player.level }}
                </div>  
        </div>
        <div class="col HP-box">
                <div>
                    Dice type
                </div>   
                <div>
                    {{player.characterClass.hitDiceType}}
                </div>  
        </div>
    </div>
    <div class="HP-field">
        <div class="row">
            <div class="col HP-dice">
                <div>
                    Current Hp
                </div>   
                <div>
                 {{ player.hp }}
                </div>  
            </div>
        <div class="col HP-dice">
                <div>
                    Max Hp
                </div>   
                <div>
                   {{ player.maxHp }} 
                </div>  
            </div>
        </div>
        <div class="row">
            <div class="col HP-dice input-field"> 
                <input style="text-align: center;" type="number" id="modHp">   
            </div>
        </div>
        <div class="row">
            <div class="col HP-dice-red">
                <button @click='emit("damagingHpEvent")' class="btn btn-damage">Damage</button> 
            </div>
            <div class="col HP-dice-green">
                <button @click='emit("healingHpEvent")' class="btn btn-damage">Heal</button> 
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

.bg-red{
    background-color: red;
}

.bg-green{
    background-color: green;
}

.btn-damage{
    color: white;
}

.input-field {
    padding: 5px;
}
.HP-field{
    border-radius: 25px;
    background-color: #000957;
    margin: 10px;
    padding:10px;
}

.HP-box{
    border-radius: 25px;
    background-color: #344CB7;
    margin: 5px;
    text-align: center;
}

.HP-dice{
    border-radius: 25px;
    background-color: #344CB7;
    margin: 10px;
    text-align: center;
}

.HP-dice-red{
    border-radius: 25px;
    background-color: #d11212;
    margin: 10px;
    text-align: center;
}

.HP-dice-green{
    border-radius: 25px;
    background-color: #13db1d;
    margin: 10px;
    text-align: center;
}

.test-bg-1{
  background-color:purple;
}

.test-bg-2{
  background-color: black;
}

.test-bg-3{
  background-color: rgb(226, 58, 176);
}

.test-bg-4{
  background-color: rgb(172, 168, 170);
}


div{
    color: hsl(var(--color-base-hue), 100%, 87%);
}
</style>