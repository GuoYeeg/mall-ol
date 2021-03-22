<template>
  <div class="detail">

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in gallery" :key="item.id">
        <img :src="item.img_url" alt="" width="100%" style="display:block">
      </van-swipe-item>

    </van-swipe>
    <Tips />
    <div class="info">
      <div class="name">{{info.name}}</div>
      <div class="goods_brief">{{info.goods_brief}}</div>
      <div class="retail_price">{{info.retail_price | RMBformat}}</div>
    </div>
    <van-cell title="选择规格" is-link  @click="isSkuShow=!isSkuShow"/>
    <div class="attribute">
      <h3 class="title">商品详情</h3>
      <ul>
        <li v-for="(item,key) in attribute" :key="key">
          <div class="l">{{item.name}}</div>
          <div class="r van-ellipsis">{{item.value}}</div>
        </li>
      </ul>
    </div>
    <div v-html="goods_desc" class="goods_desc"></div>
    <div class="detail_title">
      <div class="title_line"></div>
      <span>常见问题</span>
    </div>
    <div class="answer">
      <div class="answer_item" v-for="item in issue" :key="item.id">
        <h3 class="anser_problem">{{item.question}}</h3>
        <span class="anser_problem_val">{{item.answer}}</span>
      </div>
    </div>
    <div class="detail_title">
      <div class="title_line"></div>
      <span>大家都在看</span>
    </div>

    <Products class="products" :goodsList="relatedList"/>
    <van-sku
      v-model="isSkuShow"
      ref="sku"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :hide-stock="sku.hide_stock"

    />
    <GoodAction @showSku="gotoCart" class="detail_action" 
    :isSku="isSkuShow" 
    :cartTotal="cartTotal"
    />

  </div>
</template>
 
<script>
import {getGoodDetailList,getRelatedGoodList,getGoodsCount,addToCart} from '../request/api'
import Tips from '../components/Tips'
import GoodAction from '../components/GoodAction'
import Products from '../components/Products'

export default {
  name: 'ProductDetail',
  data () {
    return {
      isSkuShow:false,
      sku:{
        tree:[],
        stock_num:'',
        price:''
      },
      goods:{
        picture:''
      },
      goodsId:'',
      // -----------
      id:this.$route.query.id,
      gallery:[],
      info:{},
      attribute:[],
      goods_desc:'',
      relatedList:[],
      issue:[],
      cartTotal:3
    }
  },
  created() {


    getGoodDetailList({
      id:this.id
    })
    .then(res=>{
      console.log(res);
      let {gallery,info,attribute,issue,productList}=res.data
      this.gallery=gallery
      this.info=info
      this.attribute=attribute
      this.goods_desc=info.goods_desc
      this.issue=issue
      this.productList=productList
      //sku
      this.goods.picture=this.info.list_pic_url
      this.sku.stock_num=this.info.goods_number
      this.sku.price=this.info.retail_price
    })

    getRelatedGoodList({
      id:this.id,
    })
    .then(res=>{
      console.log('相关',res);
      this.relatedList=res.data.goodsList
    })

    getGoodsCount().then((res)=>{
      if(res.errno!=0){
        this.cartTotal=res.data.cartTotal.goodsCount
        console.log(this.cartTotal);
      }
    })
  },
  methods: {
    onClickIcon() {
      Toast('点击图标');
    },
    onClickButton() {
      Toast('点击按钮');
    },
    gotoCart(){
      if(this.isSkuShow){
        var goodid=this.info.id
        var proid=this.productList[0].goods_id
        var num=this.$refs.sku.getSkuData().selectedNum
        // console.log(goodid,proid,num);
        addToCart({
          goodsId:goodid,
          productId:proid,
          number:num
        }).then(res=>{
          //1.更新购物车数量
          //2.跳转到购物车界面 
          if(res.errno==0){
            this.cartTotal=res.data.cartTotal.goodsCount
            this.$toast.success("加入购物车成功")
            setTimeout(()=>{
              this.$router.push("/cart")

            },1000)
          } else{
            this.$toast.fail(res.errmsg)
          }

          console.log(res);
        })
      } else{
        this.isSkuShow=!this.isSkuShow
      }
    }
  },
  components:{
    Tips,
    GoodAction,
    Products,
  }
}
</script>
 
<style scoped lang = "less">
 .info{
   text-align: center;
   line-height: .4rem;
   padding: 0.1rem 0;
   background-color: #fff;
   border-bottom: .03rem solid #cfcbcb;
   .name{
     font-size: .2rem;
   }
   .retail_price{
     color: darkred;
   }
 }
 .attribute{
    margin-top: .2rem;
    padding: .1rem .15rem;
    background-color: #fff;
    color: black;
   .title{
     font-size: .17rem;
     margin-bottom: .1rem;
   }
   li{
     display: flex;
     background-color: #cfcbcb;
     line-height: .2rem;
     padding: .1rem 0;
     border-radius: .05rem;
     margin-bottom: .1rem;
     width: 100%;
     .l{
       width: 30%;
       text-align: right;
       margin-right: .2rem;
     }
     .r{
       flex: 1;
       font-size: .18rem;
     }
   }
 }
 /deep/.goods_desc{
    font-size: 0;
    img{
     width: 100%;
   }
 }
 .detail_title{
   .title_line{
     width: 55%;
     height: .02rem;
     position: absolute;
     z-index: 0;
     margin: auto;
     top: 0;bottom: 0;left: 0;right: 0;
     background-color: #ccc;
   }
   position: relative;
   width: 100%;
   height: 0.4rem;
   line-height: 0.4rem;
   text-align: center;
   font-size: 1.17em;
   background-color: #fff;
   /* padding: .1rem .2rem; */
   span{
    position: relative;
    z-index: 1;
    background-color: #FFF;
    padding: 0 0.1rem;
   }
 }
 .detail{
   padding: 0 0 0.4rem 0;
   .detail_action{
     position: relative;
     z-index: 9999;
   }
 }
 .sku{
   width: 0.2rem;
 }
 .answer{
   margin-bottom: .1rem;
   background-color: #fff;
   padding: 0 0.2rem;
   .answer_item{
     margin-bottom: 0.15rem;
     padding: 0.06rem 0;
   }
   .anser_problem{
     font-size: 0.17rem;
     margin-bottom: 0.1rem;
   }
   .anser_problem_val{
     font-size: 0.1rem;
     color: rgb(163, 162, 162);
   }
 }
 .products{
   background-color: #fff;
 }
</style>