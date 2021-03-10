// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import router from './router';
import Vue from 'vue';
import Antd from "ant-design-vue";
import 'ant-design-vue/dist/antd.css';
import App from './App';
Vue.config.productionTip = false
Vue.use(Antd);



new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
