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
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronDown, faChevronUp)

createApp(App).use(Quasar, quasarUserOptions).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
