import { type PropsWithRef, forwardRef } from "react";
import RichTextEditor, {
  type RichTextEditorProps,
  type RichTextEditorRef,
} from "./richTextEditor/RichTextEditor";

const EditorInput = forwardRef<
  PropsWithRef<RichTextEditorRef>,
  RichTextEditorProps
>((props, ref) => {
  return (
    <>
      <style jsx global>{`
        .tiptap.ProseMirror {
          min-height: 200px;
          padding: 10px;
          background: hsl(var(--background));
        }
  
        .editor-input-container {
          border: 1px solid hsl(var(--input));
        }
  
        .editor-input-menubar {
          border-bottom: 1px solid hsl(var(--input));
        }
      `}</style>
      <RichTextEditor ref={ref} {...props} />
    </>
  );
});

EditorInput.displayName = "EditorInput";

export default EditorInput;
