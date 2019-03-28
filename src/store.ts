import vue from 'vue';
import vuex from 'vuex';

vue.use(vuex);

import SourceStateVuexModule from './components/SourceStateVuexModule';
import DocumentStateVuexModule from './components/DocumentStateVuexModule';
import ToggleableComponentsModule from './components/ToggleableComponentsModule';

export default new vuex.Store({
  state: {
    tick: 0,
    languages: ['html', 'css', 'javascript']
  },
  modules: {
    source: SourceStateVuexModule,
    document: DocumentStateVuexModule,
    view: ToggleableComponentsModule,
  },
  actions: {
    updateDocumentProxy({commit, rootGetters, state}) {
      commit('updateDocument', {
        html: state.source.htmlCode,
        css: state.source.cssCode,
        javascript: state.source.javascriptCode,
      });
    },
  },
});
