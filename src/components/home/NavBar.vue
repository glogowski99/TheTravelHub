<template>
  <div class="t-fixed t-top-0 t-left-50 t-container t-mx-auto t-flex t-items-center t-justify-between t-h-max-32 t-h-20 t-z-10">
    <router-link to="/" class="t-relative t-h-full t-w-56">
      <img src="@/assets/logo-travel.png" alt="Logo The Travel Hub" class="t-absolute t-left-0 t-top-0 t-right-0 t-bottom-0"/>
    </router-link>
    <div class="t-flex">
      <div
          v-for="(item, index) in navItems"
          :key="index"
      >
        <router-link
            :to="{ name: item.navRouter }"
            class="t-px-4 t-py-2 t-text-xl t-text-brown-font t-font-medium raleway t-tracking-wide"
            :class="{ 't-mr-10': index < 3 }"
        >
          {{ item.navName }}
        </router-link>
      </div>
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
    ])
    return{
      navItems
    }
}

}
</script>

<style scoped>

</style>