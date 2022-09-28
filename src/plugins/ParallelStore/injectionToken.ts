import { InjectionKey } from 'vue';
import { ParallelStoreGlobal } from './@types/ParallelStoreGlobal';

export const parallelStoreInjectionToken: InjectionKey<ParallelStoreGlobal> =
  Symbol('parallelStoreInjectionToken');
