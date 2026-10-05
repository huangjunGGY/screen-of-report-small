import { createApp } from 'vue';
import { createPinia } from 'pinia';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue';
import router from './router';
import { provideEventBus } from '@/composition/event';
import * as api from '@/api';
import './sb.css'

const app = createApp(App);

provideEventBus();

app.use(createPinia());
app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.provide('api', api);

app.mount('#app');
