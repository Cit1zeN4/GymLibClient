import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'
import Menubar from 'primevue/menubar'
import Toast from 'primevue/toast'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'
import { OpenAPI } from './api/codegen'

const app = createApp(App)

app.use(PrimeVue)
app.use(ToastService)
app.use(createPinia())
app.use(router)

app.component('Toast', Toast)
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Checkbox', Checkbox)
app.component('Menubar', Menubar)

app.mount('#app')

OpenAPI.BASE = import.meta.env.VITE_API_HOST
OpenAPI.WITH_CREDENTIALS = true
