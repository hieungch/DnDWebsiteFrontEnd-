<script setup>
import {  ref } from "vue";

import {Modal} from "bootstrap";

const props = defineProps({
    player: Object,
});

const featModal = ref(null);
const featTitle = ref("");
const featRequirement = ref("");
const featDescription = ref("");

function showFeatInfo(featInfos){
    featDescription.value = featInfos.description;
    featTitle.value = featInfos.featName;
    featRequirement.value = featInfos.prerequisite;
    let modal = new Modal(featModal.value);
    modal.toggle()
}
</script>

<template>
    <div class="ability-score-field">
            <h3>Feats</h3>
        <div class="ability-score-box" >
            <div class=" row skill-box "  
                v-for="feat in player.feats" :key="feat.featName">
                   <div>
                       {{ feat.featName }} 
                   </div>
                   
                   <div>
                        <!-- {{ ability.description }} -->
                       <div class="btn btn-primary" 
                            @click="showFeatInfo(feat)"
                            > 
                           More details
                        </div> 
                    </div>
            </div> 

            <div class="modal" ref="featModal">
                    <div class="modal-dialog">
                        <div class="modal-content modal-box-bg">
                            <div>
                                Name: {{ featTitle }}
                            </div>
                             <div>
                                Prerequisite: {{featRequirement}}
                             </div>
                             <div>
                                Description: {{ featDescription }} 
                             </div>
                        </div>
                    </div>
                </div>

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