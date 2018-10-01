const state = {
    diceVal : [0,0],
    total : 0
}

const getters = {
    DICE_VAL : state => {
        return state.diceVal;
      },
      TOTAL: state => {
        return state.total;
      }
}

const mutations = {
    SET_DICE_VAL : (state, payload) => {
        console.log('st dice val', payload);
        state.diceVal[0] = payload[0];
        state.diceVal[1] = payload[1];
        state.total = state.diceVal.reduce((a, b) => a + b, 0);
        console.log('diceVal', state.diceVal);
    }
}

const actions = {
    setDiceVal({commit}, diceVal) {
        commit('SET_DICE_VAL', diceVal);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
  }