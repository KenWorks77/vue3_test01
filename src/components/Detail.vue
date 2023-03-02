<template>
  <div>
<!--<p>商品ID:{{$route.params.productId}}のページです。</p>-->
    <div v-for="(product, index) in data.products" :key="index">
      <h2>{{product.subTitle}}</h2>
      <div class="p-group">
        <div class="box" v-for="detail in product.details" :key="detail.id" :class="[
          {'cat01' : detail.category === '分類01'},
          {'cat02' : detail.category === '分類02'},
          {'cat03' : detail.category === '分類03'},
          {'cat04' : detail.category === '分類04'}
        ]">
          <ul>
            <li class="category"><span>■</span>{{detail.category}}</li>
            <li class="photo"><img :src="'./img/' + detail.photo" :alt="detail.name"></li>
            <li class="name">{{detail.name}}</li>
            <li class="price">価格：{{detail.price.toLocaleString()}}円（税込）</li>
            <li>
              <form id="select_amount">
                個数：<select id="amount" v-model="data.thisAmount">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </form>
            </li>
            <!--<li class="btn"><router-link :to="'/details/' + detail.id"><button>購入する</button></router-link></li>-->
            <li class="btn"><button @click="confirm(detail.name, detail.price)">購入価格を確認する</button></li>
          </ul>
          <ul>
            <li class="text_detail">{{detail.text_detail}}</li>
            <li class="text_rating">{{detail.text_rating}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div id="confirm_window">
      <p>{{data.thisName}}</p>
      <p>{{data.thisPrice.toLocaleString()}}円（税込）× {{data.thisAmount}}個</p>
      <p><span class="bold">合計{{totalAmount.toLocaleString()}}円（税込）</span></p>
      <p>以上の内容で購入しますか。</p>
      <p class="btn"><router-link :to="'/thanks/'"><button @click="submitForm">購入する</button></router-link></p>
      <p><a href="javascript:;" @click="closeWindow">購入しない</a></p>
    </div>
    <div id="gray_panel"></div>
    <p class="back-to-index"><router-link :to="'/'">商品一覧ページに戻る</router-link></p>
  </div>
</template>

<script>
import {defineComponent, reactive, onMounted, onUpdated, computed} from 'vue';
// vue-routerのparams取得 useRoute()
import {useRoute} from 'vue-router';

export default defineComponent({
  name: 'Detail',
  props: ['loadedObj'],
  setup(props, context) {
    const obj = props.loadedObj;
    console.log('[Detail]obj now loaded', obj);
    const data = reactive({
      products: [],
      thisName: '商品名',
      thisAmount: 1,
      thisPrice: 0,
      scrollYposition: 0,
      // vue-routerのparams取得 useRoute() / <templrete>内の$routeと同じ役割
      id: useRoute().params.productId
    });
    onMounted(() => {
      showDetail(data.id);
    });
    onUpdated(() => {
      const updatedId = useRoute().params.productId;
      if (updatedId !== data.id) {
        data.id = updatedId;
        showDetail(updatedId);
      }
    });
    // showDetail
    const showDetail = (id) => {
      const loadingEnd = () => {
        document.getElementById('loading').classList.add('d-none');
        document.getElementById('target').classList.remove('d-none');
      }
      document.getElementById('loading').classList.remove('d-none');
      document.getElementById('target').classList.add('d-none');
      console.log('[Detail] obj length >>> ', obj.length);
      // idは正常に渡ってる
      if (id) {
        var searchedObj = [];
        obj.forEach((objArr) => {
          // ブラウザ直接読み込み時のみobjが入らない（obj.length = 0）
          // 必ずprops >>> loadJson >>> data.products = searchedObjの順に処理される
          // 本来はloadJson >>> props >>> data.products = searchedObjが正しい
          console.log('objArr >>>', objArr);
          let renewed = {};
          let detailsArr = [];
          objArr.details.forEach((detail) => {
            detailsArr.push(detail);
          });
          let result = detailsArr.filter((target) => {
            if (target.id === id) {
              return true;
            }
          });
          if (result.length != 0) {
            renewed = {'subTitle': objArr.subTitle, 'details': result};
            searchedObj.push(renewed);
          }
          renewed = {}; 
          detailsArr = [];
        });
        data.products = searchedObj;
        setTimeout(loadingEnd, 300);
        console.log('products []', searchedObj);
      };
    };
    // confirm
    const confirm = (name, price) => {
      data.thisName = name;
      data.thisPrice = price;
      data.scrollYposition = window.scrollY;
      document.getElementById('confirm_window').style.display = 'flex';
      document.getElementById('gray_panel').style.display = 'block';
      document.getElementById('wrap').classList.add('fixed');
      document.getElementById('wrap').style.top = '-' + data.scrollYposition + 'px';
    };
    // submitForm
    const submitForm = () => {
      const loadingEnd = () => {
        document.getElementById('loading').classList.add('d-none');
        document.getElementById('target').classList.remove('d-none');
      }
      document.getElementById('loading').classList.remove('d-none');
      document.getElementById('target').classList.add('d-none');

      context.emit('thanks', data.thisName, data.thisPrice, data.thisAmount);
      document.getElementById('confirm_window').style.display = 'none';
      document.getElementById('gray_panel').style.display = 'none';
      document.getElementById('wrap').classList.remove('fixed');

      setTimeout(loadingEnd, 300);
    };
    // closeWindow
    const closeWindow = () => {
      document.getElementById('confirm_window').style.display = 'none';
      document.getElementById('gray_panel').style.display = 'none';
      document.getElementById('wrap').classList.remove('fixed');
      window.scrollTo(0, data.scrollYposition);
    };
    // totalAmount
    const totalAmount = computed(() => {
      return data.thisPrice * data.thisAmount;
    });

    return {
      data,
      confirm,
      submitForm,
      closeWindow,
      totalAmount
    };
  }
});
</script>

<style>
div.box {
  display: flex;
  width: 100%!important;
  margin: 0 0 10px 0!important;
}
div.box ul:first-child {
  width: 25%;
}
div.box ul:last-child {
  margin-left: 10px;
  padding-top: 25px;
  width: 75%;
}
div.box ul li.text_detail {
  border-bottom: 1px solid #666;
  padding: 0 0 10px 0;
}
div.box ul li.text_rating {
  padding: 15px 0 0 0;
}
.back-to-index {
  text-align: right;
}
form#select_amount {
  justify-content: center!important;
  padding-bottom: 10px;
}

#confirm_window {
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  display: none;
  flex-direction: column;
  justify-content: center;
  left: 57vw;
  margin: -25vh 0 0 -28vw;
  overflow: auto;
  position: fixed;
  width: 40vw;
  z-index: 2;
  height: 30vh;
  top: 57vh;
}
#confirm_window p:first-child {
  font-size: 1.15rem;
  font-weight: bold;
}
#confirm_window p.btn {
  padding: 10px 0;
  width: 50%;
}
#gray_panel {
  background: #000;
  display: none;
  height: 100%;
  left: 0;
  opacity: 0.5;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}
.fixed {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
}

@media screen and (max-width: 640px){
  div.box {
    display: block!important;
  }
  div.box ul:first-child {
    width: 100%;
  }
  div.box ul:last-child {
    margin-left: 0;
    padding-top: 0;
    width: 100%;
  }
  #confirm_window {
    top: 50vh;
    height: 50vh;
    left: 40vw;
    width: 78vw;
  }
}
</style>
