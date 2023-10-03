<template>
  <q-input
      :style="borderStyle"
      :value="modelValue"
      @input="updateValue"
      :label="label"
      :type="type"
      :dense="dense"
      borderless
      color="orange"
      @focus="toggleBorder(true)"
      @blur="toggleBorder(false)"
      @click="handleClick"
  >
    <template v-if="prependIcon" v-slot:prepend>
      <q-icon :name="prependIcon" />
    </template>
    <template v-if="appendIcon" v-slot:append>
      <q-icon :name="appendIcon" @click="clearText" class="cursor-pointer" />
    </template>
  </q-input>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  props: {
    modelValue: String,
    label: String,
    type: String,
    dense: Boolean,
    prependIcon: String,
    appendIcon: String,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const showBorder = ref(false);

    const borderStyle = computed(() => ({
      border: showBorder.value ? '1px solid #FF6C01' : 'none',
      'border-radius': showBorder.value ? '10px' : '0px',
    }));

    const toggleBorder = (state) => {
      showBorder.value = state;
    };

    const updateValue = (value) => {
      emit('update:modelValue', value);
    };

    const clearText = () => {
      emit('update:modelValue', '');
    };

    return {
      borderStyle,
      toggleBorder,
      updateValue,
      clearText,
    };
  },
};
</script>

