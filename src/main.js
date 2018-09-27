// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../node_modules/vuetify/dist/vuetify.min.css';

import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify'
import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    cards : [],
    diceVal : [0,0],
    total : 0
  },
  getters: {
    CARDS: state => {
      return state.cards;
    },
    DICE_VAL : state => {
      return state.diceVal;
    },
    TOTAL: state => {
      return state.total;
    }
  },
  mutations: {
    ADD_CARD: (state, card) => {
      state.cards.push(card);
    },
    SET_DICE_VAL : (state, payload) => {
      console.log('st dice val', payload);
      state.diceVal[0] = payload[0];
      state.diceVal[1] = payload[1];
      state.total = state.diceVal.reduce((a, b) => a + b, 0);
      console.log('diceVal', state.diceVal);
    }
  },
  actions: {
    ACTION_ADD_CARD: (context, card) => {
      context.commit('ADD_CARD', card);
    },
    ROLL_DICE : (context, diceVal) => {
      context.commit('SET_DICE_VAL', diceVal);
    }
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
