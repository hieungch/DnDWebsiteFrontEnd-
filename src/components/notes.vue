<script setup>
import { reactive, ref,computed,onMounted } from "vue";
import {CharacterNotesRepository,CharacterSheetRepository} from "../lib/repositories.js"
import {Modal} from "bootstrap";

const props = defineProps({
    player: Object
});

var data = reactive({
    thisPlayer:{},
    notes:[],
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

const addNoteModal = ref(null);
const noteModal = ref(null);
const noteTitleName = ref("");
const noteInfo = ref("");

onMounted(async () => {
  data.thisPlayer = await CharacterSheetRepository.getById(props.player.id);
//   console.log("this player is ", data.thisPlayer)
});

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
    data.notes = await CharacterNotesRepository.getAll();
    let latestNote = data.notes[data.notes.length-1];
    // console.log("this note list has",data.notes)
    // console.log("this last note has",latestNote)

    let saveNoteToChar = {...data.thisPlayer};
    console.log("this player is ",saveNoteToChar);
    saveNoteToChar.background = data.thisPlayer.background.id;
    saveNoteToChar.race = data.thisPlayer.race.id;
    saveNoteToChar.characterClass = data.thisPlayer.characterClass.id;
    saveNoteToChar.feats = data.thisPlayer.feats.map((x)=> {
      return x.id;
    }),
    saveNoteToChar.charSpells = data.thisPlayer.charSpells.map((x)=> {
      return x.id;
    });
    saveNoteToChar.charNotes[saveNoteToChar.charNotes.length-1] = data.thisPlayer.charNotes.push(latestNote.id)
    // console.log("this note has id", latestNote.id)
    await CharacterSheetRepository.update(saveNoteToChar);
  } catch(err){
    console.error(err);
  };

};
</script>

<template>
    <div class="ability-score-field">
        <h3>Notes</h3>
        <div class="btn-center">
            <div class="btn btn-primary" @click="addingNewNote()" > 
            Add notes
        </div>
        </div>
        <div class="ability-score-box info-table-scroll" >
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
                    <div class="modal-content modal-box-bg modal-bg-color">
                        Note Title: {{ noteTitleName }}
                        <div>
                        Description:    {{ noteInfo }} 
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal" ref="addNoteModal">
                <div class="modal-dialog">
                    <div class="modal-content modal-box-bg modal-bg-color">
                        <label for="title">Note title</label>
                        <input v-model="data.noteTitle" type="text" placeholder="Enter your note title">

                        <label for="title">Note description</label>
                        <textarea v-model="data.noteDescription" name="noteDescription" id="" cols="30" rows="10" placeholder="Enter your note infos"></textarea>

                        <div @click="createNote(); "
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
.modal-bg-color{
    background-color: rgb(7, 7, 95);
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

h3{
    text-align: center;
}

div{
    color: hsl(var(--color-base-hue), 100%, 87%);
}
</style>