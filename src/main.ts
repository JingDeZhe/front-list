import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import useContextmenu from './libs/contextmenu'
import useElement from './libs/element'
import router from './router'

import './assets/main.scss'
import 'virtual:uno.css'

const app = createApp(App)
useElement(app)
useContextmenu(app)

app.use(createPinia())
app.use(router)

app.mount('#app')
