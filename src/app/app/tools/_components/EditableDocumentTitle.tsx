"use client";

import { Input } from "@/components/ui/input";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const EditableDocumentTitle = () => {
  const [focused, setFocused] = useState(false);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const documentTitle =
    useDocumentBuilderStore((state) => state.document?.title) || "Untitled";
  const setDocumentValue = useDocumentBuilderStore(
    (state) => state.setDocumentValue,
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (spanRef.current && containerRef.current) {
      const PLACEHOLDER_OFFSET_PX = 26;
      const spanWidth = spanRef.current.offsetWidth + PLACEHOLDER_OFFSET_PX;
      containerRef.current.style.width = `${spanWidth}px`;
    }
  }, [documentTitle]);

  return (
    <div className="flex items-center gap-2 w-full justify-center">
      <div className="text-3xl font-semibold w-full flex items-center justify-center">
        <div className="inline-block h-10" ref={containerRef}>
          <span
            ref={spanRef}
            className="absolute whitespace-pre text-3xl font-semibold"
            style={{
              visibility: "hidden",
            }}
          >
            {documentTitle}
          </span>
          <Input
            className="bg-transparent border-0 text-3xl font-semibold focus:outline-none focus-visible:ring-0 shadow-none  rounded-none text-center overflow-visible w-full p-0"
            placeholder={documentTitle}
            defaultValue={documentTitle}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => setDocumentValue("title", e.target.value)}
          />
          <AnimatePresence>
            {focused && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ width: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-primary w-full h-[2px] mx-auto"
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default EditableDocumentTitle;
