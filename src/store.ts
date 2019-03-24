import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import SourceStateVuexModule from './components/SourceStateVuexModule';
import DocumentStateVuexModule from './components/DocumentStateVuexModule';
import ToggleableComponentsModule from './components/ToggleableComponentsModule';

export default new Vuex.Store({
    state: {
        tick: 0,
    },
    modules: {
        source: SourceStateVuexModule,
        document: DocumentStateVuexModule,
        view: ToggleableComponentsModule,
    },
    actions: {
        async updateDocumentProxy({commit, rootGetters, state}) {
            commit('updateDocument', {
                html: state.source.htmlCode,
                css: state.source.cssCode,
                javascript: state.source.javascriptCode,
            });
        },
    },
});
