<template>
  <div class="search-popup" >
      <van-search
        v-model="searVal"
        show-action
        :placeholder="placeholderVal"
        @search="onSearch"
        @cancel="onCancel"
        @input="onInput"
      />
      <HistoryHot 
        v-if="blockShow==1" 
        :historyList="historyList" 
        :hots="hotKeywordList"
        @tagClick="tagClick"
      />
      <SearTips
        v-else-if="blockShow==2"
        :tips="searTips"
        @tipClick="tipClick"
      />
      <SearProducts
        v-else
        :goodsList="goodsList"
        :filterCategory="filterCategory"
        @categoryChange='categoryChange'
        @sortChange="sortChange"
      />
  </div>
</template>

<script>
import HistoryHot from '../components/HistoryHot'
import SearTips from '../components/SearTips'
import SearProducts from '../components/SearProducts'
import {getHistoryList,getHelpList,getGoodList,clearhistory} from '../request/api'
export default {
  name:'searPopup',
  data(){
    return{
      // 输入内容
      searVal:'',
      //占位内容
      placeholderVal:'',
      //显示板块序号
      blockShow:1,
      //历史记录内容
      historyList:[],
      //热门搜索内容
      hotKeywordList:[],
      //搜索提示内容
      searTips:[],
      //返回的商品列表
      goodsList:[],
      //返回的商品的分类
      filterCategory:[],
      //请求数据由高到低降序desc还是由低到高升序esc
      order:'',
      //请求数据的类别（下拉分类）
      categoryId:0,
      //排序方式id / price
      sort:'price'
    }
  },
  created(){
    getHistoryList()
    .then(res=>{
      if(res.errno==0){
        // console.log(res.data);
        this.historyList=res.data.historyKeywordList;
        this.placeholderVal=res.data.defaultKeyword.keyword;
        this.hotKeywordList=res.data.hotKeywordList
        // console.log(this.hotKeywordList);  
      }
      
    })
  },
  methods:{
    tipClick(val){
      this.searVal=val
      this.onSearch(val)
    },
    tagClick(val){
      this.searVal=val
      this.onSearch(val)
    },
    sortChange(val){
      this.order=val
      this.onSearch(this.searVal)
    },
    categoryChange(val){
      this.categoryId=val;
      this.onSearch(this.searVal)
    },
    onSearch(val){
      this.blockShow=3
      getGoodList({
        keyword:val,      
        page:1,
        size:20,
        order:this.order,
        categoryId:this.categoryId,
        sort:this.sort
        //这里传的值设置好的 如果要改就子传父改
      })
      .then(res=>{
        if(res.errno==0){
          let {filterCategory,goodsList} =res.data;
          var newArr=JSON.parse(JSON.stringify(filterCategory).replace(/name/g,'text').replace(/id/g,'value'))
          this.goodsList=goodsList
          this.filterCategory=newArr
          console.log(this.goodsList,this.filterCategory);
        }
      })
    },
    onCancel(){
      this.$router.go(-1)
    },
    onInput(val){
      console.log(val,this.blockShow);
      this.blockShow=2,
      getHelpList({keyword:val})
      .then(res=>{
        if(res.errno==0){
          // console.log(res);
          this.searTips=res.data
        }
      })
    },
  },
  components:{
    HistoryHot,
    SearTips,
    SearProducts,
  }
}
</script>

<style>
.search-popup{
  width: 100%;
  min-height: 100vh;
  position: absolute;
  top: 0;
  background: #EFEFEF;
}
</style>