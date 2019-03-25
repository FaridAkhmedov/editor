import vue from 'vue';
import store from './store';
// @ts-ignore
import EditorComponentVue from './components/EditorComponent.vue';
import './assets/styles/index.styl';

vue.config.productionTip = false;

new vue({
  store,
  render: (h) => h(EditorComponentVue),
}).$mount('#application');
