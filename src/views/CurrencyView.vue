<template>
  <div>
    <div class="t-container t-mx-auto">
        <nav-bar/>
    </div>
    <page-layout>
      <div class="t-container t-mx-auto t-pt-40">
        <div class="t-flex t-items-center t-mx-auto t-w-3/12 t-pl-1 t-h-16 t-bg-white t-shadow t-rounded-lg">
          <div class="t-border-r t-px-1">
            <q-input
                v-model="place"
                label="City"
                borderless
                color="orange"
                :class="{ 'active-border': activeInput === 'place' }"
                @focus="activeInput = 'place'"
                @blur="activeInput = ''"
            >
              <template v-slot:prepend>
                <q-icon name="place" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="place = ''" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
          <div class="t-h-full t-rounded-r-lg">
            <button @click="getPlace" class="t-px-12 t-h-full t-bg-dark-orange t-text-white t-rounded-r-lg">Search</button>
          </div>
        </div>
        <div
            class="t-flex t-items-center t-justify-center t-flex-col t-mt-20"
            v-for="(place, index) in placeData"
            :key="index"
        >
          <img :src="place.flags.png" class="t-w-44 t-mb-10"/>

          <h6 class="raleway t-font-bold">{{ place.name.common }}, {{ place.name.official}}</h6>
          <div class="t-flex t-items-center">
            <span class="t-font-bold t-mr-2">Currency:</span>
            <span>
              {{ Object.keys(place.currencies)[0] }}
              ({{ place.currencies[Object.keys(place.currencies)[0]].name }},
              {{ place.currencies[Object.keys(place.currencies)[0]].symbol }})
            </span>
            <button
                @click="openExchangeDialog"
                class="t-font-bold modalAcceptButton"
            >
              Exchange
            </button>
          </div>
          <div class="t-flex t-items-center">
            <span class="t-font-bold t-mr-2">Languages:</span>
            <span>
              {{ place.languages[Object.keys(place.languages)[0]] }}
            </span>
          </div>
          <a :href="place.maps.googleMaps" class="t-mt-2">
            Look at the map
            <font-awesome-icon class="t-text-dark-orange" :icon="['fas', 'globe']" />
          </a>

        </div>
      </div>
    </page-layout>
    <exchange-modal
        :exchange="isExchangeDialogOpen" @update:exchange="isExchangeDialogOpen = $event" @close="closeExchangeDialog"
    />
  </div>
</template>

<script>
import NavBar from "@/components/home/NavBar";
import PageLayout from "@/components/PageLayout";
import { ref, computed } from "vue";
import {useStore} from "vuex";
import ExchangeModal from "@/components/ExchangeModal";

export default {
  components: {ExchangeModal, PageLayout, NavBar},
  setup(){
    const store = useStore();
    const placeData = computed(() => store.getters['location/getLocationData'])
    const activeInput = ref('');
    const place = ref('');
    const isExchangeDialogOpen = ref(false);

    const getPlace = async () => {
      console.log('Pobieranie info o miejscowości');
      if(place.value) {
        console.log(`pobieranie z ${place.value}`);
        await store.dispatch("location/fetchLocationsData", place.value);
      } else {
        console.log('bład')
      }
    }
    const openExchangeDialog = () => {
      isExchangeDialogOpen.value = true;
    };

    const closeExchangeDialog = () => {
      isExchangeDialogOpen.value = false;
    };
    return{
      activeInput,
      place,
      placeData,
      getPlace,
      isExchangeDialogOpen,
      openExchangeDialog,
      closeExchangeDialog
    }
  }
}
</script>

<style scoped>

</style>