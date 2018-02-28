// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store/store'
import Vuex from 'vuex'
// Require dependencies

var VueCookie = require('vue-cookie');
// Tell Vue to use the plugin
Vue.use(VueCookie);
Vue.use(Vuex);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  store: store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
