<template>
<div>
  <!-- 親のdataをここで子に渡す :loaded-obj :thanks-name :thanks-price :thanks-amount -->
  <!-- 子からemitしたdataをここで親に渡す @thanks -->
  <router-view :loaded-obj="data.obj" :thanks-name="data.submitName" :thanks-price="data.submitPrice" :thanks-amount="data.submitAmount" @thanks="toThanks"></router-view>
</div>
</template>

<script>
import {defineComponent, reactive} from 'vue';
import axios from 'axios';
import Detail from './components/Detail.vue';

export default defineComponent({
  components: Detail,
  setup() {
    const data = reactive({
      obj: [],
      submitName: '商品名',
      submitPrice: 0,
      submitAmount: 0
    });
    // loadJson
    const request = 'products.json';
    axios.get(request, {
      responseType: 'json'
    }).then((res) => {
      const products = res.data;
      Object.keys(products).forEach((key) => {
        data.obj.push(products[key]);
      });
      console.log('loadJson done');
    }).catch((error) => {
      console.log(error);
    });
    // toThanks
    const toThanks = (name, price, amount) => {
      data.submitName = name;
      data.submitPrice = price;
      data.submitAmount = amount;
    };

    return {
      data,
      toThanks
    };
  }
})
</script>

<style>
</style>
