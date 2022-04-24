import Vue from 'vue';
import App from './App.vue';
import common from './assets/css/common.css';
import store from '@/store/index';

Vue.config.productionTip = false;

Vue.use(common);

new Vue({
	render: h => h(App),
	store,
}).$mount('#app');
