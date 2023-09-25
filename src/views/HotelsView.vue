
<template>
  <div>
    <div class="t-container t-mx-auto">
      <nav-bar/>
    </div>
    <page-layout>
      <div class="t-container t-mx-auto t-pt-40">
        <div class="t-flex t-items-center t-mx-auto t-w-7/12 t-pl-1 t-h-16 t-bg-white t-shadow  t-rounded-lg">
          <div class="t-border-r t-px-1">
            <q-input
                :style="{
              border: showBorder ? '1px solid #FF6C01' : 'none' ,
              'border-radius': showBorder ? '10px' : '0px'
            }"
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
          <div class="t-mx-2">
            <q-input
                class="t-px-2"
                :style="{
              border: showBorderCheckIn ? '1px solid #FF6C01' : 'none' ,
              'border-radius': showBorderCheckIn ? '10px' : '0px'
            }"
                v-model="checkInDate"
                type="date"
                label="Check in"
                :dense="dense"
                borderless
                color="orange"
                @focus="showBorderCheckIn = true"
                @blur="showBorderCheckIn = false"
            />
          </div>
          <div class="t-border-r t-px-1">
            <q-input
                class="t-px-2 "
                :style="{
              border: showBorderCheckOut ? '1px solid #FF6C01' : 'none' ,
              'border-radius': showBorderCheckOut ? '10px' : '0px'
            }"
                v-model="checkOutDate"
                type="date"
                label="Check out"
                :dense="dense"
                borderless
                color="orange"
                @focus="showBorderCheckOut = true"
                @blur="showBorderCheckOut = false"
            />
          </div>
          <div class="t-px-2">
            <q-input
                :style="{
              border: showBorderGuest ? '1px solid #FF6C01' : 'none' ,
              'border-radius': showBorderGuest ? '10px' : '0px'
            }"
                v-model="guest"
                label="Guests and rooms"
                :dense="dense"
                borderless
                color="orange"
                @focus="showBorderGuest = true"
                @blur="showBorderGuest = false"
                @click="showMenu = !showMenu"
                class="t-px-2 t-cursor-pointer"
            >
              <template v-slot:append>
                <q-icon name="people" @click="showMenu = !showMenu" class="cursor-pointer" />
              </template>
            </q-input>
            <GuestsAndRooms
              @showMenu = showMenu
            />
          </div>
          <div class="t-h-full t-rounded-r-lg">
            <button @click="hotelSearch" class="t-px-14 t-h-full t-bg-dark-orange t-text-white t-rounded-r-lg">Search</button>
          </div>
        </div>
       <!-- <div class="t-flex t-mx-auto t-w-7/12 t-my-8">
          <div
              v-for="(item, index) in filterOptions"
              :key="index"
              class="t-mx-2 t-w-full"
          >
            <label class="t-ml-2 t-mb-1 t-text-xs raleway t-text-font-black t-font-medium">
              {{ item.label }}
            </label>
            <button
                class="t-flex t-justify-between t-items-center t-w-full t-py-1 t-px-4 t-border t-border-dark-orange t-rounded-2xl"
                @mouseenter="toggleMenu(item.name)"
                @mouseleave="toggleMenu(item.name)"
            >
              <span class="t-text-sm t-tracking-widest">{{ item.defaultText }}</span>
              <font-awesome-icon
                  :icon="[isHoveredMenu[item.name] ? 'fas' : 'fas', isHoveredMenu[item.name] ? 'chevron-up' : 'chevron-down']"
              />
            </button>
            <component :is="item.component" :show="show[item.name]" />
          </div>
        </div>-->
      </div>
      <div class="t-w-7/12 t-mx-auto t-my-8">
        <p v-if="hotels && hotels.length > 0">List of hotels in the town: {{ place }}, with availability from {{ checkInDate }} to {{ checkOutDate }}</p>


        <div v-for="(result, index) in hotels" :key="index" class="t-flex t-w-full t-my-10 t-h-80">

          <div class="t-w-4/12 t-w-min-4/12 t">
            <div :style="{ backgroundImage: `url(${result.max_photo_url})` }" class="image-background"></div>
          </div>
          <div class="t-flex t-flex-col t-justify-between t-ml-6 t-w-full">
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

    console.log("Hotele w komponencie:", hotels.value);

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


   /* const hotelRatingText = computed(() => store.state.hotels.hotelRating || 'None');
    const hotelPropertyType = computed(() => store.state.hotels.propertyType || 'Hotels');*/
    const place = ref('');
    const text = ref('');
    const dense = ref(false);
    const checkInDate = ref('');
    const checkOutDate = ref('');
    const showBorder = ref(false);
    const showBorderCheckIn = ref(false);
    const showBorderCheckOut = ref(false);
    const showBorderGuest = ref(false);
    const searchParams = computed(() => store.state.rapidHotels.searchParams);

    const guest = computed(() => {
      return `${searchParams.value.adults_number}, ${searchParams.value.room_number}`;
    });
    const showMenu = ref(false);

    const isHovered = ref(false);
    const isHoveredHotel = ref(false);
    const isHoveredType = ref(false);

    const showPriceMenu = ref(false);
    const showHotelRatings = ref(false);
    const showPropertyType = ref(false);

    console.log($q);
    console.log($q.notify);


  /*  const openPriceMenu = () => {
      showPriceMenu.value = !showPriceMenu.value
      if (showPriceMenu.value === true) {
        isHovered.value = !isHovered.value
      }
    };

    const openHotelRatings = () => {
      showHotelRatings.value = !showHotelRatings.value
      if (showHotelRatings.value === true) {
        isHoveredHotel.value = !isHoveredHotel.value
      }
    }

    const openPropertyType = () => {
      showPropertyType.value = !showPropertyType.value
      if (showPropertyType.value === true) {
        isHoveredType.value = !isHoveredType.value
      }
    }*/
 /*   const filterOptions = ref([
      { label: 'Price per night', name: 'PriceMenu', defaultText: '$0 - $600', component: 'PriceMenu' },
      { label: 'Hotel ratings', name: 'HotelRatings', defaultText: hotelRatingText, component: 'HotelRatings' },
      { label: 'Property type', name: 'PropertyType', defaultText: hotelPropertyType, component: 'PropertyType' },
    ]);*/

    const show = ref({});
    const isHoveredMenu = ref({});

    const toggleMenu = (name) => {
      show[name] = !show[name];
      if (show[name]) {
        isHoveredMenu[name] = !isHoveredMenu[name];
      }
    };
    const removeHtmlTags = (text) => {
      return text.replace(/<\/?[^>]+(>|$)/g, "");
    };

    return{
      place,
      dense,
      text,
      showBorder,
      showBorderCheckIn,
      showBorderCheckOut,
      checkInDate,
      checkOutDate,
      guest,
      showBorderGuest,
      hotelSearch,
      showMenu,
      isHovered,
      isLoading,
      hotels,
      isHoveredHotel,
      isHoveredType,
      showPriceMenu,
      showHotelRatings,
      showPropertyType,
      removeHtmlTags,
      toggleMenu,
      show,
      store,
      isHoveredMenu,
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