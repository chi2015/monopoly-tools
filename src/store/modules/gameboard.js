const state = {
    chipPos: 0
}

const getters = {
    CHIP_POS : state => {
        return state.chipPos;
    }
}

const mutations = {
    SET_CHIP_POS : (state, pos) => {
        state.chipPos = pos;
    }
    
}

const actions = {
    moveChip({commit, dispatch}, val) {
        if (Math.floor((state.chipPos + val)/10)!=Math.floor(state.chipPos/10)) {
            let midVal = 10*Math.floor((state.chipPos + val)/10) - state.chipPos;
            commit('SET_CHIP_POS', state.chipPos + midVal == 40? 0 : state.chipPos + midVal);
            setTimeout(() => {
                commit('SET_CHIP_POS', state.chipPos + val - midVal);
                if (state.chipPos == 30) commit('SET_CHIP_POS', 10);
            }, 1000)
        }
        else {
            commit('SET_CHIP_POS', state.chipPos + val);
            if (state.chipPos == 30) commit('SET_CHIP_POS', 10);
        }
    },
    moveTo({commit}, val) {
        commit('SET_CHIP_POS', val);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
  }