<template>
  <q-menu
      v-model="showPropertyType"
      anchor="bottom right"
      self="top right"
      class="t-w-80"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">Property type</div>
      </q-card-section>
      <q-card-section>
        <div class="t-flex t-flex-col">
          <div
              class="t-flex t-items-center"
              v-for="option in options"
              :key="option.value"
          >
            <q-checkbox
                color="orange-8"
                v-model="option.checked"
                @click="handleClick(option.value)"
            />
            <span class="t-ml-2">{{ option.label }}</span>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-menu>
</template>

<script>
import {ref, computed} from "vue";
import {useStore} from "vuex";

export default {
  setup(){
    const store = useStore()
    const options = ref([
      { value: "All", label: "All", checked: false },
      { value: "Hotels", label: "Hotels", checked: false },
      { value: "Apartments", label: "Apartments", checked: false },
    ]);


    const propertyType = computed(() => store.getters['hotels/getPropertyType']);

    const handleClick = (selectedValue) => {
      options.value.forEach((option) => {
        option.checked = option.value === selectedValue;
      });
      store.commit('hotels/SET_PROPERTY_TYPE', selectedValue);
    };


    return{
      options,
      handleClick,
      store,
      propertyType
    }
  }
}
</script>

<style scoped>
</style>
