import { createStore } from 'vuex'
import hotels from "./hotels";
import rapidHotels from "@/store/rapidHotels";
import loading from "./loading"
import rapidFlights from "@/store/rapidFlights"

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
    rapidFlights
  }
})
