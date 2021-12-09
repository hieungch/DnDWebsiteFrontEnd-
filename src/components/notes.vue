<script setup>
import { reactive, ref,computed,onMounted } from "vue";
import {CharacterNotesRepository,CharacterSheetRepository} from "../lib/repositories.js"
import {Modal} from "bootstrap";

const props = defineProps({
    player: Object,
    id: Number
});

var data = reactive({
    player:{},
    // notes:[],
    // allNotes:[],
    noteTitle: null,
    noteDescription: null,
});

const isNoteDataValid = computed(()=>{
  return (data.noteTitle != null 
  && data.noteTitle !="" 
  && data.noteDescription != null 
  && data.noteDescription !=""
  )
})

// const emit = defineEmits(["saveNoteToCharacter"]);

const addNoteModal = ref(null);
const noteModal = ref(null);
const noteTitleName = ref("");
const noteInfo = ref("");

// onMounted(async () => {
//   const player = await CharacterSheetRepository.getById(props.id);
//   data.allNotes = await CharacterNotesRepository.getAll();
//   data.notes = data.allNotes.find(characNotes => player.charNotes.id == characNotes.id);
// });

function showCharacterNoteInfo(characterNote){
    noteInfo.value = characterNote.noteDescription;
    noteTitleName.value = characterNote.noteTitle;
    let modal = new Modal(noteModal.value);
    modal.toggle()
}

function addingNewNote(){
    let modal = new Modal(addNoteModal.value);
    modal.toggle()
}

async function createNote(){
  let newNoteData ={
    noteTitle: data.noteTitle,
    noteDescription: data.noteDescription,
  };
  try{
    await CharacterNotesRepository.create(newNoteData);
  } catch(err){
    console.error(err);
  }
}

// async function saveNoteToChar(){
//   let savingNoteToCharacter ={
//     charNotes: array.push(data.notes),
//   };
//   try{
//     let result = await CharacterSheetRepository.update(savingNoteToCharacter);
//     console.log("res=", result)
//   } catch(err){
//     console.error(err);
//   }
// }

async function saveNoteToCharSheet() {
  try{
    let saveNoteToCharacter = {...data.player};
    saveNoteToCharacter.background = data.player.background.id;
    saveNoteToCharacter.race = data.player.race.id;
    saveNoteToCharacter.characterClass = data.player.characterClass.id;
    saveNoteToCharacter.charNotes = array.push(data.player.charNotes.id);
    await CharacterSheetRepository.update(saveNoteToCharacter);
  } catch(err){
    console.error(err);
  }
}
</script>

<template>
    <div class="ability-score-field">
        <h3>Notes</h3>
        <div class="btn-center">
            <div class="btn btn-primary" @click="addingNewNote()" > 
            Add notes
        </div>
        </div>
        <div class="ability-score-box" >
            <div class=" row skill-box "  
                v-for="characterNote in player.charNotes" :key="characterNote.id">
                   <div>
                       {{ characterNote.noteTitle }} 
                   </div>
                
                    <div>
                        <!-- {{ ability.description }} -->
                       <div class="btn btn-primary" 
                            @click="showCharacterNoteInfo(characterNote)"
                            > 
                           More details
                        </div> 
                    </div>
            </div> 

            <div class="modal" ref="noteModal">
                <div class="modal-dialog">
                    <div class="modal-content modal-box-bg">
                        {{ noteTitleName }}: 
                        <div>
                            {{ noteInfo }} 
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal" ref="addNoteModal">
                <div class="modal-dialog">
                    <div class="modal-content modal-box-bg">
                        <label for="title">Note title</label>
                        <input v-model="data.noteTitle" type="text" placeholder="Enter your note title">

                        <label for="title">Note description</label>
                        <textarea v-model="data.noteDescription" name="noteDescription" id="" cols="30" rows="10" placeholder="Enter your note infos"></textarea>

                        <div @click='createNote(); saveNoteToCharSheet();'
                        class="btn btn-primary" type="submit" :disabled="!isNoteDataValid">
                        Add note
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<style scoped lang="scss">

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

h3{
    text-align: center;
}

div{
    color: hsl(var(--color-base-hue), 100%, 87%);
}
</style>