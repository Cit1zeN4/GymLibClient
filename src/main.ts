import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'

import ToastService from 'primevue/toastservice'

import './assets/main.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css' 

const app = createApp(App)

app.use(PrimeVue)
app.use(ToastService)

app.use(createPinia())
app.use(router)

app.mount('#app')
