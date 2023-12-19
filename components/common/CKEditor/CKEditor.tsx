import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import "@ckeditor/ckeditor5-build-decoupled-document/build/translations/es";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const MyEditor = ({ state, onChange }: { state: string; onChange: Function }) => {
  return (
    <CKEditor
      editor={DecoupledEditor}
      onReady={(editor) => {
        const editorElement = editor.ui.getEditableElement();
        const toolbarElement = editor?.ui.view.toolbar.element;

        if (editorElement && toolbarElement) {
          const parentElement = editorElement?.parentElement;
          if (parentElement) {
            parentElement.insertBefore(toolbarElement, editorElement);
          }
        }
      }}
      data={state}
      onChange={(event, editor) => {
        const temp = editor.getData();
        onChange(temp);
      }}
    />
  );
};

export default MyEditor;
