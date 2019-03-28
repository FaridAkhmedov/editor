<script>
  import {Vue, Component} from "vue-property-decorator";
  import {getBoilerplates} from "./Boilerplates";
  import {downloadDataAsFile} from "../helpers";
  import {VTooltip, VPopover, VClosePopover} from "v-tooltip";

  Vue.directive("tooltip", VTooltip);
  Vue.directive("close-tooltip", VClosePopover);
  Vue.component("v-tooltip-extend", VPopover);

  @Component
  export default class MenuBarComponent extends Vue {
    downloadAsFile = downloadDataAsFile;

    boilerplates = getBoilerplates();

    tooltip = (text, delay = 600) => ({delay: delay, content: text});

    getState = (name) => this.$store.state.view[name];

    setState = (name, state) => this.$store.state.view[name] = state;

    setSource = (language, value) => this.$store.commit("setSource", {language, value});

    applyContent(boilerplate) {
      const _boilerplate = this.boilerplates[boilerplate];
      this.withRefresh(() => {
        ["css", "html", "javascript"].forEach((lang) => {
          Object.keys(_boilerplate).includes(lang) && this.setSource(lang, _boilerplate[lang]);
        });
      });
    }

    withRefresh(callback) {
      callback.bind(this)();
      this.$store.dispatch("updateDocumentProxy").then(
          () => {
            this.$store.state.tick += 1;
            return this.$store.commit("saveSourceToStorage");
          }
      );
    }
  }
</script>

<template lang="pug">
   .menu
      .menu__left
         .menu__item.menu__item--text(@click="setState('html', !getState('html'))" v-tooltip="tooltip('Скрыть')" :class="{'active': !getState('html')}") html
         .menu__item.menu__item--text(@click="setState('css', !getState('css'))" v-tooltip="tooltip('Скрыть')" :class="{'active': !getState('css')}") css
         .menu__item.menu__item--text(@click="setState('javascript', !getState('javascript'))" v-tooltip="tooltip('Скрыть')" :class="{'active': !getState('javascript')}") js
         i.material-icons.menu__item(@click="downloadAsFile($store.getters.document)" v-tooltip="tooltip('Экспорт в html', 0)") save_alt
         v-tooltip-extend
            i.material-icons.menu__item delete
            template(slot="popover")
               div Вы действительно хотите очистить все поля?
               .popover__group
                  button(v-close-tooltip="true" @click="applyContent('Clear')") yes
      .menu__right
         .menu__extend(:class="{active: getState('templatesButton')}" @click="setState('templatesButton', !getState('templatesButton'))")
            .menu__item(@click="applyContent('CssBoilerplate')" v-text="boilerplates.CssBoilerplate.title")
            .menu__item(@click="applyContent('VueBoilerplate')" v-text="boilerplates.VueBoilerplate.title")
            .menu__item(@click="applyContent('ReactBoilerplate')" v-text="boilerplates.ReactBoilerplate.title")
            .menu__item(@click="applyContent('BootstrapBoilerplate')" v-text="boilerplates.BootstrapBoilerplate.title")
            .menu__item(@click="applyContent('ThreeBoilerplate')" v-text="boilerplates.ThreeBoilerplate.title")
            .menu__item(@click="applyContent('MaterializeBoilerplate')" v-text="boilerplates.MaterializeBoilerplate.title")
         .menu__item.menu__item--text(@click="setState('templatesButton', !getState('templatesButton'))") шаблоны
</template>
