"use client";
import { useState } from "react";
import DocumentBuilderInput from "./DocumentBuilderInput";
import EditableSectionTitle from "./EditableSectionTitle";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const CvBuilderPersonalDetailsSection = () => {
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  return (
    <>
      <EditableSectionTitle defaultValue="Personal Details" />
      <div className="grid gap-6">
        <DocumentBuilderInput
          label="Wanted Job Title"
          fieldName="wantedJobTitle"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DocumentBuilderInput label="First Name" fieldName="firstName" />
          <DocumentBuilderInput label="Last Name" fieldName="lastName" />
          <DocumentBuilderInput label="Email" fieldName="email" />
          <DocumentBuilderInput label="Phone" fieldName="phone" />
          <DocumentBuilderInput label="Country" fieldName="country" />
          <DocumentBuilderInput label="City" fieldName="city" />
          <div className="lg:col-span-2">
            <AnimatePresence>
              {showAdditionalDetails && (
                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <DocumentBuilderInput label="Address" fieldName="address" />
                  <DocumentBuilderInput
                    label="Postal Code"
                    fieldName="postalCode"
                  />
                  <DocumentBuilderInput
                    label="Driving License"
                    fieldName="drivingLicense"
                  />
                  <DocumentBuilderInput
                    label="Nationality"
                    fieldName="nationality"
                  />
                  <DocumentBuilderInput
                    label="Place of Birth"
                    fieldName="placeOfBirth"
                  />
                  <DocumentBuilderInput
                    label="Date of Birth"
                    fieldName="dateOfBirth"
                  />
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
