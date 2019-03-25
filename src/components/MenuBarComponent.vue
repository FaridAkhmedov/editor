<script>
  import {Vue, Component} from 'vue-property-decorator';
  // @ts-ignore
  import vTooltip from 'v-tooltip';

  Vue.use(vTooltip);

  const CssBoilerplate = require('@/assets/templates/CssBoilerplate.css.txt');
  const VueBoilerplateHtml = require('@/assets/templates/VueBoilerplate.html.txt');
  const VueBoilerplateJs = require('@/assets/templates/VueBoilerplate.js.txt');
  const ThreeBoilerplateHtml = require('@/assets/templates/ThreeJsBoilerplate.html.txt');
  const ThreeBoilerplateJs = require('@/assets/templates/ThreeJsBoilerplate.js.txt');
  const ReactBoilerplate = require('@/assets/templates/ReactBoilerplate.html.txt');
  const BootstrapBoilerplate = require('@/assets/templates/BootstrapBoilerplate.html.txt');
  const MaterializeBoilerplate = require('@/assets/templates/MaterializeBoilerplate.html.txt');

  import {downloadDataAsFile} from '../helpers';

  @Component
  export default class MenuBarComponent extends Vue {
    downloadAsFile = downloadDataAsFile;

    tooltipText = (text) => ({
      delay: 800,
      content: text,
    });

    getState(name) {
      return this.$store.state.view[name];
    }

    setState(name, state) {
      this.$store.state.view[name] = state;
    }

    addCssBoilerplate() {
      this.applyContent(() => this.setSource('css', CssBoilerplate));
    }

    addReactBoilerplate() {
      this.applyContent(() => this.setSource('html', ReactBoilerplate));
    }

    addBootstrapBoilerplate() {
      this.applyContent(() => this.setSource('html', BootstrapBoilerplate));
    }

    addThreeBoilerplate() {
      this.applyContent(() => {
        this.setSource('html', ThreeBoilerplateHtml);
        this.setSource('javascript', ThreeBoilerplateJs);
      });
    }

    addVueBoilerplate() {
      this.applyContent(() => {
        this.setSource('html', VueBoilerplateHtml);
        this.setSource('javascript', VueBoilerplateJs);
      });
    }

    addMaterializeBoilerplate() {
      this.applyContent(() => this.setSource('html', MaterializeBoilerplate));
    }

    applyContent(callback) {
      callback.bind(this)();
      this.$store.dispatch('updateDocumentProxy').then(
          () => {
            this.$store.state.tick += 1;
            return this.$store.commit('saveSourceToStorage');
          },
      );
    }

    clearCode() {
      this.applyContent(() => {
        this.setSource('css', '');
        this.setSource('html', '');
        this.setSource('javascript', '');
      });
    }

    setSource(lang, value) {
      this.$store.commit('setSource', {
        language: lang,
        value,
      });
    }
  }
</script>


<template lang="pug">
  .menu
    .menu__left
      .menu__item(@click="setState('html', !getState('html'))" v-tooltip="tooltipText('Скрыть')" :class="{'active': !getState('html')}") html
      .menu__item(@click="setState('css', !getState('css'))" v-tooltip="tooltipText('Скрыть')" :class="{'active': !getState('css')}") css
      .menu__item(@click="setState('javascript', !getState('javascript'))" v-tooltip="tooltipText('Скрыть')" :class="{'active': !getState('javascript')}") js
      .menu__item(@click="clearCode") Очистить
      .menu__item(@click="downloadAsFile($store.getters.document)" v-tooltip="tooltipText('Экспорт в html')") собрать
    .menu__right
      .menu__extend(:class="{active: getState('templatesButton')}" @click="setState('templatesButton', !getState('templatesButton'))")
        .menu__item(@click='addCssBoilerplate') css @1 template
        .menu__item(@click="addVueBoilerplate") Vue template
        .menu__item(@click="addReactBoilerplate") React template
        .menu__item(@click="addBootstrapBoilerplate") Bootstrap + jquery
        .menu__item(@click="addThreeBoilerplate") ThreeJs template
        .menu__item(@click="addMaterializeBoilerplate") Materialize template
      .menu__item(@click="setState('templatesButton', !getState('templatesButton'))") шаблоны
</template>
