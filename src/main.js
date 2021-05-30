// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import router from './router/index';
import Vue from 'vue';
import Antd from "ant-design-vue";
import VueCookie from 'vue-cookie';
import 'ant-design-vue/dist/antd.css';
import * as VueGoogleMaps from 'vue2-google-maps'
import App from './App';
import 'leaflet/dist/leaflet.css';
Vue.config.productionTip = false
Vue.use(Antd);
Vue.use(VueCookie);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBBrtsMZRBgaFoi3p3wMFQOyVO4TB45n2A',
    libraries: 'places',
  }
});


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
