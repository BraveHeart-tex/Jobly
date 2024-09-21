"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { CtxUserAttributes } from "@/lib/auth";

interface EditUserProfileFormProps {
  user: CtxUserAttributes;
}

const EditUserProfileForm = ({ user }: EditUserProfileFormProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const profileTabItems = [
    {
      title: "Personal Details",
    },
    {
      title: "Work Experience",
    },
    {
      title: "Education",
    },
    {
      title: "Skills",
    },
  ];

  return (
    <div>
      <nav
        className="flex space-x-1 rounded-lg bg-muted p-1 overflow-x-auto w-full rounded-b-none"
        aria-label="Tabs"
      >
        {profileTabItems.map((tab, index) => (
          <button
            type="button"
            onClick={() => setActiveTab(index)}
            key={tab.title}
            className={cn(
              "w-full rounded-md px-3 py-1.5 text-sm font-medium leading-5 text-muted-foreground relative whitespace-nowrap",
            )}
            aria-current={activeTab === index ? "page" : undefined}
          >
            {activeTab === index && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-background rounded-md"
                style={{ borderRadius: 6 }}
                transition={{ type: "spring", duration: 0.6, bounce: 0.1 }}
              />
            )}
            <span className="relative z-10">{tab.title}</span>
          </button>
        ))}
      </nav>
      <div className="w-full overflow-auto p-4 rounded-md border rounded-t-none h-[calc(100vh-13rem)]">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
        >
          {activeTab === 0 && (
            <div>
              <div className="grid gap-2">
                <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  Personal Information
                </h2>
                <p className="text-muted-foreground text-sm">
                  Provide your basic personal details.
                </p>
              </div>
            </div>
          )}
          {activeTab === 1 && (
            <div>
              <div className="grid gap-2">
                <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  Work Experience
                </h2>
                <p className="text-muted-foreground text-sm">
                  Add your most recent work experience.
                </p>
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div>
              <div className="grid gap-2">
                <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  Education
                </h2>
                <p className="text-muted-foreground text-sm">
                  Add your educational background.
                </p>
              </div>
            </div>
          )}
          {activeTab === 3 && (
            <div>
              <div className="grid gap-2">
                <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  Skills
                </h2>
                <p className="text-muted-foreground text-sm">
                  Highlight your skills and proficiency levels.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default EditUserProfileForm;
