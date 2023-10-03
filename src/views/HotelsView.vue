<template>
  <div>
    <div class="t-container t-mx-auto">
      <nav-bar/>
    </div>
    <page-layout>
      <div class="t-container t-mx-auto t-pt-40 t-px-8 lg:t-px-0">
        <div
            class="t-flex t-items-center t-flex-wrap lg:t-flex-nowrap t-flex-col lg:t-flex-row t-mx-auto t-pl-2 t-pr-2 lg:t-pr-0 t-h-full lg:t-h-16 t-bg-white t-shadow t-rounded-lg"
        >
          <div class="lg:t-border-r lg:t-px-1 t-w-full">
            <q-input
                v-model="place"
                label="Place"
                :dense="dense"
                borderless
                color="orange"
                @focus="showBorder = true"
                @blur="showBorder = false"
            >
              <template v-slot:prepend>
                <q-icon name="place" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="text = ''" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
          <div class="lg:t-mx-2 t-w-full">
            <q-input
                class="lg:t-px-2 t-w-full"
                v-model="checkInDate"
                type="date"
                label="Check in"
                :dense="dense"
                borderless
                color="orange"
            />
          </div>
          <div class="t-border-r lg:t-px-1 t-w-full">
            <q-input
                class="lg:t-px-2"
                v-model="checkOutDate"
                type="date"
                label="Check out"
                :dense="dense"
                borderless
                color="orange"
            />
          </div>
          <div class="lg:t-px-2 t-w-full">
            <q-input
                v-model="guest"
                label="Guests and rooms"
                :dense="dense"
                borderless
                color="orange"
                @click="showMenu = !showMenu"
                class="lg:t-px-2 t-cursor-pointer t-w-full"
            >
              <template v-slot:append>
                <q-icon name="people" @click="showMenu = !showMenu" class="cursor-pointer" />
              </template>
            </q-input>
            <GuestsAndRooms
              @showMenu = showMenu
            />
          </div>
          <div class="t-mt-2 lg:t-mt-0 lg:t-h-full t-w-full lg:t-w-1/2 t-rounded-l-lg  t-rounded-r-lg lg:t-rounded-l-none">
            <button @click="hotelSearch" class="t-w-full lg:t-px-14 t-h-10 lg:t-h-full t-bg-dark-orange t-text-white t-rounded-l-lg lg:t-rounded-l-none t-rounded-r-lg">Search</button>
          </div>
        </div>
      </div>
      <div class="t-w-full lg:t-w-7/12 t-px-6 lg:t-px-0 t-mx-auto t-my-8">
        <p v-if="hotels && hotels.length > 0">List of hotels in the town: {{ place }}, with availability from {{ checkInDate }} to {{ checkOutDate }}</p>
        <div
            v-for="(result, index) in hotels"
            :key="index"
            class="t-flex t-flex-col lg:t-flex-row t-w-full t-my-10 t-h-full lg:t-h-80"
        >
          <div class="t-w-full lg:t-w-4/12 t-w-min-4/12 t-h-80">
            <div :style="{ backgroundImage: `url(${result.max_photo_url})` }" class="image-background"></div>
          </div>
          <div class="t-flex t-flex-col t-justify-between t-mt-4 lg:t-mt-0 lg:t-ml-6 t-w-full">
            <div class="t-w-full t-flex t-justify-between t-items-center">
              <h5 v-if="result">{{ result.hotel_name }}</h5>
              <div class="t-flex t-items-center t-justify-center">
                <span class="t-mr-2 t-text-gray-700">Review score:</span>
                <div class="t-w-8 t-h-8 t-bg-blue-500 t-rounded-lg t-flex t-items-center t-justify-center t-text-white t-font-semibold">
                  <span>{{ result.review_score }} </span>
                </div>
              </div>
            </div>
            <div class="t-flex t-flex-col">
              <div class="t-flex t-items-center ">
                <span>{{ result.city }}, {{ result.district }}</span>
                <span class="t-ml-4 t-text-xs t-text-gray-700"> {{ result.distance_to_cc }} km to city center</span>
              </div>
              <p v-if="result">Street: {{ result.address }}</p>
            </div>

            <div class="t-flex t-flex-col t-ml-6 t-border-l-2 t-border-dark-orange t-px-2 t-text-gray-800">
              <span>{{ result.accommodation_type_name }}</span>
              <span>{{ removeHtmlTags(result.unit_configuration_label) }}</span>
            </div>
            <p class="t-mt-4 t-font-semibold t-text-font-black t-tracking-wide">Price: {{ result.price_breakdown.gross_price }} {{result.price_breakdown.currency}}</p>

            <a class="button t-text-center t-font-bold t-tracking-wider" :href="result.url"> Book </a>
          </div>


        </div>
      </div>
    </page-layout>

  </div>
</template>

<script>
import { ref ,computed } from "vue";
import { useQuasar } from 'quasar';
import { useStore } from "vuex";
import router from '@/router';
import NavBar from "@/components/home/NavBar";
import PageLayout from "@/components/PageLayout";
import GuestsAndRooms from "@/components/hotels/GuestsAndRooms";

export default {
  components: { GuestsAndRooms, PageLayout, NavBar},
  setup(){
    const $q = useQuasar();
    const store = useStore();
    const hotels = computed(() => store.state.rapidHotels.hotels);
    const isLoading = computed(() => store.getters.isLoading);

    const hotelSearch = async () => {
      // Pobieranie dzisiejszej daty
      const today = new Date();
      const selectedDate = new Date(checkInDate.value);
      // Porównywanie dat
      if (selectedDate < today) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Hotels could not be found because the date is incorrect.',
          icon: 'report_problem'
        });
        return;
      }
      await store.commit('rapidHotels/SET_SEARCH_PARAMS', {
        checkin_date: checkInDate.value,
        checkout_date: checkOutDate.value
      });
      await store.dispatch('rapidHotels/searchLocations', { name: place.value, locale: 'pl' });
      const allLocations = store.getters['rapidHotels/allLocations'];
      if (allLocations && allLocations.length > 0) {
        const dest_id = allLocations[0]?.dest_id || '';
        const localeFromOtherService = allLocations[0]?.locale || 'pl';

        await store.dispatch('rapidHotels/updateSearchParams', { dest_id, locale: localeFromOtherService });
        await store.dispatch('rapidHotels/searchHotels');
      } else {
        console.error("Nie znaleziono lokalizacji");
      }
      router.push({
        name: 'hotels',
        query: {
          place: place.value,
          checkInDate: checkInDate.value,
          checkOutDate: checkOutDate.value,
          guest: guest.value
        }
      });
    };

    const place = ref('');
    const text = ref('');
    const dense = ref(false);
    const checkInDate = ref('');
    const checkOutDate = ref('');
    const searchParams = computed(() => store.state.rapidHotels.searchParams);
    const guest = computed(() => {
      return `${searchParams.value.adults_number}, ${searchParams.value.room_number}`;
    });
    const showMenu = ref(false);

    const removeHtmlTags = (text) => {
      return text.replace(/<\/?[^>]+(>|$)/g, "");
    };

    return{
      place,
      dense,
      text,
      checkInDate,
      checkOutDate,
      guest,
      hotelSearch,
      showMenu,
      isLoading,
      hotels,
      removeHtmlTags,
      store,
    }
  }
}
</script>

<style scoped>
.image-background {
  width:100%;
  height:100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 20px;
}
</style>