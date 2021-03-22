<template>
  <div>
    <van-list
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell @click="tipClick(item)" v-for="item,index in tips" :key="index" :value="item" />
    </van-list>
  </div>
</template>

<script>
export default {
  name:'SearTips',
  props:['tips'],
  data(){
    return{
      list:[1,2,3,4,5,6],
      finished:true,
    }
  },
  methods:{
    tipClick(val){
      this.$emit('tipClick',val)
    },
    onLoad(){

    }
  }
}
</script>

<style>

</style>