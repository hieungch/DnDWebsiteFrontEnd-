<script setup>
import { onMounted, ref, reactive } from "vue";
import { getRndInteger } from "../lib/dndCalculation.js";
import { DiceTypeRepository } from "../lib/repositories.js";

const data = reactive({
  dices: [],
  results: [],
  quantity: 1,
  modifier: 0,
});

// seleted Dice mean the chosen dice, by default is the first die
// ?? if it doesnt exist then the value is null
const selectedDice = ref(data.dices[0] ?? null);

onMounted(async () => {
  data.dices = await DiceTypeRepository.getAll();
});

function quantityUp() {
  data.quantity++;
}

function quantityDown() {
  data.quantity--;
  if (data.quantity < 1) {
    data.quantity = 1;
  }
}

function modifierUp() {
  data.modifier++;
}

function modifierDown() {
  data.modifier--;
  if (data.modifier < 0) {
    data.modifier = 0;
  }
}

function removeResultItem(index) {
  // array [1,2,3,4] in relation to index 0 ,1 ,2 ,3
  // splice will delete based on index, the number in this case 1, will dictate how many will be deleted
  data.results.splice(index, 1);
}

function calculTotal() {
  // reduce, 
  return data.results.reduce((a, b) => a + b.value + b.mod, 0);
}

function rollDice() {
  if (selectedDice.value != null) {
    // hoamny quanity dictated will be the number of time the function will roll
    for (let i = 0; i < data.quantity; i++) {
      data.results.push({
        value: getRndInteger(
          selectedDice.value.minFacepoint,
          selectedDice.value.maxFacepoint
        ),
        mod: data.modifier,
      });
    }
  }
}
</script>

<template>
  <div
    class="fixed-in-btn"
    data-bs-toggle="modal"
    data-bs-target="#diceRollerModal"
  >
    <p>Dice roller</p>
  </div>
  <div class="modal" tabindex="-1" id="diceRollerModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- header -->
        <div class="modal-header">
          <h5 class="modal-title">Dice roller</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <!-- body -->
        <div class="modal-body">
          <ul class="list-group">
            <li
              v-for="(item, index) in data.results"
              :key="'res' + index"
              class="
                list-group-item list-group-item-primary
                d-flex
                justify-content-between
                align-items-start
              "
            >
              {{ item.value + " +" + item.mod }}
              <span
                class="badge bg-secondary clickable"
                @click="removeResultItem(index)"
                >x</span
              >
            </li>
          </ul>
          <p>total = {{ calculTotal() }}</p>
        </div>

        <!-- footer -->
        <div class="modal-footer container">
          <div class="container">
            <div class="row">
              <!-- v-model two way data-binding -->
              <select class="col" v-model="selectedDice">
                <option
                  v-for="dice in data.dices"
                  :key="dice.diceName"
                  :value="dice"
                >
                  {{ dice.diceName }}
                </option>
              </select>
            </div>

            <div class="row align-items-center justify-content-between">
              <div class="col-4">
                <div
                  class="row align-items-center justify-content-center"
                  style="height: 100%"
                >
                  <div class="col-6">
                    <span class="badge bg-primary"
                      >Qty : {{ data.quantity }}</span
                    >
                  </div>
                  <div class="col-6">
                    <div
                      class="row align-items-center justify-content-center"
                      style="margin: 1px"
                    >
                      <span
                        class="badge bg-secondary clickable"
                        @click="quantityUp()"
                        >+</span
                      >
                    </div>
                    <div
                      class="row align-items-center justify-content-center"
                      style="margin: 1px"
                    >
                      <span
                        class="badge bg-secondary clickable"
                        @click="quantityDown()"
                        >-</span
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div
                  class="row align-items-center justify-content-center"
                  style="height: 100%"
                >
                  <div class="col-6">
                    <span class="badge bg-primary"
                      >Mod : {{ data.modifier }}</span
                    >
                  </div>
                  <div class="col-6">
                    <div
                      class="row align-items-center justify-content-center"
                      style="margin: 1px"
                    >
                      <span
                        class="badge bg-secondary clickable"
                        @click="modifierUp()"
                        >+</span
                      >
                    </div>
                    <div
                      class="row align-items-center justify-content-center"
                      style="margin: 1px"
                    >
                      <span
                        class="badge bg-secondary clickable"
                        @click="modifierDown()"
                        >-</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row justify-content-end">
              <button
                type="button"
                class="btn btn-primary col-3"
                @click="rollDice()"
              >
                Roll
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.clickable {
  cursor: pointer;
}

.row {
  margin: 10px 0px;
}
</style>
