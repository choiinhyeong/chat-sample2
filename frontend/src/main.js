import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import ApiService from "@/assets/js/api.service";

const app = createApp(App);
ApiService.init(app);
app.use(router)
    .use(store)
    .mount('#app')
