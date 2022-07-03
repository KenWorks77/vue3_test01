<template>
  <div>
    <div id="thanks">
      <h1>ご購入ありがとうございました。</h1>
      <p>以下の内容で注文を承りました。</p>
      <div id="thanks-detail">
        <p>商品名：<span class="bold">{{thanksName}}</span></p>
        <p>価格：{{thanksPrice.toLocaleString()}}円（税込）</p>
        <p>注文個数：{{thanksAmount}}個</p>
        <p>合計：<span class="bold">{{(thanksPrice * thanksAmount).toLocaleString()}}円（税込）</span></p>
      </div>
    </div>
    <p class="back-to-index"><router-link :to="'/'">商品一覧ページに戻る</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'Thanks',
  // html属性ではthanks-name（ケバブケース）、JavaScriptではthanksName（キャメルケース）で記述。htmlは大文字小文字を判別しないため。
  props: ['thanksName', 'thanksPrice', 'thanksAmount']
}
</script>

<style>
#thanks {
  margin: 10vh auto;
  text-align: center;
  width: 70%;
}
#thanks h1 {
  font-weight: bold;
  font-size: 1.5rem;
}
#thanks-detail {
  border: 1px dotted #333;
  border-radius: 5px;
  margin-top: 20px;
  padding: 20px;
}
</style>
