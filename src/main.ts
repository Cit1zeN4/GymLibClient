import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Button from 'primevue/button'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'

const app = createApp(App)

app.use(PrimeVue)
app.use(ToastService)
app.component('Button', Button)

app.use(createPinia())
app.use(router)

app.mount('#app')
