const state = {
    cards1: ['kaluga', 
                'kazan', 
                'ufa', 
                'rostov', 
                'nizhniy', 
                'perm',
                'tomsk',
                'krasnodar',
                'archangelsk',
                'chelyabinsk',],
    cards2: ['novosibirsk',
             'vodoprovod',
             'electro',
             'stavropol',
             'rizhskayazd',
             'belgorod',
             'leninzd',
             'kurskzd',
             'kazanzd',
            'habarovsk',],
    cards3: ['omsk',
             'ekaterinburg',
             'samara',
             'saint',
             'volgograd',
             'moscow',
             'tumen',
            'vladivostok'],
    myCards: [],
    cardsDeck: [],
    currentCard: 0,
    selectedCard : 0,
    cardsNum : 5,
    selectCardTimeout: null,
    changeCardTimeout: null
};

const getters = {
    MY_CARDS : state => { return state.myCards; },
    CARDS_DECK : state => { return state.cardsDeck },
    CURRENT_CARD: state => { return state.currentCard },
    CARDS1 : state => { return state.cards1 },
    CARDS2 : state => { return state.cards2 },
    CARDS3 : state => { return state.cards3 }
};

const mutations = {
    GENERATE_CARD_DECK: (state) => {
        let partDeck = [...state.cards1, ...state.cards2, ...state.cards3]
        .filter(card => !~state.myCards.indexOf(card));
        state.cardsDeck = [...partDeck,...partDeck,...partDeck];
        state.cardsDeck.sort(() => Math.random() - 0.5);
    },
    ADD_CARD: (state, card) => {
        state.myCards.push(card);
    },
    SET_NUM_CARDS: (state, num) => {
        state.cardsNum = num;
    },
    RESET_CURRENT_CARD: (state) => {
        state.currentCard = 0;
    },
    SET_SELECT_CARD_TIMEOUT: (state, timeout) => {
        state.selectCardTimeout = timeout;
    },
    SET_CHANGE_CARD_TIMEOUT: (state, timeout) => {
        state.changeCardTimeout = timeout;
    },
    CLEAR_SELECT_CARD_TIMEOUT: (state) => {
        clearTimeout(state.selectCardTimeout);
        state.selectCardTimeout = null;
    },
    CLEAR_CHANGE_CARD_TIMEOUT: (state) => {
        clearTimeout(state.changeCardTimeout);
        state.changeCardTimeout = null;
    },
    INCREMENT_CURRENT_CARD: (state) => {
        state.currentCard++;
    },
    SET_SELECTED_CARD: (state) => {
        let min = 56;
        let max = state.cardsDeck.length - 1;
        state.selectedCard = Math.floor(Math.random() * (max - min + 1) ) + min;
    }
}

const actions = {
    resetTimers({commit}) {
        commit('CLEAR_CHANGE_CARD_TIMEOUT');
        commit('CLEAR_SELECT_CARD_TIMEOUT');
    },
    setNumCards({commit}, num) {
        commit('SET_NUM_CARDS', num);
    },
    selectCard({commit, dispatch}) {
        if (state.myCards.length >= state.cardsNum) return;
        commit('GENERATE_CARD_DECK');
        commit('RESET_CURRENT_CARD');
        commit('SET_SELECTED_CARD');
        dispatch('changeCard');
    },
    changeCard({commit, dispatch}) {
        commit('INCREMENT_CURRENT_CARD');
        if (state.currentCard < state.selectedCard) {
            let changeCardTimeout = setTimeout(() => { dispatch('changeCard'); }, 380 - 5*(state.selectedCard - state.currentCard));
            commit('SET_CHANGE_CARD_TIMEOUT', changeCardTimeout);
        }
        else {
            setTimeout(() => {
                commit('ADD_CARD', state.cardsDeck[state.selectedCard]);
                if (state.myCards.length < state.cardsNum) {
                    let selectCardTimeout = setTimeout(() => { dispatch("selectCard");}, 1000 );
                    commit('SET_SELECT_CARD_TIMEOUT', selectCardTimeout);
                }
            }, 1000);
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
  }
  