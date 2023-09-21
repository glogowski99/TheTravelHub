import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HotelsView from "@/views/HotelsView";
import WeatherView from "@/views/WeatherView";
import CurrencyView from "@/views/CurrencyView";
import FlightsView from "@/views/FlightsView";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/hotels',
    name: 'hotels',
    component: HotelsView
  },
  {
    path: '/weather',
    name: 'weather',
    component: WeatherView
  },
  {
    path: '/currency',
    name: 'currency',
    component: CurrencyView
  },
  {
    path: '/flights',
    name: 'flights',
    component: FlightsView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
