"use client";

import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";

const DocumentBuilderHeader = () => {
  const renameInputRef = useRef<HTMLInputElement>(null);
  const [isRenaming, setIsRenaming] = useState(true);

  return (
    <header className="w-full">
      <div className="flex items-center gap-2 w-full justify-center">
        <div
          className="text-3xl font-semibold max-w-max"
          onClick={() => {
            setIsRenaming(true);
          }}
          onKeyDown={() => {
            setIsRenaming(true);
          }}
        >
          {isRenaming ? (
            <Input
              ref={renameInputRef}
              className="outline-none border-none border-b focus:outline-none focus:border-none focus:ring-0 text-3xl"
              autoFocus
              placeholder="Untitled"
              defaultValue="Untitled"
              onBlur={() => setIsRenaming(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setIsRenaming(false);
                }
              }}
            />
          ) : (
            "Untitled"
          )}
        </div>
      </div>
    </header>
  );
};

export default DocumentBuilderHeader;
