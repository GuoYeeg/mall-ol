<template>
  <div id="app">

    <router-view/>
    <AppTabbar v-show="$route.meta.isShow"/>
  </div>
</template>
<script>
import AppTabbar from './components/AppTabbar'

export default {
  components:{
    AppTabbar,
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  background: #efefef;
  min-height: 100%;
  font-size: .14rem;
}
body,html{
  height: 100%;
}
html{
  font-size: 100px!important//现在一个rem为100px
}
</style>
