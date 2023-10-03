<template>
  <div class="t-fixed t-top-0 t-left-50 t-container t-mx-auto t-flex t-items-center t-justify-between t-h-max-32 t-h-20 t-z-10 ">
    <div class="t-flex t-justify-between t-flex-col lg:t-flex-row h-w-full">
      <div class="t-flex t-justify-between h-w-full t-p-4 lg:t-p-0">
        <router-link to="/" class="t-relative t-h-full t-w-56">
          <img src="@/assets/logo-travel.png" alt="Logo The Travel Hub" class="t-absolute t-left-0 t-top-0 t-right-0 t-bottom-0"/>
        </router-link>
        <button @click="toggleMenu" class="lg:t-hidden t-h-16">
          <div :class="{'t-transform t-rotate-180': isOpen}" class="t-w-6 t-h-0.5 t-bg-dark-orange t-mb-1.5 t-transition-transform t-duration-300"></div>
          <div :class="{'t-opacity-0': isOpen}" class="t-w-6 t-h-0.5 t-bg-dark-orange t-mb-1.5 t-transition-opacity t-duration-300"></div>
          <div :class="{'t-transform t--rotate-180': isOpen}" class="t-w-6 t-h-0.5 t-bg-dark-orange t-transition-transform t-duration-300"></div>
        </button>
      </div>
      <div :class="{'t-hidden': !isOpen, 't-block': isOpen}" class="t-pt-10 t-border-t t-border-flat-orange t-bg-[#EDEDED] t-text-font-black lg:t-hidden t-shadow-b t-shadow-md">
        <div v-for="(item, index) in navItems" :key="index">
          <router-link :to="{ name: item.navRouter }" class="t-block t-px-4 t-py-2 t-text-xl t-font-medium t-tracking-wide">
            {{ item.navName }}
          </router-link>
        </div>
      </div>
    </div>
      <router-links :navItems="navItems"/>
  </div>
</template>
<script>
import { ref } from "vue";
import RouterLinks from "@/components/home/nav/RouterLinks";
export default {
  components: {RouterLinks},
  setup() {
    const isOpen = ref(false);
    const toggleMenu = () => {
      isOpen.value = !isOpen.value;
    };
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
    return {
      isOpen,
      toggleMenu,
      navItems
    };
  }
}
</script>
