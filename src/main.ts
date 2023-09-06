import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import useElement from './libs/element'

import './assets/main.scss'
import 'virtual:uno.css'

const app = createApp(App)
useElement(app)

app.use(createPinia())
app.use(router)

app.mount('#app')
