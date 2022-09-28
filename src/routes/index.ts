import FirstPage from './FirstPage.vue';
import SecondPage from './SecondPage.vue';

export const routes = [
  { path: '/first', component: FirstPage, props: { msg: 'First Page' } },
  { path: '/second', component: SecondPage, props: { msg: 'Second Page' } },
];
