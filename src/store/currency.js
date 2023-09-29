import CurrencyService from "@/plugins/currency.service";

const state = {
    symbols: null,
    conversionResult: null,
};

const getters = {
    getSymbols: (state) => state.symbols,
    getConversionResult: (state) => state.conversionResult,
};

const actions = {
    async fetchSymbols({ commit }) {
        try {
            const response = await CurrencyService.getSymbols();
            commit('SET_SYMBOLS', response.data);
        } catch (error) {
            console.error('Error w synbolach ', error);
        }
    },

    async convertCurrency({ commit }, { from, to, amount }) {
        try {
            const response = await CurrencyService.convertCurrency(from, to, amount);
            commit('SET_CONVERSION_RESULT', response.data);
        } catch (error) {
            console.error('Error w zamianie: ', error);
        }
    },
};

const mutations = {
    SET_SYMBOLS(state, symbols) {
        state.symbols = symbols;
    },

    SET_CONVERSION_RESULT(state, result) {
        state.conversionResult = result;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
