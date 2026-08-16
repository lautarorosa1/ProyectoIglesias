import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import { vReveal } from "./composables/home/useScroollReveal.js";
import { vCountUp } from "./composables/home/useCountUp.js";

import './assets/styles/main.css'

import 'maplibre-gl/dist/maplibre-gl.css'

createApp(App)
  .use(router)
  .directive("reveal", vReveal)
  .directive("count-up", vCountUp)
  .mount('#app')