const state = {
    isLoading: false
}

const mutations = {
    SET_LOADING_STATE(state, loadingState) {
        state.isLoading = loadingState

    }
}

const actions = {
    setLoadingState({ commit }, loadingState) {
        commit('SET_LOADING_STATE', loadingState)
    }
}

const getters = {
    isLoading: state => state.isLoading
}

export default {
    state,
    mutations,
    actions,
    getters
}
