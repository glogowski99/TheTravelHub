const state = {
    hotelRating: null,
    propertyType: null,
};

const getters = {
    getHotelRating: (state) => state.hotelRating,
    getPropertyType: (state) => state.propertyType,
};

const actions = {
    updateHotelRating({ commit }, rating) {
        commit('SET_HOTEL_RATING', rating);
    },
    updatePropertyType({ commit }, type) {
        commit('SET_PROPERTY_TYPE', type);
    },
};

const mutations = {
    SET_HOTEL_RATING(state, rating) {
        state.hotelRating = rating;
    },
    SET_PROPERTY_TYPE(state, type) {
        state.propertyType = type;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
