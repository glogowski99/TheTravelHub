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
                label="Kliknij mnie"
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

            <q-menu
                v-model="showMenu"
                anchor="bottom right"
                self="top right"
            >
              <q-card>
                <q-card-section>
                  <div class="text-h6">Twoje spersonalizowane okno</div>
                </q-card-section>
                <q-card-section>
                  <!-- Tutaj wprowadź swój własny kontent -->
                </q-card-section>
              </q-card>
            </q-menu>
          </div>
          <div class="t-h-full t-rounded-r-lg">
            <button class="t-px-14 t-h-full t-bg-dark-orange t-text-white t-rounded-r-lg">Search</button>

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
export default {
  components: {PageLayout, NavBar},
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
      showMenu
    }
  }
}
</script>

<style scoped>

</style>