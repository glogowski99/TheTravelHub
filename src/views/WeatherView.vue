<template>
  <div>
    <div class="t-container t-mx-auto">
      <nav-bar/>
    </div>
    <page-layout>
      <div class="t-container t-mx-auto t-pt-40 t-px-4 lg:t-px-0">
        <div class="main-box">
          <div class="t-px-1 t-w-full">
            <PlaceInput
                v-model="weatherPlace"
                label="City"
            />
          </div>
          <div class="t-h-full t-rounded-r-lg">
            <button @click="fetchWeatherData" class="button-form">Search</button>
          </div>
        </div>
        <div
            v-if="weatherData"
            class="t-mt-10"
        >
          <p class="raleway">Weather in
            <span class="t-font-bold">{{ weatherData.location.name }}, {{weatherData.location.timezone }}</span>
          </p>
          <div class="flex-center-between t-flex-wrap t-mx-10">
            <div
                v-for="day in 14"
                :key="day"
                class="t-shadow-lg t-px-4 t-py-2 t-rounded-md t-m-6"
            >
              <p class="t-uppercase t-font-bold t-text-brown-font">
                #day {{ day }}
              </p>
              <WeatherInfo
                  :weather="weatherData.forecast.items[day - 1]"
              />
            </div>
          </div>
        </div>
      </div>
    </page-layout>
  </div>
</template>

<script>
import {ref, computed} from "vue";
import { useStore } from 'vuex';
import router from '@/router';
import NavBar from "@/components/home/NavBar";
import PageLayout from "@/components/PageLayout";
import PlaceInput from "@/components/inputs/PlaceInput";
import WeatherInfo from "@/components/weather/WeatherInfo";
export default {
  components: {WeatherInfo, PlaceInput, PageLayout, NavBar},
  setup(){
    const store = useStore();
    const weatherPlace = ref('');
    const activeInput = ref('');
    const weatherData = computed(() => store.getters['rapidWeather/getWeatherData']);
    const fetchWeatherData = async () => {
      console.log("Pobieranie...");
      if (weatherPlace.value) {
        console.log(`pobieranie z  ${weatherPlace.value}`);
        await store.dispatch("rapidWeather/fetchWeatherData", weatherPlace.value);
      } else {
        console.log("No city");
      }
      router.push({
        name: 'weather',
        query: {
          city: weatherPlace.value,
        }
      });
    };
    return{
      weatherPlace,
      activeInput,
      fetchWeatherData,
      weatherData,
    }
  }
}
</script>
