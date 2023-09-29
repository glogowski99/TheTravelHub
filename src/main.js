import './plugins/service-general'
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronDown, faChevronUp, faGlobe, faRetweet } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'

library.add(faChevronDown, faChevronUp, faStarSolid, faStarRegular, faGlobe, faRetweet )

createApp(App).use(Quasar, quasarUserOptions).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
