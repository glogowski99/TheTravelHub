<template>
  <div>
    <p class="t-font-bold">{{ weather.date }}</p>
    <p>Temperature: {{ weather.temperature.min }}°C - {{ weather.temperature.max }}°C</p>
    <p>Wind: {{ weather.wind.min }}{{weather.wind.unit}} - {{ weather.wind.max }}{{weather.wind.unit}}</p>
    <p>Condition: {{ weather.weather.text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    weather: Object,
  },
  setup(){
    return{}
  }
};
</script>

<style scoped>

</style>