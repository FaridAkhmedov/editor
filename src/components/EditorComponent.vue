<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import * as monaco from "monaco-editor";

    import MonacoConfiguration from "./MonacoConfiguration";
    import MenuBarComponentVue from "./MenuBarComponent.vue";

    interface EditorDefineInterface {
        container: any;
        value: string;
        language: string;
    }

    @Component({
        components: {MenuBarComponentVue},
    })
    export default class EditorComponent extends Vue {
        protected languages: string[] = ["html", "css", "javascript"];

        protected mounted(): void {
            this.loadFromStorage();
            this.initEditors();
            this.updateFrame();
        }

        protected updateFrame(forse: boolean = false) {
            forse && (this.$store.state.tick += 1);
            setTimeout(() => {
                this.$store.dispatch("updateDocumentProxy").then(
                    () => this.$store.commit("saveSourceToStorage"),
                );
            }, 420);
        }

        private defineEditor(element: EditorDefineInterface) {
            const editor = monaco.editor.create(
                element.container as HTMLElement,
                MonacoConfiguration(element.value, element.language),
            );
            editor.onDidChangeModelContent(() => {
                this.setSource(element.language, editor.getValue());
                this.updateFrame();
            });
            this.$store.watch(
                (state) => state.tick,
                (value) => {
                    editor.setValue(this.$store.getters[element.language]);
                    return value++;
                },
            );
        }

        private initEditors() {
            this.languages.forEach((language) => {
                this.defineEditor({
                    container: this.$refs[language],
                    value: this.$store.getters[language],
                    language,
                });
            });
        }

        private setSource(lang: string, value: string) {
            this.$store.commit("setSource", {
                language: lang,
                value,
            });
        }

        private loadFromStorage() {
            this.languages.forEach((lang: string) => {
                this.setSource(lang, window.localStorage.getItem(lang) || "");
            });
        }
    }
</script>

<template lang="pug">
   #application
      MenuBarComponentVue
      .editor(ref='editor')
         .editor__window.editor__html(:class="{'editor__hide': !$store.state.view.html}" data-tip="HTML")
            .editor__self(ref="html")
         .editor__window.editor__css(:class="{'editor__hide': !$store.state.view.css}" data-tip="CSS")
            .editor__self(ref="css")
         .editor__window.editor__js(:class="{'editor__hide': !$store.state.view.javascript}" data-tip="JS")
            .editor__self(ref="javascript")
      .resize(ref='resize')
      .frame
         iframe(:srcdoc='$store.getters.document' frameborder='0')
</template>

