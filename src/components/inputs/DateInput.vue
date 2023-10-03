<template>
  <q-input
      :value="value"
      :label="label"
      :dense="dense"
      borderless
      color="orange"
      type="date"
      @input="$emit('update:value', $event)"
  >
  </q-input>
</template>

<script>
export default {
  props: {
    label: String,
    value: String,
    dense: Boolean,
  },
};
</script>
