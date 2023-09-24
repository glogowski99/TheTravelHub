import BookingService from "@/plugins/booking.service";

const state = {
    hotels: [],
    locations: [],
    searchParams: {
        checkin_date: '2023-09-27',
        dest_type: 'city',
        units: 'metric',
        checkout_date: '2023-09-28',
        adults_number: '2',
        order_by: 'popularity',
        dest_id: '',
        filter_by_currency: 'PLN',
        locale: 'pl',
        room_number: '1'
    }
};

const getters = {
    allHotels: (state) => state.hotels,
    allLocations: (state) => state.locations
};

const mutations = {
    SET_HOTELS(state, hotels) {
        state.hotels = hotels;
    },
    SET_LOCATIONS(state, locations) {
        state.locations = locations;
    },
    SET_SEARCH_PARAMS(state, params) {
        state.searchParams = { ...state.searchParams, ...params };
    }
};

const actions = {
    searchHotels({ commit, state }) {
        console.log("Search Params:", state.searchParams);
        return BookingService.searchHotels(state.searchParams)
            .then(response => {
                commit('SET_HOTELS', response.data);
                console.log("Updated Hotels:", state.hotels);
                return response;
            }, error => {
                return error;
            });
    },
    searchLocations({ commit }, { name, locale }) {
        return BookingService.searchLocations(name, locale)
            .then(response => {
                console.log("API Response:", response.data);
                commit('SET_LOCATIONS', response.data);
                return response;
            }, error => {
                return error;
            });
    },
    updateSearchParams({ commit }, params) {
        commit('SET_SEARCH_PARAMS', params);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
