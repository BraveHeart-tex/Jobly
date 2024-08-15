"use client";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import RichTextEditorMenubar from "./RichTextEditorMenubar";
import { useState } from "react";
import { cn } from "@/lib/utils";

type RichTextEditorProps = {
  initialValue?: string;
  placeholder?: string;
  onChange?: (html: string) => void;
};

const RichTextEditor = ({
  initialValue = "",
  placeholder = "",
  onChange,
}: RichTextEditorProps) => {
  const [focused, setFocused] = useState(false);
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
      const html = editor.getHTML();
      onChange(html);
    },
    onFocus: () => {
      setFocused(true);
    },
    onBlur: () => {
      setFocused(false);
    },
  });

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="border rounded-lg border-muted-foreground/50 bg-background">
        <RichTextEditorMenubar editor={editor} />
        <div
          className={cn(
            "min-h-[200px] overflow-auto",
            focused && "outline outline-primary outline-1  rounded-b-md",
          )}
        >
          <EditorContent
            editor={editor}
            className="prose max-w-none focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
