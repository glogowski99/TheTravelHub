<template>
  <q-input
      :value="value"
      :label="label"
      :dense="dense"
      borderless
      color="orange"
      @input="$emit('update:value', $event)"
  >
    <template v-slot:prepend>
      <q-icon name="place" />
    </template>
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
