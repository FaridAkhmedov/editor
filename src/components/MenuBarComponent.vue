<script>
  import {Vue, Component} from 'vue-property-decorator';
  import {getBoilerplates} from './Boilerplates';
  import {downloadDataAsFile} from '../helpers';
  import {VTooltip, VPopover, VClosePopover} from 'v-tooltip';

  Vue.directive('tooltip', VTooltip);
  Vue.directive('close-tooltip', VClosePopover);
  Vue.component('v-tooltip-extend', VPopover);

  @Component
  export default class MenuBarComponent extends Vue {
    downloadAsFile = downloadDataAsFile;

    boilerplates = getBoilerplates();

    tooltip = (text, delay = 600) => ({delay: delay, content: text});

    getState = (name) => this.$store.state.view[name];

    toggleState = (name) => this.$store.state.view[name] = !this.$store.state.view[name];

    setSource = (language, value) => this.$store.commit('setSource', {language, value});

    applyContent(boilerplate) {
      const _boilerplate = this.boilerplates[boilerplate];
      this.withRefresh(() => {
        this.$store.state.languages.forEach((lang) => {
          Object.keys(_boilerplate).includes(lang) && this.setSource(lang, _boilerplate[lang]);
        });
      });
    }

    withRefresh(callback) {
      callback.bind(this)();
      this.$store.dispatch('updateDocumentProxy').then(
          () => {
            this.$store.state.tick += 1;
            return this.$store.commit('saveSourceToStorage');
          },
      );
    }
  }
</script>

<template lang="pug">
  .menu
    .menu__left
      .menu__item.menu__item--text(v-for="lang in $store.state.languages" v-tooltip="tooltip('Скрыть')" @click="toggleState(lang)" :class="{'active': !getState(lang)}") {{ lang }}
      i.material-icons.menu__item(@click="downloadAsFile($store.getters.document)" v-tooltip="tooltip('Экспорт в html', 0)") save_alt
      v-tooltip-extend(:popoverClass="'v-drowdown__default'")
        i.material-icons.menu__item(v-tooltip="tooltip('Очистить поля', 0)") delete
        template(slot="popover")
          div Вы действительно хотите<br>очистить все поля?
          .popover__group
            button(v-close-tooltip @click="applyContent('Clear')") yes
            button(v-close-tooltip) no
    .menu__right
      v-tooltip-extend(:popoverClass="'v-drowdown__templates'")
        .menu__item.menu__item--text(v-close-tooltip) шаблоны
        template(slot="popover")
          .menu__item(v-for="(template, key) in boilerplates" v-if="key !== 'Clear'" @click="applyContent(key)" v-close-tooltip) {{template.title}}

</template>
