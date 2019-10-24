const state = {
    monthsLeft : 24,
    credit: 1000,
    percent: 1,
    creditVal: 200,
    gotCredit: true,
    payVal: 0,
    minPayDone: false
}

const getters = {
    MONTHS_LEFT : state => {
        return state.monthsLeft;
    },
    CREDIT : state => {
        return state.credit;
    },
    GOT_CREDIT : state => {
        return state.gotCredit;
    },
    PAY_VAL: state => {
        return state.payVal;
    },
    MIN_PAY_DONE: state => {
        return state.minPayDone;
    },
    MINIMAL_PAY: state => {
        return state.monthsLeft < 12 ? Math.ceil(state.credit / (state.monthsLeft + 1)) : 0;
    }
}

const mutations = {
    PAY: (state) => {
     if (state.minPayDone) return;
     state.credit -= state.payVal;
     state.minPayDone = true;
     if (state.credit <= 0) state.credit = 0; 
    },
    ADD_CREDIT: (state) => {
        if (state.gotCredit) return;
        state.credit += state.creditVal;
        state.gotCredit = true;
    },
    NEXT_MONTH: (state) => {
        state.monthsLeft -= 1;
        state.credit = Math.ceil((state.credit * (100 + state.percent)) / 100); 
        state.minPayDone = false;
        state.gotCredit = false;
        state.payVal = state.minimalPay;
    },
    RESET: (state) => {
        state.monthsLeft = 24;
        state.credit = 1000;
        state.payVal = 0;
        state.minPayDone = false;
    }
}

const actions = {
    pay({commit}) {
        commit('PAY');
    },
    addCredit({commit}) {
        commit('ADD_CREDIT');
    },
    nextMonth({commit}) {
        commit('NEXT_MONTH');
    },
    reset({commit}) {
        commit('RESET');
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}