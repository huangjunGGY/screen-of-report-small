import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import App from './App.vue';
import router from './router';
import { provideEventBus } from '@/composition/event';
import * as api from '@/api';
import './sb.css';

const app = createApp(App);

provideEventBus();

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.provide('api', api);

app.mount('#app');
