import { Ref } from 'vue';
import { defineStore } from '../plugins/ParallelStore';

interface CounterStoreState {
  counter: Ref<number>;
}

export const useCounterStore = defineStore(
  'CounterStore',
  () => ({ counter: 0 }),
  {
    incrementAction(state: CounterStoreState, value = 1) {
      console.log('!!!!!!!!!!!!!!!', state);
      state.counter.value += value;
      console.log(state.counter.value);
    },
    incrementLaterAction(state: CounterStoreState, value = 1) {
      setTimeout(() => {
        state.counter.value += value;
      }, 1000);
    },
  }
);
