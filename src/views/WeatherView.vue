<template>
  <div>
    <div class="t-container t-mx-auto">
      <nav-bar/>
    </div>
    <page-layout>
      <div class="t-container t-mx-auto t-pt-40 t-px-4 lg:t-px-0">
        <div class="t-flex t-items-center t-mx-auto t-w-full lg:t-w-7/12 2xl:t-w-3/12 t-pl-1 t-h-16 t-bg-white t-shadow  t-rounded-lg">
          <div class="t-border-r t-px-1">
            <q-input
                v-model="weatherPlace"
                label="Place"
                borderless
                color="orange"
                :class="{ 'active-border': activeInput === 'weatherPlace' }"
                @focus="activeInput = 'weatherPlace'"
                @blur="activeInput = ''"
            >
              <template v-slot:prepend>
                <q-icon name="place" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="weatherPlace = ''" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
          <div class="t-h-full t-rounded-r-lg">
            <button @click="fetchWeatherData" class="t-px-12 t-h-full t-bg-dark-orange t-text-white t-rounded-r-lg">Search</button>
          </div>

        </div>
        <div
            v-if="weatherData"
            class="t-mt-10"
        >
          <p class="raleway">Weather in
            <span class="t-font-bold">{{ weatherData.location.name }}, {{weatherData.location.timezone }}</span>
          </p>
          <div class="t-flex t-flex-wrap t-items-center t-justify-between t-mx-10">
            <div
                v-for="(day, index) in weatherData.forecast.items"
                :key="index"
                class="t-mt-6 t-mx-4"
            >
              <p class="t-font-bold">{{ day.date }}</p>
              <p>Temperature: {{ day.temperature.min }}°C - {{ day.temperature.max }}°C</p>
              <p>Wind: {{ day.wind.min }}{{day.wind.unit}} - {{ day.wind.max }}{{day.wind.unit}}</p>
              <p>Condition: {{ day.weather.text }}</p>
            </div>
          </div>


        </div>


      </div>
    </page-layout>

  </div>
</template>

<script>
import NavBar from "@/components/home/NavBar";
import PageLayout from "@/components/PageLayout";
import {ref, computed} from "vue";
import { useStore } from 'vuex';
export default {
  components: {PageLayout, NavBar},
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

<style scoped>
.active-border {
  border: 1px solid #FF6C01;
  border-radius: 10px;
}
</style>