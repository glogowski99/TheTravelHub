<template>
  <div class="flex-col-center">
    <img :src="place.flags.png" class="t-w-44 t-mb-10" />
    <h6 class="raleway t-font-bold">{{ place.name.common }}, {{ place.name.official }}</h6>
    <div class="t-flex t-items-center">
      <span class="t-font-bold t-mr-2">Currency:</span>
      <span>
        {{ Object.keys(place.currencies)[0] }}
        ({{ place.currencies[Object.keys(place.currencies)[0]].name }},
        {{ place.currencies[Object.keys(place.currencies)[0]].symbol }})
      </span>
      <button @click="openExchangeDialog" class="t-font-bold modalAcceptButton">Exchange</button>
    </div>
    <div class="t-flex t-items-center">
      <span class="t-font-bold t-mr-2">Languages:</span>
      <span>{{ place.languages[Object.keys(place.languages)[0]] }}</span>
    </div>
    <a :href="place.maps.googleMaps" class="t-mt-2">
      Look at the map
      <font-awesome-icon class="t-text-dark-orange" :icon="['fas', 'globe']" />
    </a>
  </div>
</template>
<script>
export default {
  props: {
    place: Object,
  },
  setup(props, { emit }){
    const openExchangeDialog = () => {
      emit("open-exchange-dialog");
    };
    return{
      openExchangeDialog
    }
  }
};
</script>

