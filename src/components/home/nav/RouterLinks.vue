<template>
  <div class="t-hidden lg:t-flex t-flex-row t-flex-wrap t-justify-between t-w-9/12 lg:t-w-7/12 t-mt-8">
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
export default {
  props: {
    navItems: Array,
  },
}
</script>
