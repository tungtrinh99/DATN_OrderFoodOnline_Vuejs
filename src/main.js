// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import router from './router/index';
import Vue from 'vue';
import Antd from "ant-design-vue";
import VueCookie from 'vue-cookie';
import 'ant-design-vue/dist/antd.css';
import App from './App';
Vue.config.productionTip = false
Vue.use(Antd);
Vue.use(VueCookie);



new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
