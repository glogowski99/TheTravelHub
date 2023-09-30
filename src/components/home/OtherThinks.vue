<template>
  <div class="t-relative">
    <yellow-stein class="t-absolute t-left-[-20%] t-top-0 t-rotate-[220deg] t-hidden lg:t-flex"/>
    <div class="t-container t-mx-auto">
      <p class="t-text-center raleway">
        something for you
      </p>
      <h3 class="t-mt-2 t-text-center t-text-neutral-800 t-font-semibold t-capitalize">
        find something for yourself
      </h3>
      <div class="t-flex t-flex-col lg:t-flex-row t-items-center t-justify-between t-my-20">
        <div
            class="t-flex t-flex-col t-items-center t-justify-between t-mt-8 lg:t-mt-0 t-p-6 t-w-72 t-h-72 t-bg-white t-rounded-lg t-shadow"
            v-for="(item, index) in boxItems"
            :key="index"
        >
          <img
              class="t-w-24 t-h-24"
              :src="item.boxImage"
              alt="Hotel png image"
          />
          <span
              class="t-text-xl t-font-semibold t-text-font-black releway t-tracking-wide"
          >
          {{ item.boxTitle }}
        </span>
          <span
              class="t-text-center"
          >
          {{ item.boxDescription }}
        </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import YellowStein from "@/components/home/YellowStein";

export default {
  components: {YellowStein},
  setup(){
    const boxItems = ref([
      {
        boxImage: require("@/assets/airplane.png"),
        boxTitle: 'Best Flights',
        boxDescription: 'We have prepared a list of flights that will meet your expectations!',
      },
      {
        boxImage: require("@/assets/hotel.png"),
        boxTitle: 'Best Hotels',
        boxDescription: 'A list of all hotels and their reviews in the country you want to go to',
      },
      {
        boxImage: require("@/assets/weather-app.png"),
        boxTitle: 'Calculated Weather',
        boxDescription: 'Are you worried about the weather in the country you are traveling to? We will help you check it!',
      },
      {
        boxImage: require("@/assets/money-exchange.png"),
        boxTitle: 'Currency converter',
        boxDescription: 'There are many currencies in the world depending on the country. You can check the conversion rate for your currency here!',
      },
    ])
    return{
      boxItems
    }
  }

}
</script>

<style scoped>

</style>