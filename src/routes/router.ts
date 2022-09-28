import { createRouter, createWebHashHistory, RouteRecord } from 'vue-router';

import { routes } from './index';

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
