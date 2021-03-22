<template>
  <div>
    <Tips/>

    <van-checkbox-group v-model="result">
      <van-checkbox name="a">
        <van-card
          num="2"
          price="2.00"
          desc="描述信息"
          title="商品标题"
          thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
        />
      </van-checkbox>
      
      <van-checkbox name="b">复选框 b</van-checkbox>
    </van-checkbox-group>


  </div>
</template>

<script>
import Tips from '@/components/Tips'
export default {
  name:'Cart',
  data(){
    return{
      result:'',
    }
  },
  components:{
    Tips
  }
}
</script>

<style>

</style>