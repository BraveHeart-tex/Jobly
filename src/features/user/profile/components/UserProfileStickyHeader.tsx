"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

const STICKY_HEADER_DISPLAY_THRESHOLD = 330 as const;

const UserProfileStickyHeader = () => {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > STICKY_HEADER_DISPLAY_THRESHOLD);
  });

  const handleHeaderClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: "-150%" },
      }}
      initial={"hidden"}
      animate={visible ? "visible" : "hidden"}
      transition={{ duration: 0.4, ease: "linear" }}
      className="fixed left-0 top-[3.3rem] w-full bg-background border-t z-10 shadow-xl hidden md:block"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between py-2">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleHeaderClick}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              handleHeaderClick();
            }
          }}
        >
          <Avatar>
            <AvatarImage src="/default-avatar.svg" alt="Profile picture" />
            <AvatarFallback className="text-lg">BK</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-base font-semibold">Bora Karaca</h4>
            <p className="text-sm">
              Software Engineer @Mims - Driving Efficiency Through App
              Automations
            </p>
          </div>
        </div>
        <div>
          <Button variant={"secondary"}>About this profile</Button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfileStickyHeader;
