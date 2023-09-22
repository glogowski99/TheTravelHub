<template>
  <q-menu
      v-model="showPriceMenu"
      anchor="bottom right"
      self="top right"
      class="t-w-80"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">Set price range</div>
      </q-card-section>
      <q-card-section>
        <div class="t-flex t-flex-col t-px-1">

          <q-slider
              v-model="standard"
              :min="0"
              :max="600"
              :step="1"
              label
              label-always
              :marker-labels="markLabels"
              color="orange-6"
          />
          <div class="t-flex t-justify-between t-mt-2">
            <q-input
                outlined
                color="orange-8"
                dense
                class=""
                label="standard"/>
            <span class="t-mx-2 t-text-2xl t-font-medium">-</span>
            <q-input
                outlined
                color="orange-8"
                dense
                class=""
                label="standard"/>
          </div>

          <q-card-actions align="right" class="t-mt-3 t-text-sm">
            <button @click="resetValue()" class="t-mr-4 t-p-2">Reset</button>
            <button class="modalAcceptButton">Apply</button>
          </q-card-actions>
        </div>
      </q-card-section>
    </q-card>
  </q-menu>
</template>

<script>
import {reactive, ref} from "vue";

export default {
  setup(){
    const adults = ref(0);
    const children = ref(0);
    const room = ref(0);
    const standard = ref(2)

    const markLabels = reactive([
      {value:0, label: '$0'},
      {value:600, label: '$600'},
    ])

    const items = [
      {
        label: 'Adults',
        value: adults,
        add: () => adults.value++,
        minus: () => adults.value = Math.max(adults.value - 1, 0)
      },
      {
        label: 'Children',
        value: children,
        add: () => children.value++,
        minus: () => children.value = Math.max(children.value - 1, 0)
      },
      {
        label: 'Room',
        value: room,
        add: () => room.value++,
        minus: () => room.value = Math.max(room.value - 1, 0)
      }
    ];

    const resetValue = () => {
      adults.value = 0;
      children.value = 0;
      room.value = 0;
    }

    return{
      items,
      resetValue,
      standard,
      markLabels
    }
  }
}
</script>

<style scoped>
</style>
