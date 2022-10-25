<script setup>
import { ref } from 'vue';
import { useWorkerRef } from '../plugins/ParallelStore';
import { useCounterStore } from '../store/counter';

defineProps({
  msg: String,
});

const count = useWorkerRef('count', 0);

const counterStore = useCounterStore();
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <span
      >count is <strong>{{ count }}</strong></span
    >
    <br />
    <button type="button" @click="count++">Update ref by increment</button>
    <br />
    <br />

    <span
      >counterStore.counter is <strong>{{ counterStore.counter }}</strong></span
    >
    <br />
    <button type="button" @click="counterStore.counter++">
      Update ref by increment
    </button>
    <button type="button" @click="counterStore.incrementAction()">
      Update by action
    </button>
    <button type="button" @click="counterStore.incrementLaterAction(11)">
      Update by async action (after 1 sec)
    </button>
    <p>
      Edit
      <code>components/SecondPage.vue</code> to test HMR
    </p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
strong {
  color: red;
}
</style>
