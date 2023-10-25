import { BODY_CREATE_BLOG } from "@/types/blog.type";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import "@ckeditor/ckeditor5-build-decoupled-document/build/translations/es";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const MyEditor = ({ state, setState }: { state: BODY_CREATE_BLOG; setState: Function }) => {
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
      data={state.content}
      onChange={(event, editor) => {
        const temp = editor.getData();
        setState({ ...state, content: temp });
      }}
    />
  );
};

export default MyEditor;
