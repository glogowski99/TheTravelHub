import { location } from '@/plugins/location.service';

const state = {
    location: null,
};

const getters = {
    getLocationData: (state) => state.location,
}

const actions = {
    async fetchLocationsData({ commit }, name) {
        console.log(`szukam informacji dla: ${name}`);
        const data = await location(name);
        if (data) {
            console.log('udało się!', data);
            commit('SET_LOCATION_DATA', data);
        } else {
            console.log('nie udało się')
        }
    },
};

const mutations = {
    SET_LOCATION_DATA(state, data) {
        console.log('ustawiam miejsce', data);
        state.location = data
    }
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};