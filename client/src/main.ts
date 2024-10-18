import './assets/main.css'
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import VueGoogleMaps from '@fawmi/vue-google-maps';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyDXXVJnTg-Quy1Kwag5oKo40vwckQIGFhE',
        libraries: 'places',
    },
});

app.mount('#app')
