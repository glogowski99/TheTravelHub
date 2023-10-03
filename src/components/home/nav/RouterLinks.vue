<template>
  <div class="t-flex t-flex-row t-flex-wrap t-justify-between t-w-9/12 lg:t-w-7/12 t-mt-8">
    <div
        v-for="(item, index) in navItems"
        :key="index"
        class="t-flex "
    >
      <router-link
          :to="{ name: item.navRouter }"
          class="t-px-4 t-py-2 t-text-xl t-text-brown-font t-font-medium raleway t-tracking-wide hover:t-font-semibold t-transition-all"
          :class="{ 'lg:t-mr-10': index < 3 }"
      >
        {{ item.navName }}
      </router-link>
  </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  setup(){
    const navItems = ref([
      {
        navName: 'Hotels',
        navRouter: 'hotels',
      },
      {
        navName: 'Flights',
        navRouter: 'flights',
      },
      {
        navName: 'Weather',
        navRouter: 'weather',
      },
      {
        navName: 'Currency',
        navRouter: 'currency',
      }
    ]);
    return{
      navItems
    }
  }

}
</script>

<style scoped>

</style>