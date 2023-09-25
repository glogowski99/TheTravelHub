<template>
  <div v-if="isLoading">
    <q-spinner color="orange-8" size="40px" />
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true
    }
  }
};
</script>