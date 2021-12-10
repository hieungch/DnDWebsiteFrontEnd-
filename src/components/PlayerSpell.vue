<script setup>
import {  ref } from "vue";

import {Modal} from "bootstrap";

const props = defineProps({
    player: Object,
});

const spellModal = ref(null);
const spellName = ref("");
const spellLevel = ref("");
const spellSchool = ref("");
const spellCastTime = ref("");
const spellComponent = ref("");
const spellRange = ref("");
const spellDuration = ref("");
const spellDescription = ref("");
const spellDamageType = ref("");
const spellScaling = ref("");

function showSpellInfo(spellInfos){
    spellName.value = spellInfos.spName;
    spellLevel.value = spellInfos.spLevel;
    spellSchool.value = spellInfos.spMagicSchool.magicSchoolName;
    spellCastTime.value = spellInfos.castTime;
    spellComponent.value = spellInfos.spComponent;
    spellRange.value = spellInfos.range;
    spellDuration.value = spellInfos.spDuration;
    spellDescription.value = spellInfos.spDescription;
    spellDamageType.value = spellInfos.damageType;
    spellScaling.value = spellInfos.spScaling;
    let modal = new Modal(spellModal.value);
    modal.toggle()
}
</script>

<template>
    <div class="ability-score-field">
            <h3>Spells</h3>
        <div class="ability-score-box info-table-scroll" >
            <div class=" row skill-box "  
                v-for="spell in player.charSpells" :key="spell.spName">
                   <div>
                       {{ spell.spName }} 
                   </div>
                   
                   <div>
                        <!-- {{ ability.description }} -->
                       <div class="btn btn-primary" 
                            @click="showSpellInfo(spell)"
                            > 
                           More details
                        </div> 
                    </div>
            </div> 

            <div class="modal" ref="spellModal">
                    <div class="modal-dialog">
                        <div class="modal-content modal-box-bg modal-bg-color">
                            <div>
                                Name: {{ spellName }}
                            </div>
                             <div>
                                Spell level: {{spellLevel}}
                             </div>
                             <div>
                                Spell school: {{ spellSchool }} 
                             </div>
                             <div>
                                 Cast time : {{spellCastTime}}
                             </div>
                             <div>
                                Component(s): {{ spellComponent }} 
                             </div>
                             <div>
                               Range: {{ spellRange }} 
                             </div>
                             <div>
                               Spell duration: {{ spellDuration }} 
                             </div>
                             <div>
                               Spell description: {{ spellDescription }} 
                             </div>
                             <div>
                               Spell damage type: {{ spellDamageType }} 
                             </div>
                             <div>
                               Spell scaling: {{ spellScaling }} 
                             </div>
                             
                        </div>
                    </div>
                </div>

        </div>
    </div>
</template>

<style scoped lang="scss">

.modal-bg-color{
    background-color: rgb(7, 7, 95);
}

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