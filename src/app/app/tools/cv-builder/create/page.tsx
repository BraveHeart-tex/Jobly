"use client";
import { useRef } from "react";
import DocumentBuilderHeader from "../../_components/DocumentBuilderHeader";
import DocumentBuilderViewToggler from "../../_components/DocumentBuilderViewToggler";

const CreateCvPage = () => {
  const builderContainerRef = useRef<HTMLDivElement | null>(null);
  return (
    <main className="grid grid-cols-2 fixed top-0 z-50 w-full">
      <div className="bg-card min-h-screen p-10 overflow-auto max-h-screen" ref={builderContainerRef}>
        <div className="max-w-screen-2xl mx-auto flex items-center justify-center">
          <DocumentBuilderHeader />
          <DocumentBuilderViewToggler ref={builderContainerRef} />
        </div>
      </div>
      <div className="bg-muted-foreground min-h-screen flex items-center justify-center flex-col">
        Resume Live Preview
      </div>
    </main>
  );
};

export default CreateCvPage;
