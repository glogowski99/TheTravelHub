<template>
  <div class="">
    <div class="t-container t-mx-auto">
      <nav-bar/>
    </div>
    <page-layout>
      <home-page/>
      <other-thinks/>
    </page-layout>
  </div>
</template>

<script>

import NavBar from "@/components/home/NavBar";
import HomePage from "@/components/home/HomePage";
import OtherThinks from "@/components/home/OtherThinks";
import PageLayout from "@/components/PageLayout";
export default {
  name: 'HomeView',
  components: {PageLayout, OtherThinks, HomePage, NavBar},
  setup(){

    return{

    }
  }
}
</script>
