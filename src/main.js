import { createApp } from 'vue';
import { router } from './router';
import axios from 'axios';
import App from './App.vue';

// loadJson
document.getElementById('loading').classList.remove('d-none');
const request = 'products.json';
axios.get(request, {
  responseType: 'json'
}).then((res) => {
  const products = res.data;
  const objArr = [];
  Object.keys(products).forEach((key) => {
    objArr.push(products[key]);
  });
  document.getElementById('loading').classList.add('d-none');
  document.getElementById('target').classList.remove('d-none');
  // ここでloadしたjsonをobjArrとしてprovideし、子componentでinjectし取得させる
  createApp(App).use(router).provide('objArr', objArr).mount('#target')
}).catch((error) => {
  console.log(error);
});
