import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '../layout/Index.vue';
import Home from '../pages/Home.vue'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Index,
    redirect:'home',
    meta: {
      auth: true
    },
    children: [{
      path: "home",
      name: "Trang chủ",
      component: Home,
      meta: {
        auth: true
      },
    }]
  }]
})
