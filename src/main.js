import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';
import store from './store';
import './index.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowRight, faArrowLeft, faEye, faEyeSlash, faTimes, faLongArrowAltLeft, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

//Add icons
library.add(faLongArrowAltLeft);
library.add(faLongArrowAltRight);
library.add(faArrowRight);
library.add(faArrowLeft);
library.add(faEye);
library.add(faEyeSlash);
library.add(faTimes);

//Not used in this example, as I did not get to it in time.
window.baseUrl = process.env.VUE_APP_ENDPOINT;
axios.defaults.baseURL = window.baseUrl + 'api/';


createApp(App).use(store).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
