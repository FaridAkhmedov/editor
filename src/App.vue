<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import * as monaco from 'monaco-editor';

    import CssBoilerplate from './assets/templates/CssBoilerplate.css.raw';
    import VueBoilerplateHtml from './assets/templates/VueBoilerplate.html.raw';
    import VueBoilerplateJs from './assets/templates/VueBoilerplate.js.raw';
    import ReactBoilerplate from './assets/templates/ReactBoilerplate.html.raw';
    import BootstrapBoilerplate from './assets/templates/BootstrapBoilerplate.html.raw';

    @Component export default class App extends Vue {
        protected view = {
            html: true,
            css: true,
            js: true,
        };

        protected languages = ['html', 'css', 'javascript'];

        protected state = {
            document: '',
            html: '',
            css: '',
            javascript: '',
            forse: 0
        };

        protected mounted(): void {
            this.languages.forEach((element) => {
                this.state[element] = window.localStorage.getItem(element) || '';
            });
            ((...editors: any[]) => {
                editors.forEach((element) => {
                    const editor = monaco.editor.create(element.block as HTMLElement, {
                        value: element.value,
                        fontLigatures: true,
                        mouseWheelZoom: true,
                        lineNumbersMinChars: 2,
                        renderLineHighlight: 'gutter',
                        lineHeight: 20,
                        scrollbar: {
                            useShadows: false,
                            verticalScrollbarSize: 8,
                            horizontal: 'auto',
                            vertical: 'visible',
                            horizontalScrollbarSize: 8
                        },
                        automaticLayout: true,
                        language: element.language,
                        fontFamily: '"Fira Code", monospace',
                        minimap: {enabled: false},
                    });
                    editor.onDidChangeModelContent(() => {
                        this.state[element.language] = editor.getValue();
                        this.updateFrame();
                    });
                    this.$watch('state.forse', () => {
                        editor.setValue(this.state[element.language]);
                    });
                });
            })({
                    block: this.$refs.html,
                    value: this.state.html,
                    language: 'html'
                }, {
                    block: this.$refs.css,
                    value: this.state.css,
                    language: 'css'
                }, {
                    block: this.$refs.js,
                    value: this.state.javascript,
                    language: 'javascript'
                },
            );
            this.updateFrame();
        }

        protected updateFrame(forse: boolean = false) {
            if (forse) this.state.forse++;
            setTimeout(() => {
                this.state.document =
                    `${this.state.html}<style>${this.state.css}</style><script>${this.state.javascript}<\/script>`;
            }, 500);
            this.languages.forEach((item) => {
                window.localStorage.setItem(item, this.state[item]);
            })
        }

        protected toggleRaw(name: string) {
            this.view[name] = !this.view[name];
        }

        protected addCssBoilerplate() {
            this.state.css += CssBoilerplate;
            this.updateFrame(true);
        }

        protected addReactBoilerplate() {
            this.state.html = ReactBoilerplate;
            this.updateFrame(true);
        }

        protected addBootstrapBoilerplate() {
            this.state.html = BootstrapBoilerplate;
            this.updateFrame(true);
        }

        protected addVueBoilerplate() {
            this.state.html = VueBoilerplateHtml;
            this.state.javascript = VueBoilerplateJs;
            this.updateFrame(true);
        }

        protected clearCode() {
            this.state.css = '';
            this.state.javascript = '';
            this.state.html = '';
            this.updateFrame(true);
        }

        protected download() {
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.state.document));
            element.setAttribute('download', 'code.html');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    }
</script>

<template lang="pug">
  #app
    .menu
      .menu__item(@click="toggleRaw('html')" :class="{'active': !view.html}") html
      .menu__item(@click="toggleRaw('css')" :class="{'active': !view.css}") css
      .menu__item(@click="toggleRaw('js')" :class="{'active': !view.js}") js
      .menu__item(@click='addCssBoilerplate') css boilerplate
      .menu__item(@click="addVueBoilerplate") Vue boilerplate
      .menu__item(@click="addReactBoilerplate") React boilerplate
      .menu__item(@click="addBootstrapBoilerplate") Bootstrap + jquery
      .menu__item(@click="clearCode") clear
      .menu__item(@click="download") download
    .editor(ref='editor')
      .editor__window.editor__html(:class="{'editor__hide': !view.html}")
        .editor__self(ref="html")
      .editor__window.editor__css(:class="{'editor__hide': !view.css}")
        .editor__self(ref="css")
      .editor__window.editor__js(:class="{'editor__hide': !view.js}")
        .editor__self(ref="js")
    .resize(ref='resize')
    .frame
      iframe(:srcdoc='state.document' frameborder='0')
</template>

<style lang="stylus">
  @import url('https://cdn.jsdelivr.net/gh/tonsky/FiraCode@1.206/distr/fira_code.css');
  @import 'assets/index.styl';
</style>
