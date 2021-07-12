import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './libs'

import globalComponents from './global-components'
import utils from './utils'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { initialize } from './helpers/general'
import { createI18n } from 'vue-i18n'

// SASS Theme
import './assets/sass/app.scss'
import en from './translations/en.json'

const i18n = createI18n({
    locale: 'en',
    messages: {
        en: en
    }
})

initialize(store, router)

const app = createApp(App)
    .use(store)
    .use(router)
    .use(i18n)
    .use(VueAxios, axios)

globalComponents(app)
utils(app)

app.mount('#app')
