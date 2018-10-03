const state = {
    monthsLeft : 24,
    credit: 1000,
    percent: 1,
    creditVal: 200,
    gotCredit: true,
    payVal: 0,
    creditClear: false,
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
    }
}

const mutations = {

}

const actions = {

}

export default {
    state,
    getters,
    mutations,
    actions
}