<template>
  <div>
    <van-row @click="openModel">
      <van-col span="6">
        <img :src="avatarSrc" alt />
      </van-col>
      <van-col span="15">{{nickname}}</van-col>
      <van-col span="3">
        <van-icon name="arrow" />
      </van-col>
    </van-row>
    <van-grid :column-num="3" square>
      <van-grid-item icon="photo-o" text="我的订单" />
      <van-grid-item icon="photo-o" text="优惠券" />
      <van-grid-item icon="photo-o" text="礼品卡" />
      <van-grid-item icon="photo-o" text="我的收藏" />
    </van-grid>
    <transition name="van-fade">
    <div class="login-modal" v-show="isShowModal" >
      <div @click="isShowModal=!isShowModal" class="close"></div>
      <van-form @submit="onSubmit" class="login-from">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            提交
          </van-button>
        </div>
    </van-form>
    </div>
    </transition>
  </div>
</template>

<script>
import {goLogin} from '../request/api'
export default {
  data () {
    return {
      avatarSrc:require("../assets/avatar.png"),
      username: '',
      password: '',
      isShowModal:false,
      nickname:'用户登录',
    }
  },
  created() {
    //组件创建的时候判断有没有token值
    let token=localStorage.getItem('nettoken')
    if(token){
      let userInfo=JSON.parse(localStorage.getItem('userInfo'))
      this.nickname=userInfo.nickname
      this.avatarSrc=userInfo.avatar
    }
  },
  methods:{
    onSubmit(values) {
      console.log('submit', values);
      console.log({username:values['用户名'],pwd:values['密码']});
      /*
        登录成功的业务逻辑
          1.提示框提示成功
          2.把返回的token值保存到本地
          3.1s后关闭模糊窗口
          4.把拿到的用户信息写到页面上
      */ 
      goLogin({username:values['用户名'],pwd:values['密码']})
      .then(res=>{
        console.log(res);
        this.$toast.success('登录成功')
        localStorage.setItem('nettoken',res.data.token)
        localStorage.setItem('userInfo',JSON.stringify(res.data.userInfo))
        setTimeout(()=>{
          this.isShowModal=false
        },1000)
        this.nickname=res.data.userInfo.nickname
        this.avatarSrc=res.data.userInfo.avatar
      })
    },
    openModel(){
      let token=localStorage.getItem('nettoken')
      if(token){
        return 
      }
      this.isShowModal=!this.isShowModal
      
    }
  }
}
</script>
 
<style lang = "less" scoped>
.van-row {
  padding: 0.2rem 4%;
  background: #333;
  color: #fff;
  .van-col {
    line-height: 0.7rem;
    font-size: 0.18rem;
    img {
      width: 0.7rem;
      border-radius: 50%;
      display: block;
    }
    &:last-child {
      text-align: right;
    }
  }
}
.login-modal{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  text-align: center;
  .login-from{
    width: 90%;
    position: absolute;
    left: 5% ;
    background-color: white;
    top: 30%;
  }
  .close{
    width: 100%;
    height: 100%;
  }
}

</style>