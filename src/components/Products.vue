<template>
  <ul>
    <li v-for="item,key in goodsList" :key="item.id" @click="showDetail(item.id)">
      <img :src="item.list_pic_url" alt="" width="100%">
      <div class="">{{item.name}}</div>
      <div class="price">{{item.retail_price |RMBformat}}</div>
    </li>
  </ul>
</template>

<script>
export default {
  name:'Products',
  props:['goodsList','filterCategory'],
  data(){
    return{

    }
  },
  methods: {
    showDetail(id){
      console.log(id);
      this.$router.push('/productDetail?id='+id)
      setTimeout(()=>{
      this.$router.go(0)
      },100)
    }
  },
}
</script>

<style lang="less">
ul{
  display: flex;
  padding: 0.1rem;
  justify-content: space-between;
  flex-wrap: wrap;
  li{
    width:49%;
    text-align:center;
    margin-bottom: 0.1rem;
    line-height: 0.2rem;
    background-color: white;
  }
  .price{
    color: rgb(216, 27, 27);
  }
}

</style>