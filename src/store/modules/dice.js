import Vue from 'vue';

const state = {
    diceVal : [0,0],
    doubleCnt: 0
}

const getters = {
    DICE_VAL : state => {
        return state.diceVal;
      },
      DOUBLE_CNT: state => {
          return state.doubleCnt;
      }
}

const mutations = {
    SET_DICE_VAL : ({ diceVal }, values) => {
        Vue.set(diceVal, 0, values[0]);
        Vue.set(diceVal, 1, values[1]);
    },
    SET_DOUBLE_CNT : (state , cnt) => {
        state.doubleCnt = cnt;
    }
}

const actions = {
    setDiceVal({commit}, diceVal) {
        commit('SET_DICE_VAL', diceVal);
    },
    addDouble({commit}) {
        commit('SET_DOUBLE_CNT', state.doubleCnt + 1 );
    },
    resetDouble({commit}) {
        commit('SET_DOUBLE_CNT', 0);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
  }