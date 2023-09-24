<template>
  <q-menu
      v-model="showHotelRatings"
      anchor="bottom right"
      self="top right"
    >
    <q-card>
      <q-card-section>
        <div class="text-h6">Set hotel ratings</div>
      </q-card-section>
      <q-card-section>
        <div class="t-flex t-flex-col t-px-1">
          <div class="t-flex t-font-bold t-text-font-black">
            <div
                v-for="star in [1, 2, 3, 4, 5]"
                :key="star"
                class="t-flex t-items-center t-mr-4"
            >
              <input
                  type="checkbox"
                  :value="star"
                  v-model="selectedStars"
              />
              <span class="t-mx-2">{{ star }}</span>
              <font-awesome-icon :icon="['fas', 'star']" class="t-text-dark-orange" />
            </div>
          </div>
          <q-card-actions align="right" class="t-mt-3 t-text-sm">
            <button @click="resetValue()" class="t-mr-4 t-p-2">Reset</button>
            <button @click="applyValue()" class="modalAcceptButton">Apply</button>
          </q-card-actions>
        </div>
      </q-card-section>
    </q-card>
  </q-menu>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex";

export default {
    setup() {
      const store = useStore();
      const selectedStars = ref([]);

      const showHotelRatings = ref(false);

      const resetValue = () => {
        selectedStars.value = [];
        store.commit("hotels/SET_HOTEL_RATING", null);
      };

      const applyValue = () => {
        store.commit("hotels/SET_HOTEL_RATING", selectedStars.value);
      };


      return {
        showHotelRatings,
        selectedStars,
        resetValue,
        applyValue
      };
    },
  };
</script>

<style scoped>
</style>
