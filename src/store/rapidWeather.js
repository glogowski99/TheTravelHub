import { fetchWeather } from '@/plugins/weather.service';

const state = {
    weatherData: null,
};

const getters = {
    getWeatherData: (state) => state.weatherData,
};

const actions = {
    async fetchWeatherData({ commit }, city) {
        console.log(`zapytanie dla miasta: ${city}`);
        const data = await fetchWeather(city);
        if (data) {
            console.log("sukces:", data);
            commit('SET_WEATHER_DATA', data);
        } else {
            console.log("nie udało sie");
        }
    },
};

const mutations = {
    SET_WEATHER_DATA(state, data) {
        console.log("ustawienia parametrów:", data);
        state.weatherData = data;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
