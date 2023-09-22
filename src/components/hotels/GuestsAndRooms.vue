<template>
  <q-menu
      v-model="showMenu"
      anchor="bottom right"
      self="top right"
      class="t-w-80"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">Guests and rooms</div>
      </q-card-section>
      <q-card-section>
        <div class="t-flex t-flex-col">
          <div
              class="t-flex t-items-start t-justify-between t-my-1 t-w-full t-tracking-wide t-text-font-black raleway"
              v-for="item in items"
              :key="item.label"
          >
            <span class="t-text-lg">{{ item.label }}</span>
            <div class="t-flex t-items-center">
              <button
                  class="t-w-8 t-h-8 t-border t-border-amber-600 t-rounded-full t-text-2xl"
                  @click="item.minus()"
              >
                -
              </button>
              <div class="t-flex t-items-center t-justify-center t-mx-2 t-w-8 t-h-8 t-border t-border-flat-orange t-rounded-sm">
                <span>{{ item.value }}</span>
              </div>
              <button
                  class="t-w-8 t-h-8 t-border t-border-amber-600 t-rounded-full t-text-2xl"
                  @click="item.add()"
              >
                +
              </button>
            </div>
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
import {ref} from "vue";

export default {
  setup(){
    const adults = ref(0);
    const children = ref(0);
    const room = ref(0);

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
      resetValue
    }
  }
}
</script>

<style scoped>
</style>
