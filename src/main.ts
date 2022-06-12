import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import { useVant } from './util'
import store from './store'

const app = useVant(createApp(App))
app.use(store)
app.use(router).mount('#app')