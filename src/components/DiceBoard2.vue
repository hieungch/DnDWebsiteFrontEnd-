<script setup>
import { onMounted, reactive } from "vue";

const props = defineProps({
  diceType: {
    type: Object,
    default() {
      return { minPoint: 1, maxPoint: 6 };
    },
  },
  quantity: Number,
});

let results = reactive([]);

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function roolDice(diceType, quantity) {
  results.length = 0;
  for (let i = 0; i < quantity; i++) {
    results.push(getRndInteger(diceType.minPoint, diceType.maxPoint));
  }
}

onMounted(() => {
  roolDice(props.diceType, props.quantity);
});
</script>

<template>
  <div class="dice-board">
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Roll Dice
    </button>

    <!-- Modal -->
    <div
      class="modal"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
