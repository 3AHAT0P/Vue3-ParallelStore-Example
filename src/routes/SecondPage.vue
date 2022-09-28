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
    <span>count is {{ count }}</span>
    <br />
    <button type="button" @click="count++">Update ref by increment</button>
    <br />
    <br />

    <span>counterStore.counter is {{ counterStore.counter }}</span>
    <br />
    <button type="button" @click="counterStore.counter++">
      Update ref by increment
    </button>
    <button type="button" @click="counterStore.incrementAction()">
      update by action
    </button>
    <button type="button" @click="counterStore.incrementLaterAction(11)">
      update by async action (after 1 sec)
    </button>
    <p>
      Edit
      <code>components/SecondPage.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
