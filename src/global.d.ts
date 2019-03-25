import vue, {VNode} from 'vue';

declare module '*.txt' {
  const content: string;
  export default content;
}

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {
    }

    // tslint:disable no-empty-interface
    interface ElementClass extends vue {
    }

    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

declare module '*.vue' {
  import vue from 'vue';
  export default vue;
}
