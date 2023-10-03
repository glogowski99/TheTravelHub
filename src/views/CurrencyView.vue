<template>
  <div>
    <div class="t-container t-mx-auto">
        <nav-bar/>
    </div>
    <page-layout>
      <div class="t-container t-mx-auto t-pt-40 t-px-4 lg:t-px-0">
        <div class="main-box">
          <div class="t-px-1 t-w-full">
            <PlaceInput
                v-model="place"
                label="Country"
            />
          </div>
          <div class="t-h-full t-rounded-r-lg">
            <button @click="getPlace" class="button-form">Search</button>
          </div>
        </div>
        <div
            class="flex-col-center t-mt-20"
            v-for="(place, index) in placeData"
            :key="index"
        >
          <CurrencyInfo
              :place="place"
              @open-exchange-dialog="openExchangeDialog"
          />

        </div>
      </div>
    </page-layout>
    <exchange-modal
        :exchange="isExchangeDialogOpen"
        @update:exchange="isExchangeDialogOpen = $event" @close="closeExchangeDialog"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import {useStore} from "vuex";
import router from '@/router';
import NavBar from "@/components/home/NavBar";
import PageLayout from "@/components/PageLayout";
import ExchangeModal from "@/components/ExchangeModal";
import PlaceInput from "@/components/inputs/PlaceInput";
import CurrencyInfo from "@/components/currency/CurrencyInfo";

export default {
  components: {CurrencyInfo, PlaceInput, ExchangeModal, PageLayout, NavBar},
  setup(){
    const store = useStore();
    const placeData = computed(() => store.getters['location/getLocationData'])
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
      router.push({
        name: 'currency',
        query: {
          country: place.value,
        }
      });
    }
    const openExchangeDialog = () => {
      isExchangeDialogOpen.value = true;
    };

    const closeExchangeDialog = () => {
      isExchangeDialogOpen.value = false;
    };
    return{
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