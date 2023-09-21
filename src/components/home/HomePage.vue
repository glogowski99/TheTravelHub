<template>
  <div class="t-relative t-h-screen t-w-screen">
    <div class="t-relative">
      <yellow-stein class="t-absolute t-right-0 t-top-0"/>
    </div>
    <div class="t-flex t-pt-40 t-h-full t-container t-mx-auto">
      <div class="t-flex t-flex-col t-items-start t-w-1/2 raleway">
        <p class="t-font-bold t-text-base t-tracking-wider t-text-dark-orange t-uppercase">
          Find all information in one place
        </p>
        <h1 class="t-font-bold t-tracking-wide t-text-font-black">
          <span class="t-text-dark-orange">Travel</span>
          with the information <br> you need
        </h1>
        <p class="t-mt-8 t-text-black t-text-sm t-tracking-wide">
          Search for information about the weather in a given country, <br> its currency or see the best hotels and flights.
        </p>
        <router-link
            to="/"
            class="t-mt-2 t-px-10 t-py-3 t-bg-background-button t-text-white t-shadow-md t-rounded-lg hover:-t-translate-y-1/4 t-transition-transform"
        >
          Find More
        </router-link>
      </div>
      <div class="t-relative t-w-1/2">
        <img
            alt="Tourist"
            src="@/assets/home-page-image.png"
            class="t-absolute t-top-0 t-left-0 t-right-0 t-bottom-0 t-h-[500px]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import YellowStein from "@/components/home/YellowStein";
export default {
  components: {YellowStein}


}
</script>

<style scoped>

</style>