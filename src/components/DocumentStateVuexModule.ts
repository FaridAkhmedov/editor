import { Module, VuexModule, Mutation } from 'vuex-module-decorators';

const template = (html: string, css: string, js: string): string => {
  return `${html}<style>${css}</style><script>${js}<\/script>`;
};

interface SetSourceInterface {
  html: string;
  css: string;
  javascript: string;
}

@Module
export default class DocumentStateVuexModule extends VuexModule {
  private documentRaw: string = '';

  get document() {
    return this.documentRaw;
  }

  @Mutation
    public updateDocument(data: SetSourceInterface) {
    return this.documentRaw = template(data.html, data.css, data.javascript);
  }
}
