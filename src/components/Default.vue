<template>
  <div v-cloak>
    <form>
      <div>
        <select id="cat" v-model="data.catSelected">
          <option value="すべて表示">すべて表示</option>
          <option value="分類01">分類01</option>
          <option value="分類02">分類02</option>
          <option value="分類03">分類03</option>
          <option value="分類04">分類04</option>
        </select>
        <select id="sort" v-model="data.sortSelected">
          <option value="商品名の順">商品名の順</option>
          <option value="価格が高い順">価格が高い順</option>
          <option value="価格が低い順">価格が低い順</option>
        </select>
        <button id="btn_search" type="button" @click="searchList">検索する</button>
      </div>
      <div id="text_radio">
        <input type="radio" name="text-radio" id="text_detail" value="text_detail" checked="checked" v-model="data.radioValue"><label for="text_detail">商品詳細</label>
        <input type="radio" name="text-radio" id="text_rating" value="text_rating" v-model="data.radioValue"><label
        for="text_rating">口コミ</label>
      </div>
    </form>
    <div v-for="(product, index) in data.products" :key="index">
      <h2>{{product.subTitle}}</h2>
      <div class="p-group">
        <ul class="box" v-for="detail in product.details" :key="detail.id" :class="[
          {'cat01' : detail.category === '分類01'},
          {'cat02' : detail.category === '分類02'},
          {'cat03' : detail.category === '分類03'},
          {'cat04' : detail.category === '分類04'}
        ]">
          <li class="category"><span>■</span>{{detail.category}}</li>
          <li class="photo"><img :src="'./img/' + detail.photo" :alt="detail.name"></li>
          <li class="name">{{detail.name}}</li>
          <li class="price">価格：{{detail.price.toLocaleString()}}円（税込）</li>
          <li class="btn"><router-link :to="'/details/' + detail.id"><button>詳細を見る</button></router-link></li>
          <li class="text_detail" :class="{'d-none' : data.radioValue !== 'text_detail'}">{{omittedText(detail.text_detail)}}</li>
          <li class="text_rating" :class="{'d-none' : data.radioValue !== 'text_rating'}">{{omittedText(detail.text_rating)}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, reactive, onMounted} from 'vue';

export default defineComponent({
  name: 'Default',
  props: ['loadedObj'],
  setup(props) {
    const obj = props.loadedObj;
    console.log('[Default]obj now loaded', obj);
    const data = reactive({
      products: [],
      radioValue: 'text_detail',
      catSelected: 'すべて表示',
      sortSelected: '商品名の順'
    });
    // load
    onMounted(() => {
      const loadingEnd = () => {
        document.getElementById('loading').classList.add('d-none');
        document.getElementById('target').classList.remove('d-none');
      }
      document.getElementById('loading').classList.remove('d-none');
      document.getElementById('target').classList.add('d-none');
      showInfo(obj, 'load');
      setTimeout(loadingEnd, 300);
    });
    // searchList
    const searchList = () => {
      let catSel = data.catSelected;
      let sortSel = data.sortSelected;
      if (catSel || sortSel) {
        showInfo(obj, 'search', catSel, sortSel);
      }
    };
    // showInfo
    const showInfo = (obj, timing, catSel, sortSel) => {
      console.log('[Default] obj length >>> ', obj.length);
      if (catSel) {
        var searchedObj = [];
        obj.forEach((objArr) => {
          console.log('objArr >>>', objArr);
          let renewed = {};
          let detailsArr = [];
          let result;
          objArr.details.forEach((detail) => {
            detailsArr.push(detail);
          });
          // search
          if (timing === 'search') {
            result = detailsArr.filter((target) => {
              if (catSel === 'すべて表示') {
                return true;
              } else {
                return target.category == catSel;
              }
            });
            if (sortSel === '価格が高い順') {
              result.sort((a, b) => {
                return b.price - a.price;
              });
            }
            if (sortSel === '価格が低い順') {
              result.sort((a, b) => {
                return a.price - b.price;
              });
            }
          };
          renewed = {'subTitle': objArr.subTitle, 'details': result};
          searchedObj.push(renewed);
          renewed = {}; 
          detailsArr = [];
        });
        obj = searchedObj;
      }
      data.products = obj;
    };
    // omittedText
    const omittedText = (text) => {
      return text.length > 40 ? text.slice(0, 40) + '...' : text;
    };

    return {
      data,
      searchList,
      omittedText
    };
  }
})
</script>

<style>
select {margin-right: 5px;}
.btn button {
  background-color: #878787;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  padding: 10px 10px 8px 10px;
  text-align: center;
  width: 100%;
}
.btn button {
  color: #fff;
  text-decoration: none;
}
</style>
