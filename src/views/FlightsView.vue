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
          <div class="t-w-full lg:t-px-1 lg:t-border-r">
            <PlaceInput
                v-model="flightsFrom"
                label="Flights from"
            />
          </div>
          <div class="t-w-full lg:t-border-r lg:t-px-1 lg:t-ml-2">
            <PlaceInput
                v-model="flightsTo"
                label="Flights to"
            />
          </div>
          <div class="lg:t-mx-2 t-w-full">
            <DateInput
                v-model="dateFlight"
                label="Date"
                class="lg:t-px-2 t-w-full"
            />
          </div>
          <div class="t-w-full lg:t-px-1 lg:t-border-r">
            <DateInput
                v-model="returnDateFlight"
                label="Return Date"
                class="lg:t-px-2 t-w-full"
            />
          </div>
          <div class="t-w-full lg:t-px-2">
            <q-input
                v-model="passengers"
                label="Number of passengers"
                borderless
                color="orange"
                @click="showMenu = !showMenu"
                class="lg:t-px-2 t-cursor-pointer"
            >
              <template v-slot:append>
                <q-icon name="people" @click="showMenu = !showMenu" class="cursor-pointer" />
              </template>
            </q-input>

            <PassengersMenu
                @showMenu = showMenu
            />
          </div>
          <div class="lg:t-px-2 t-w-full lg:t-w-40">
            <q-select
                v-model="chosenClassOfService"
                :options="classOfService"
                label="Class of service"
                color="orange"
                borderless
                class="lg:t-w-40 lg:t-px-2 t-cursor-pointer"
            />
          </div>
          <div class="lg:t-px-2 t-w-full lg:t-w-40">
            <q-select
                v-model="chosenItineraryType"
                :options="itineraryType"
                label="Trip type"
                color="orange"
                borderless
                class="lg:t-w-40 lg:t-px-2 t-cursor-pointer"
            />
          </div>
          <div class="lg:t-px-2 t-w-full lg:t-w-40">
            <q-select
                v-model="chosenSortOrders"
                :options="sortOrders"
                label="Sort Order"
                color="orange"
                borderless
                class="lg:t-w-40 lg:t-px-2 t-cursor-pointer"
            />
          </div>
          <div class="t-mt-2 lg:t-mt-0 lg:t-h-full t-w-full lg:t-w-1/2 t-rounded-l-lg  t-rounded-r-lg lg:t-rounded-l-none">
            <button @click="flightsSearch" class="t-w-full lg:t-px-14 t-h-10 lg:t-h-full t-bg-dark-orange t-text-white t-rounded-l-lg lg:t-rounded-l-none t-rounded-r-lg">Search</button>
          </div>
        </div>
        <div v-for="(result, index) in flights" :key="index" class="">
          <p>{{result.equipmentId}}</p>
        </div>
      </div>
    </page-layout>
  </div>
</template>

<script>
import {computed, ref} from "vue";

import NavBar from "@/components/home/NavBar";
import PageLayout from "@/components/PageLayout";
import PassengersMenu from "@/components/flights/PassengersMenu";
import {useStore} from "vuex";
import {useQuasar} from "quasar";
import DateInput from "@/components/inputs/DateInput";
import PlaceInput from "@/components/inputs/PlaceInput";
export default {
  components: {PlaceInput, DateInput, PassengersMenu, PageLayout, NavBar},
  setup(){
    const $q = useQuasar();
    const store = useStore();
    const flights = computed(() => store.state.rapidFlights.flights);

    const flightsSearch = async () => {
      console.log("start funkcji flightsSearch");

      const today = new Date();
      const selectedDate = new Date(dateFlight.value);
      if (selectedDate < today) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Hotels could not be found because the date is incorrect.',
          icon: 'report_problem'
        });
        return;
      }

      console.log("ustawienia funkcji set serach params");
      await store.commit('rapidFlights/SET_SEARCH_PARAMS',{
        date: dateFlight.value,
        returnDate: returnDateFlight.value,
        numAdults: searchParams.value.numAdults,
        numSeniors: searchParams.value.numSeniors,
        classOfService: chosenClassOfService.value,
        itineraryType: chosenItineraryType.value,
        sortOrder: chosenSortOrders.value,
        currencyCode: 'USD'
      });

      console.log("wyszukiwanie lotnisk:");
      await store.dispatch('rapidFlights/searchAirport',{name: flightsFrom.value},);

      const allAirports = store.getters['rapidFlights/allAirports'];
      console.log("Wszystkie lotniska 2:", allAirports);

      if (allAirports && allAirports.length > 0) {
        const airportCode = allAirports[0]?.sourceAirportCode || '';
        const airportsFromOtherService = allAirports[0]?.sourceAirportCode || 'BOM';

        console.log("Aktualizacja parametrów wyszukiwania");
        await store.dispatch('rapidFlights/updateSearchParams',{airportCode,airportsFromOtherService});

        console.log("Wyszukuję loty");
        await store.dispatch('rapidFlights/searchFlights');
      } else {
        console.error("Nie znaleziono lotów");
      }
      console.log("koniec funkcji flightsSearch");
    }


    const flightsFrom = ref('');
    const flightsTo = ref('');
    const dateFlight = ref('');
    const returnDateFlight = ref('');
    const searchParams = computed(() => store.state.rapidFlights.searchParams);

    const passengers = computed(() => {
      return `${searchParams.value.numAdults} Adults, ${searchParams.value.numSeniors} Seniors`;
    });

    const chosenClassOfService = ref('');
    const chosenItineraryType = ref('');
    const chosenSortOrders = ref('');

    const classOfService = [
      { label: 'Economy', value: 'ECONOMY' },
      { label: 'Premium Economy', value: 'PREMIUM_ECONOMY' },
      { label: 'Business', value: 'BUSINESS' },
      { label: 'First', value: 'FIRST' }
    ];

    const itineraryType = [
      { label: 'One Way', value: 'ONE_WAY' },
      { label: 'Round Trip', value: 'ROUND_TRIP' },
    ];

    const sortOrders = [
      { label: 'Best Value', value: 'ML_BEST_VALUE' },
      { label: 'Duration', value: 'DURATION' },
      { label: 'Price', value: 'PRICE' },
      { label: 'NAJWCZEŚNIEJSZY WYJAZD', value: 'EARLIEST_OUTBOUND_DEPARTURE' },
      { label: 'NAJWCZEŚNIEJSZY PRZYJAZD', value: 'EARLIEST_OUTBOUND_ARRIVAL' },
      { label: 'OSTATNI WYJAZD', value: 'LATEST_OUTBOUND_DEPARTURE' },
      { label: 'NAJNOWSZY PRZYJAZD', value: 'LATEST_OUTBOUND_ARRIVAL' },
    ];


    const showMenu = ref(false);
    return{
      chosenSortOrders,
      chosenClassOfService,
      chosenItineraryType,
      sortOrders,
      classOfService,
      itineraryType,
      flightsTo,
      flights,
      flightsFrom,
      dateFlight,
      flightsSearch,
      returnDateFlight,
      passengers,
      showMenu,
      store,
    }
  }
}
</script>

<style scoped>
.active-border {
  border: 1px solid #FF6C01;
  border-radius: 10px;
}
</style>