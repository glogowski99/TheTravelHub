import { createStore } from 'vuex'
import hotels from "./hotels";
import rapidHotels from "@/store/rapidHotels";
import loading from "./loading"
import rapidFlights from "@/store/rapidFlights"
import rapidWeather from "@/store/rapidWeather";
import location from '@/store/location'
import currency from '@/store/currency'
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    hotels,
    rapidHotels,
    loading,
    rapidWeather,
    rapidFlights,
    location,
    currency
  }
})
