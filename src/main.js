// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import router from './router/index';
import Vue from 'vue';
import Antd from "ant-design-vue";
import VueCookie from 'vue-cookie';
import 'ant-design-vue/dist/antd.css';
import * as VueGoogleMaps from 'vue2-google-maps'
import App from './App';
import VueMapbox from "vue-mapbox";
import Mapbox from "mapbox-gl";

Vue.use(VueMapbox, { mapboxgl: Mapbox });
Vue.config.productionTip = false
Vue.use(Antd);
Vue.use(VueCookie);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8',
    libraries: 'places',
  }
});


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
