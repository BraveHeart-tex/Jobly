"use client";

import { Button } from "@/components/ui/button";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { File } from "lucide-react";
import { type RefObject, forwardRef, useState } from "react";

const DocumentBuilderViewToggler = forwardRef<HTMLDivElement>((_, ref) => {
  const setView = useDocumentBuilderStore((state) => state.setView);
  const [shouldShowButtonText, setShouldShowButtonText] = useState(false);
  const { scrollYProgress } = useScroll({ container: ref as RefObject<HTMLDivElement> });
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setShouldShowButtonText(latest === 1 || latest === 0);
  });

  return (
    <Button
      className="fixed right-[52%] bottom-5 z-50 transition-all flex items-center gap-2 rounded-full hover:bg-opacity-95 ease-in-out text-lg py-8 px-6"
      size="lg"
      onClick={() => setView("preview")}
    >
      <AnimatePresence initial={false}>
        {shouldShowButtonText && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{
              opacity: 1,
              width: "auto",
              transition: {
                opacity: { duration: 0.15, delay: 0.15 },
                width: { duration: 0.15 },
              },
            }}
            exit={{
              opacity: 0,
              width: 0,
              transition: {
                opacity: { duration: 0.15 },
                width: { duration: 0.15, delay: 0.15 },
              },
            }}
            transition={{ duration: 0.3 }}
            className="font-medium text-primary-foreground"
          >
            Preview & Download
          </motion.div>
        )}
      </AnimatePresence>
      <File />
    </Button>
  );
});

export default DocumentBuilderViewToggler;
