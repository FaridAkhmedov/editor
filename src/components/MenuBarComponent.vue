<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator';

    import CssBoilerplate from '../assets/templates/CssBoilerplate.css.raw';
    import VueBoilerplateHtml from '../assets/templates/VueBoilerplate.html.raw';
    import VueBoilerplateJs from '../assets/templates/VueBoilerplate.js.raw';
    import ThreeBoilerplateHtml from '../assets/templates/ThreeJsBoilerplate.html.raw';
    import ThreeBoilerplateJs from '../assets/templates/ThreeJsBoilerplate.js.raw';
    import ReactBoilerplate from '../assets/templates/ReactBoilerplate.html.raw';
    import BootstrapBoilerplate from '../assets/templates/BootstrapBoilerplate.html.raw';
    import MaterializeBoilerplate from '../assets/templates/MaterializeBoilerplate.html.raw'

    @Component
    export default class MenuBarComponent extends Vue {
        protected getState(name: string) {
            return this.$store.state.view[name];
        }

        protected setState(name: string, state: boolean) {
            this.$store.state.view[name] = state;
        }

        protected addCssBoilerplate() {
            this.applyContent(() => {
                this.setSource('css', CssBoilerplate);
            });
        }

        protected addReactBoilerplate() {
            this.applyContent(() => {
                this.setSource('html', ReactBoilerplate);
            });
        }

        protected addBootstrapBoilerplate() {
            this.applyContent(() => {
                this.setSource('html', BootstrapBoilerplate);
            });
        }

        protected addThreeBoilerplate() {
            this.applyContent(() => {
                this.setSource('html', ThreeBoilerplateHtml);
                this.setSource('javascript', ThreeBoilerplateJs);
            });
        }

        protected addVueBoilerplate() {
            this.applyContent(() => {
                this.setSource('html', VueBoilerplateHtml);
                this.setSource('javascript', VueBoilerplateJs);
            });
        }

        protected addMaterializeBoilerplate() {
            this.applyContent(() => {
                this.setSource('html', MaterializeBoilerplate);
            });
        }

        protected applyContent(callback: CallableFunction) {
            callback.bind(this)();
            this.$store.dispatch('updateDocumentProxy').then(
                () => {
                    this.$store.state.tick += 1;
                    return this.$store.commit('saveSourceToStorage');
                }
            );
        };

        private setSource(lang: string, value: string) {
            this.$store.commit('setSource', {
                language: lang,
                value: value
            });
        }

        protected clearCode() {
            this.applyContent(() => {
                this.setSource('css', '');
                this.setSource('html', '');
                this.setSource('javascript', '');
            });
        }

        protected downloadAsFile(data) {
            const element = document.createElement('a');
            element.setAttribute('href',
                'data:text/plain;charset=utf-8,' + encodeURIComponent(data)
            );
            element.setAttribute('download', 'code.html');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    }
</script>

<template lang="pug">
  .menu
    .menu__left
      .menu__item(@click="setState('html', !getState('html'))" :class="{'active': !getState('html')}") html
      .menu__item(@click="setState('css', !getState('css'))" :class="{'active': !getState('css')}") css
      .menu__item(@click="setState('javascript', !getState('javascript'))" :class="{'active': !getState('javascript')}") js
      .menu__item(@click="clearCode") Очистить
      .menu__item(@click="downloadAsFile($store.getters.document)") собрать
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
