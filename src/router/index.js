import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location) {
  return originalPush.call(this, location).catch(err => {})
};

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'Home',
    meta:{
      activeNum:0,
      isShow:true,
    },
    component: Home,
    children:[
      {
        path: '/home/searPopup',
        name: 'SearchPopup',
        component: ()=>import('../views/SearchPopup.vue')
      },
    ]
  },
  {
    path: '/topic',
    name: 'Topic',
    meta:{
      activeNum:1,
      isShow:true,
    },
    component: () => import( '../views/Topic.vue'),
  },
  {
    path: '/category',
    name: 'Category',
    meta:{
      activeNum:2,
      isShow:true,
    },
    component: () => import( '../views/Category.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    meta:{
      activeNum:3,
      isShow:true,
    },
    component: () => import( '../views/Cart.vue'),
  },
  {
    path: '/user',
    name: 'User',
    meta:{
      activeNum:4,
      isShow:true,
    },
    component: () => import( '../views/User.vue'),
  },
  {
    path: '/productDetail',
    name: 'ProductDetail',
    component: () => import( '../views/ProductDetail'),
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


//路由守卫
// 前置路由守卫
router.beforeEach((to,from,next)=>{
  // console.log(from);
  // console.log(to);
  
  let token=localStorage.getItem('token')
  if(to.path=='/cart'){
    if(token){
      next()
    } else{
      // alert('请先登录');
      Vue.prototype.$toast("请先登录");
      setTimeout(()=>{
        next('/user');
      },1000)
    }
  }
  next()
})
export default router
