import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import {router} from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import "@mdi/font/css/materialdesignicons.css";
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets:{
        mdi,
    }
  },
})

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
   .use(router)
   .use(vuetify)
   .mount('#app')
