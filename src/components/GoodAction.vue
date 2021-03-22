<template>
  <div class="">
    <van-goods-action>
      <van-goods-action-icon 
        :icon="isCollect?'star':'star-o'" 
        :text="isCollect? '已收藏':'未收藏'" 
        :color="isCollect?'darkred':'#333'" 
        @click="isCollect=!isCollect"
      />
      <van-goods-action-icon icon="cart-o" text="购物车" color="#333" :badge="cartTotal"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="toCart"/>
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>
 
<script>
import {addToCart} from '@/request/api'
export default {
  name: 'GoodAction',
  props:{
    cartTotal:{
      type:Number,
      default:0
    }
  },
  data () {
    return {
      isCollect:false,


    }
  },
  created(){
    console.log(this.props,this.cartTotal);
  },
  methods:{
    toCart(){
      this.$emit("showSku")
    }
  }
}
</script>
 
<style scoped lang = "less">
 
</style>