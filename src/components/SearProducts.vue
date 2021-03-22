<template>
  <div class="sear">
    <van-dropdown-menu>
      <van-dropdown-item  title="综合" disabled  />
      <van-dropdown-item @change="sortChange" v-model="value1" title="价格" :options="option1" />
      <van-dropdown-item @change="categoryChange" v-model="value2" title="分类" :options="filterCategory" />
    </van-dropdown-menu>

    <van-empty v-if="goodsList.length==0" image="search" description="没有您搜索的商品" />
    <Products
      v-else
      :filterCategory="filterCategory"
      :goodsList="goodsList"
    />
  </div>
</template>

<script>
import Products from '../components/Products'
export default {
  name:'SearProducts',
  props:['filterCategory','goodsList'],
  data(){
    return{
      value1: '',
      value2: '',
      option1: [
        { text: '价格由高到低', value: 'desc' },
        { text: '价格由低到高', value: 'asc' },
      ],

    }
  },
  methods:{
    sortChange(val){
      this.$emit('sortChange',val)
    },
    categoryChange(val){
      this.$emit('categoryChange',val);
    }
  },
  components:{
    Products,
  }
}
</script>

<style>
.sear{
  height: 100%;
  background: #EFEFEF;

}

</style>