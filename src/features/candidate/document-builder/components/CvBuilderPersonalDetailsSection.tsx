"use client";
import { Button } from "@/components/ui/button";
import { INTERNAL_SECTION_TAGS } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import DocumentBuilderInput from "@/features/candidate/document-builder/components/DocumentBuilderInput";
import EditableSectionTitle from "@/features/candidate/document-builder/components/EditableSectionTitle";
import {
  useDocumentSectionByInternalTag,
  useSectionFields,
} from "@/features/candidate/document-builder/selectors";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";

const CvBuilderPersonalDetailsSection = () => {
  const section = useDocumentSectionByInternalTag(
    INTERNAL_SECTION_TAGS.PERSONAL_DETAILS,
  );
  const fields = useSectionFields(section?.id);

  return (
    <>
      <EditableSectionTitle section={section} />
      <div className="grid gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {fields.slice(0, 6).map((field) => (
            <DocumentBuilderInput key={field.id} field={field} />
          ))}
          <AdditionalDetails fields={fields} />
        </div>
      </div>
    </>
  );
};

const AdditionalDetails = ({ fields }: { fields: DocumentSectionField[] }) => {
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);

  return (
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
  );
};

export default CvBuilderPersonalDetailsSection;
