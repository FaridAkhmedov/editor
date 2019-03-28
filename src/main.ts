import Vue from 'vue';
import store from './store';

import EditorComponent from './components/EditorComponent.vue';
import './assets/styles/index.styl';

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(EditorComponent),
}).$mount('#application');
