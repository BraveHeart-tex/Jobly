"use client";
import { Button } from "@/components/ui/button";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import DocumentBuilderInput from "./DocumentBuilderInput";
import EditableSectionTitle from "./EditableSectionTitle";

const CvBuilderPersonalDetailsSection = () => {
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const fields = useDocumentBuilderStore((state) => state.fields);
  const documentTitle = useDocumentBuilderStore(
    (state) => state.document.title,
  );
  const setDocumentValue = useDocumentBuilderStore(
    (state) => state.setDocumentValue,
  );

  return (
    <>
      <EditableSectionTitle defaultValue="Personal Details" />
      <div className="grid gap-6">
        <DocumentBuilderInput
          value={documentTitle}
          onChange={(value) => setDocumentValue("title", value)}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {fields.slice(0, 6).map((field) => (
            <DocumentBuilderInput key={field.id} field={field} />
          ))}
          <div className="lg:col-span-2">
            <AnimatePresence>
              {showAdditionalDetails && (
                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  {fields.slice(6).map((field) => (
                    <DocumentBuilderInput key={field.id} field={field} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            <Button
              variant="ghost"
              className="flex items-center gap-1 bg-transparent hover:bg-transparent px-0 text-primary"
              onClick={() => {
                setShowAdditionalDetails(!showAdditionalDetails);
              }}
            >
              <span>
                {showAdditionalDetails ? "Hide" : "Edit"} additional details
              </span>
              {showAdditionalDetails ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CvBuilderPersonalDetailsSection;
