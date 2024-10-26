"use client";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { type PropsWithRef, forwardRef, useImperativeHandle } from "react";
import RichTextEditorMenubar from "@/components/richTextEditor/RichTextEditorMenubar";

export interface RichTextEditorProps {
  initialValue?: string;
  placeholder?: string;
  onChange?: (html: string) => void;
}

export interface RichTextEditorRef extends HTMLDivElement {
  focus: () => void;
}

const RichTextEditor = forwardRef<
  PropsWithRef<RichTextEditorRef>,
  RichTextEditorProps
>(({ initialValue = "", placeholder = "", onChange }, ref) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
    ],
    content: initialValue,
    onUpdate: ({ editor }) => {
      if (!onChange) return;
      const content = editor.getText() ? editor.getHTML() : "";
      onChange(content);
    },
  });

  useImperativeHandle(ref, () => ({
    ...({} as HTMLDivElement),
    focus: () => {
      if (editor) {
        editor.commands.focus();
      }
    },
  }));

  return (
    <div className="w-full">
      <div className="border border-muted-foreground/50 bg-background overflow-hidden rounded-md editor-input-container">
        <RichTextEditorMenubar editor={editor} />
        <div className="min-h-[200px] overflow-auto">
          <EditorContent
            ref={ref}
            editor={editor}
            className="prose max-w-none focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
});

RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;
