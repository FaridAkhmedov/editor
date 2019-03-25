import { Module, VuexModule, Mutation } from 'vuex-module-decorators';

interface SetSourceInterface {
  language: string;
  value: string;
}

@Module
export default class Source extends VuexModule {
  private javascriptCode: string = '';
  private htmlCode: string = '';
  private cssCode: string = '';

  get html() {
    return this.htmlCode;
  }

  get css() {
    return this.cssCode;
  }

  get javascript() {
    return this.javascriptCode;
  }

  @Mutation
    public setSource(_: SetSourceInterface) {
    if (Object.hasOwnProperty.call(this, `${_.language}Code`)) {
            // @ts-ignore
      this[`${_.language}Code`] = _.value;
    }
  }

  @Mutation
    public saveSourceToStorage() {
    window.localStorage.setItem('html', this.htmlCode);
    window.localStorage.setItem('css', this.cssCode);
    window.localStorage.setItem('javascript', this.javascriptCode);
  }
}
