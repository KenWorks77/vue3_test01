<template>
<div>
  <!-- 親のdataをここで子に渡す :loaded-obj :thanks-name :thanks-price :thanks-amount -->
  <!-- 子からemitしたdataをここで親に渡す @thanks -->
  <router-view :loaded-obj="data.obj" :thanks-name="data.submitName" :thanks-price="data.submitPrice" :thanks-amount="data.submitAmount" @thanks="toThanks"></router-view>
</div>
</template>

<script>
import {defineComponent, reactive, inject} from 'vue';
import Detail from './components/Detail.vue';

export default defineComponent({
  components: Detail,
  setup() {
    const data = reactive({
      // main.jsでloadJsonしてprovideしたobjArrをinjectして取得
      obj: inject('objArr'),
      submitName: '商品名',
      submitPrice: 0,
      submitAmount: 0
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
