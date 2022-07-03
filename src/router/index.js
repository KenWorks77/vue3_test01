import { createRouter, createWebHashHistory } from 'vue-router';
// import { createRouter, createWebHistory } from "vue-router"; // これ設定するとroot直下のパスになる
import Default from '../components/Default.vue';
import Detail from '../components/Detail.vue';
import Thanks from '../components/Thanks.vue';

const routes = [
  {
    path: '/',
    component: Default
  },
  {
    path: '/details/:productId', // ここで'productId'を定義。Detail componentに渡している
    component: Detail
  },
  {
    path: '/thanks/',
    component: Thanks
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
//  history: createWebHistory(), // これ設定するとroot直下のパスになる
  routes
});
