"use client";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { type ReactQuillProps } from "react-quill";

type QuillEditorProps = ReactQuillProps;

const QuillEditor = ({ ...props }: QuillEditorProps) => {
  return (
    <div className="text-editor">
      <ReactQuill theme="snow" {...props} />
    </div>
  );
};

export default QuillEditor;
