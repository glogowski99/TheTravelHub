<template>
  <div class="t-relative">
    <div class="t-relative t-hidden lg:t-flex">
      <yellow-stein class="t-absolute t-right-0 t-top-0"/>
    </div>
    <div class="t-flex t-container t-mx-auto t-pt-40 t-px-6 lg:t-px-0 t-h-full">
      <div class="flex-col-start t-w-full lg:t-w-1/2 raleway">
        <p class="t-font-bold t-text-base t-tracking-wider t-text-dark-orange t-uppercase">
          Find all information in one place
        </p>
        <h1 class="t-hidden lg:t-flex lg:t-flex-col important-text">
          <span class="t-text-dark-orange">Travel</span> with the information <br class="t-hidden lg:t-flex"> you need
        </h1>
        <p class="lg:t-hidden important-text t-text-[55px]">
          <span class="t-text-dark-orange">Travel</span> with the information you need
        </p>
        <p class="invalid-text t-mt-8 t-text-xs lg:t-text-sm">
          Search for information about the weather in a given country, <br> its currency or see the best hotels and flights.
        </p>
        <router-link to="/" class="button">Find More</router-link>
      </div>
      <div class="t-relative t-w-1/2">
        <img alt="travel image" src="@/assets/travel.png" class="t-absolute t-top-0 t-left-0 t-right-0 t-bottom-0 t-h-[500px] t-hidden lg:t-flex"/>
      </div>
    </div>
  </div>
</template>

<script>
import YellowStein from "@/components/home/YellowStein";

export default {
  components: { YellowStein }
}
</script>
