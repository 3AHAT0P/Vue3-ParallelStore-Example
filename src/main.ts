import { createApp } from 'vue';

import { parallelStore } from './plugins/ParallelStore';

import './style.css';
import App from './App.vue';
import { router } from './routes/router';

createApp(App).use(router).use(parallelStore).mount('#app');
