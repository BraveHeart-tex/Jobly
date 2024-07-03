"use client";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import type { ReactQuillProps } from "react-quill";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type QuillEditorProps = ReactQuillProps;

const QuillEditor = ({ ...props }: QuillEditorProps) => {
  return (
    <div className="text-editor w-full overflow-auto">
      <ReactQuill theme="snow" {...props} />
    </div>
  );
};

export default QuillEditor;
