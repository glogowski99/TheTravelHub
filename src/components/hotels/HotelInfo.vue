<template>
  <div class="t-w-full lg:t-w-4/12 t-w-min-4/12 t-h-80">
    <div :style="{ backgroundImage: `url(${hotel.max_photo_url})` }" class="image-background"></div>
  </div>
  <div class="t-flex t-flex-col t-justify-between t-mt-4 lg:t-mt-0 lg:t-ml-6 t-w-full">
    <div class="t-w-full t-flex t-justify-between t-items-center">
      <h5 v-if="hotel">{{ hotel.hotel_name }}</h5>
      <div class="t-flex t-items-center t-justify-center">
        <span class="t-mr-2 t-text-gray-700">Review score:</span>
        <div class="t-w-8 t-h-8 t-bg-blue-500 t-rounded-lg t-flex t-items-center t-justify-center t-text-white t-font-semibold">
          <span>{{ hotel.review_score }} </span>
        </div>
      </div>
    </div>
    <div class="t-flex t-flex-col">
      <div class="t-flex t-items-center ">
        <span>{{ hotel.city }}, {{ hotel.district }}</span>
        <span class="t-ml-4 t-text-xs t-text-gray-700"> {{ hotel.distance_to_cc }} km to city center</span>
      </div>
      <p v-if="hotel">Street: {{ hotel.address }}</p>
    </div>

    <div class="t-flex t-flex-col t-ml-6 t-border-l-2 t-border-dark-orange t-px-2 t-text-gray-800">
      <span>{{ hotel.accommodation_type_name }}</span>
      <span>{{ removeHtmlTags(hotel.unit_configuration_label) }}</span>
    </div>
    <p class="t-mt-4 t-font-semibold t-text-font-black t-tracking-wide">Price: {{ hotel.price_breakdown.gross_price }} {{hotel.price_breakdown.currency}}</p>

    <a class="button t-text-center t-font-bold t-tracking-wider" :href="hotel.url"> Book </a>
  </div>
</template>

<script>
export default {
  props: {
    hotel: Object,
  },
  setup(){
    const removeHtmlTags = (text) => {
      return text.replace(/<\/?[^>]+(>|$)/g, "");
    };
    return{
      removeHtmlTags
    }
  }
}
</script>
<style scoped>
.image-background {
  width:100%;
  height:100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 20px;
}
</style>