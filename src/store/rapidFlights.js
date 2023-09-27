
import FlightService from '@/plugins/flights.service';

const state = {
    airports: [],
    flights: [],
    searchParams: {
        sourceAirportCode: '',
        destinationAirportCode: 'BOM',
        date: '',
        itineraryType: '',
        sortOrder: '',
        numAdults: '1',
        numSeniors: '0',
        classOfService: '',
        returnDate: '2023-09-27',
        pageNumber: '1',
        currencyCode: 'USD'
    }
};

const getters = {
    allAirports: (state) => state.airports,
    allFlights: (state) => state.flights,
};

const actions = {
    searchAirport({commit}, query) {
        console.log("Wyszukiwanie lotniska z query:", query);
        return FlightService.searchAirport(query).then(response => {
            console.log("odpowiedź API na wyszukiwanie lotniska:", response.data);
            commit('SET_AIRPORTS', response.data);
            return response;
        }, error => {
            console.log("Błąd podczas wyszukiwania lotniska:", error);
            return error;
        })
    },
    searchFlights({ commit, state }) {
        console.log('Parametry wyszukiwania:', state.searchParams);
        return FlightService.searchFlights(state.searchParams).then(response => {
            console.log("wyszukane loty, API:", response.data);
            if (response.data.results && response.data.results.length > 0) {
                console.log("Znaleziono loty:", response.data.results);
            } else {
                console.log("Nie znaleziono lotów z API.");
            }
            commit('SET_FLIGHTS', response.data.results || []);
            return response;
        }, error => {
            console.log("Błąd podczas wyszukiwania lotów:", error);
            if (error.response) {
                console.log("Dane z odpowiedzi- błąd:", error.response.data);
            }
            return error;
        })
    },
    updateSearchParams({ commit }, params) {
        console.log("Aktualizacja parametrów szukania:", params);
        commit('SET_SEARCH_PARAMS', params);
    }
};

const mutations = {
    SET_AIRPORTS: (state, airports) => (state.airports = airports),
    SET_FLIGHTS: (state, flights) => (state.flights = flights),
    SET_SEARCH_PARAMS(state, params) {
        state.searchParams = { ...state.searchParams, ...params };
    }

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
