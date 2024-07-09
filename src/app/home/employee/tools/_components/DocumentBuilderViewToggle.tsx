"use client";

import { useDocumentBuilderSearchParams } from "@/app/home/employee/tools/_hooks/useDocumentBuilderSearchParams";
import { Button } from "@/components/ui/button";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { File } from "lucide-react";
import { useState } from "react";

const DocumentBuilderViewToggle = () => {
  const { setView } = useDocumentBuilderSearchParams();
  const [shouldShowButtonText, setShouldShowButtonText] = useState(false);
  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setShouldShowButtonText(latest === 1 || latest === 0);
  });

  return (
    <Button
      className="fixed right-5 bottom-2 z-50 transition-all flex xl:hidden items-center gap-2 rounded-full hover:bg-opacity-95 ease-in-out text-base py-7 px-5"
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
      <File size={24} />
    </Button>
  );
};

export default DocumentBuilderViewToggle;
