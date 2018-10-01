// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../node_modules/vuetify/dist/vuetify.min.css';

import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify'
import App from './App';
import router from './router';
import store from './store';

console.log('STORE', store);

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(Vuex);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
