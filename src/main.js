import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from '@/App.vue'
import router from '@/router'
import VueCookies from 'vue-cookies'
import "normalize.css"
import '@/styles/index.css'
import '@/styles/app.css'



const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
createApp(App)
.use(router)
.use(pinia)
.use(VueCookies)
.mount('#app')

