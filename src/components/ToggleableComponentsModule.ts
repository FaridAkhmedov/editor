import {Module, VuexModule, Mutation} from 'vuex-module-decorators';

@Module
export default class ToggleableComponentsModule extends VuexModule {
    public html: boolean = true;
    public css: boolean = true;
    public javascript: boolean = true;
    public templatesButton: boolean = false;
}
