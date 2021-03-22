<template>
  <div>
    <div class="his-hot">
      <div class="hd">
        <h4>历史记录</h4>
        <van-icon  v-show="tagShow" name="delete" @click="clear"/>
      </div>
      <div class="bd">
        <van-tag v-show="tagShow" @click="tagClick(item)" v-for="(item,index) in historyList" :key="index" plain type="default">{{item}}</van-tag>

      </div>
    </div>
        <div class="his-hot">
      <div class="hd">
        <h4>热门搜索</h4>
      </div>
      <div class="bd">
        <van-tag :class="{hot:item.is_hot}" @click="tagClick(item.keyword)" v-for="(item,index) in hots" :key="index" plain type="default">{{item.keyword}}</van-tag>

      </div>
    </div>
  </div>
</template>

<script>
import {clearhistory} from '../request/api'
export default {
  name:'HistoryHot',
  props:['historyList','hots'],
  data(){
    return{
      tagShow:true
    }
  },
  methods:{
    tagClick(val){
      this.$emit('tagClick',val)
    },
    clear(){
      clearhistory()
      .then(res=>{
        if(res.errno==0){
          Toast.success('清除成功');
          setTimeout(()=>{
            this.tagShow=false
          },500)
        }
      })
    }
  }
}
</script>

<style lang="less">
.his-hot{
  margin-top: 0.1rem;
  background-color: white;
  padding: 0.1rem;

  .hd{
    display: flex;
    justify-content: space-between;
    font-size: 0.18rem;
    margin-bottom: 0.1rem;
  }
  .bd{
    overflow: hidden;
  }
  .van-tag{
    float: left;
    margin-right: 0.05rem;
    margin-bottom: 0.08rem;
    padding: 0.03rem;
  }
  .hot{
    color: red;
  }
}

</style>