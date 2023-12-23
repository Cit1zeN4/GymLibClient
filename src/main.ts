import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { OpenAPI } from './api/codegen'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'
import Menubar from 'primevue/menubar'
import Toast from 'primevue/toast'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Avatar from 'primevue/avatar'
import Skeleton from 'primevue/skeleton'
import ArticleSkeleton from '@/components/ArticleSkeleton.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Paginator from 'primevue/paginator'
import ProductTableSkeleton from './components/ProductTableSkeleton.vue'
import ExercisTableSkeleton from './components/ExercisTableSkeleton.vue'
import Dialog from 'primevue/dialog'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'material-icons/iconfont/material-icons.css'
import '/node_modules/primeflex/primeflex.css'

OpenAPI.BASE = import.meta.env.VITE_API_HOST
OpenAPI.WITH_CREDENTIALS = true

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(PrimeVue)
app.use(ToastService)
app.use(pinia)
app.use(router)

app.component('Toast', Toast)
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Checkbox', Checkbox)
app.component('Menubar', Menubar)
app.component('Accordion', Accordion)
app.component('AccordionTab', AccordionTab)
app.component('Avatar', Avatar)
app.component('Skeleton', Skeleton)
app.component('ArticleSkeleton', ArticleSkeleton)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Paginator', Paginator)
app.component('ProductTableSkeleton', ProductTableSkeleton)
app.component('ExercisTableSkeleton', ExercisTableSkeleton)
app.component('Dialog', Dialog)

app.mount('#app')
