<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import * as monaco from 'monaco-editor';

    import editorSetting from './components/MonacoConfiguration';
    import MenuBarComponent from './components/MenuBarComponent';

    @Component({
        components: {MenuBarComponent}
    })
    export default class App extends Vue {
        protected languages: string[] = ['html', 'css', 'javascript'];

        private initEditors() {
            ((...editors: any[]) => {
                editors.forEach(element => {
                    const editor = monaco.editor.create(
                        element.block as HTMLElement,
                        editorSetting(element.value, element.language)
                    );
                    editor.onDidChangeModelContent(() => {
                        this.setSource(element.language, editor.getValue());
                        this.updateFrame();
                    });
                    this.$store.watch(
                        (state) => state.tick,
                        (value, old) => {
                            editor.setValue(this.$store.getters[element.language]);
                            return value = old + 1;
                        }
                    );
                });
            })(
                {
                    block: this.$refs.html,
                    value: this.$store.getters.html,
                    language: 'html'
                },
                {
                    block: this.$refs.css,
                    value: this.$store.getters.css,
                    language: 'css'
                },
                {
                    block: this.$refs.js,
                    value: this.$store.getters.javascript,
                    language: 'javascript'
                }
            );
        }

        private setSource(lang: string, value: string) {
            this.$store.commit('setSource', {
                language: lang,
                value: value
            });
        }

        private loadFromStorage() {
            this.languages.forEach((lang: string) => {
                this.setSource(lang, window.localStorage.getItem(lang) || '');
            });
        }

        protected mounted(): void {
            this.loadFromStorage();
            this.initEditors();
            this.updateFrame();
        }

        protected updateFrame(forse: boolean = false) {
            if (forse) this.$store.state.tick += 1;
            setTimeout(() => {
                this.$store.dispatch('updateDocumentProxy').then(
                    () => this.$store.commit('saveSourceToStorage')
                );
            }, 420);
        }
    }
</script>

<template lang="pug">
  #app
    MenuBarComponent
    .editor(ref='editor')
      .editor__window.editor__html(:class="{'editor__hide': !$store.state.view.html}")
        .editor__self(ref="html")
      .editor__window.editor__css(:class="{'editor__hide': !$store.state.view.css}")
        .editor__self(ref="css")
      .editor__window.editor__js(:class="{'editor__hide': !$store.state.view.javascript}")
        .editor__self(ref="js")
    .resize(ref='resize')
    .frame
      iframe(:srcdoc='$store.getters.document' frameborder='0')
</template>

<style lang="stylus">
  @import url('https://cdn.jsdelivr.net/gh/tonsky/FiraCode@1.206/distr/fira_code.css');
  @import 'assets/styles/index.styl';
</style>
