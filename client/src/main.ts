import './assets/main.css'
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import VueGoogleMaps from '@fawmi/vue-google-maps'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Oruga from '@oruga-ui/oruga-next'

const app = createApp(App)

app.use(VueGoogleMaps, {
  load: {
    key: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
    libraries: 'places'
  }
})
app.use(Oruga)
app.use(router)
app.mount('#app')
