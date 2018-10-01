import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)

console.log('modules', modules);

export default new Vuex.Store({
  modules
})