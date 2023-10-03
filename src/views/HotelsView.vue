<template>
  <div>
    <div class="t-container t-mx-auto">
      <nav-bar/>
    </div>
    <page-layout>
      <div class="t-container t-mx-auto t-pt-40 t-px-8 lg:t-px-0">
        <div
            class="hotel-main-div"
        >
          <div class="lg:t-border-r lg:t-px-1 t-w-full">
            <PlaceInput v-model="place" label="City" :dense="dense"/>
          </div>
          <div class="lg:t-mx-2 t-w-full">
            <DateInput
                v-model="checkInDate"
                label="Check in"
                :dense="dense"
                class="lg:t-px-2 t-w-full"
            />
          </div>
          <div class="t-border-r lg:t-px-1 t-w-full">
            <DateInput
                v-model="checkOutDate"
                label="Check out"
                :dense="dense"
                class="lg:t-px-2 t-w-full"
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
          <div class="button-hotel-box">
            <button
                @click="hotelSearch"
                class="hotel-button"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div class="t-w-full lg:t-w-7/12 t-px-6 lg:t-px-0 t-mx-auto t-my-8">
        <p v-if="hotels && hotels.length > 0">List of hotels in the town: {{ place }}, with availability from {{ checkInDate }} to {{ checkOutDate }}
        </p>
        <div
            v-for="(result, index) in hotels"
            :key="index"
            class="t-flex t-flex-col lg:t-flex-row t-w-full t-my-10 t-h-full lg:t-h-80"
        >
        <HotelInfo :hotel="result"/>
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
import DateInput from "@/components/inputs/DateInput";
import PlaceInput from "@/components/inputs/PlaceInput";
import HotelInfo from "@/components/hotels/HotelInfo";

export default {
  components: {HotelInfo, PlaceInput, DateInput, GuestsAndRooms, PageLayout, NavBar},
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
      store,
    }
  }
}
</script>
