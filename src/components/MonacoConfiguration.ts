import { editor } from 'monaco-editor';
import IEditorConstructionOptions = editor.IEditorConstructionOptions;

export default function MonacoConfiguration(value: string, language: string): IEditorConstructionOptions {
  return {
    value,
    language,
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
      horizontalScrollbarSize: 8,
    },
    automaticLayout: true,
    fontFamily: '"Fira Code", monospace',
    minimap: {
      enabled: false,
    },
  };
}
