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
                label="Check in"
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
            <button class="t-px-14 t-h-full t-bg-dark-orange t-text-white t-rounded-r-lg">Search</button>
          </div>
        </div>
        <div class="t-flex t-mx-auto t-w-7/12 t-my-8">
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
        </div>
      </div>

    </page-layout>
  </div>
</template>

<script>
import NavBar from "@/components/home/NavBar";
import PageLayout from "@/components/PageLayout";
import {ref} from "vue";
import GuestsAndRooms from "@/components/hotels/GuestsAndRooms";
import PriceMenu from "@/components/hotels/PriceMenu";
import HotelRatings from "@/components/hotels/HotelRatings";
import PropertyType from "@/components/hotels/PropertyType";
export default {
  components: {PropertyType, HotelRatings, PriceMenu, GuestsAndRooms, PageLayout, NavBar},
  setup(){
    const place = ref('');
    const text = ref('');
    const dense = ref(false);
    const checkInDate = ref('');
    const checkOutDate = ref('');
    const showBorder = ref(false);
    const showBorderCheckIn = ref(false);
    const showBorderCheckOut = ref(false);
    const showBorderGuest = ref(false);

    const guest = ref("");
    const showMenu = ref(false);

    const isHovered = ref(false);
    const isHoveredHotel = ref(false);
    const isHoveredType = ref(false);

    const showPriceMenu = ref(false);
    const showHotelRatings = ref(false);
    const showPropertyType = ref(false);


    const openPriceMenu = () => {
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
    }
    const filterOptions = [
      { label: 'Price per night', name: 'PriceMenu', defaultText: '$0 - $600', component: 'PriceMenu' },
      { label: 'Hotel ratings', name: 'HotelRatings', defaultText: 'None', component: 'HotelRatings' },
      { label: 'Property type', name: 'PropertyType', defaultText: 'Hotel', component: 'PropertyType' },
    ];

    const show = ref({});
    const isHoveredMenu = ref({});

    const toggleMenu = (name) => {
      show[name] = !show[name];
      if (show[name]) {
        isHoveredMenu[name] = !isHoveredMenu[name];
      }
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
      showMenu,
      isHovered,
      isHoveredHotel,
      isHoveredType,
      showPriceMenu,
      openPriceMenu,
      openHotelRatings,
      openPropertyType,
      showHotelRatings,
      showPropertyType,
      filterOptions,
      toggleMenu,
      show,
      isHoveredMenu
    }
  }
}
</script>

<style scoped>

</style>