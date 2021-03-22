<template>
  <div class="home">
    <van-search v-model="searVal" @click="$router.push('/home/searPopup')" shape="round" placeholder="请输入搜索关键词" disabled/>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item,key in banner">
        <img :src="item.image_url" alt="" width="100%">
      </van-swipe-item>
    </van-swipe>
    <transition name="slide">
      <router-view ></router-view>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios' 
// import request from '../request/request'
import {getHomeList} from '../request/api'
export default {
  name: 'Home',
  data(){
    return{
      searVal:'',
      banner:'',
    }
  },
  created(){
    // request.get("/index/index")
    getHomeList()
    .then(res=>{
      // console.log(res.data);
      this.banner=res.data.banner
      // console.log(this.banner);
    })
    .catch(err=>{
      console.log('err');
      console.log(err);
    })
  },
  components: {
    HelloWorld
  }
}
</script>

<style lang="less">
.slide-enter-active,.slide-leave-active{
  transition:all .5s;
}
.slide-enter,.slide-leave-to{
  right: -100%;
}
.slide-enter-to,.slide-leave{
  right: 0;
}

</style>