"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import AddProfileSectionDialog from "@/features/user/profile/components/dialogs/AddProfileSectionDialog";
import { DEFAULT_AVATAR_URL } from "@/lib/constants";
import { getAvatarPlaceholder } from "@/lib/utils/string";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

const STICKY_HEADER_DISPLAY_THRESHOLD = 450 as const;

interface UserProfileStickyHeaderProps {
  avatarUrl: string | null;
  title: string | null;
  userFullName: string;
}

const UserProfileStickyHeader = ({
  avatarUrl,
  title,
  userFullName,
}: UserProfileStickyHeaderProps) => {
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
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-150%", opacity: 0 },
      }}
      initial={"hidden"}
      animate={visible ? "visible" : "hidden"}
      transition={{ duration: 0.4, ease: "linear" }}
      className="fixed left-0 top-[3.3rem] w-full bg-background border-t z-10 shadow-xl hidden md:block"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between py-2">
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
            <AvatarImage
              src={avatarUrl || DEFAULT_AVATAR_URL}
              alt={
                avatarUrl
                  ? `Profile picture for ${userFullName}`
                  : "Default profile picture"
              }
            />
            <AvatarFallback className="text-lg">
              {getAvatarPlaceholder(userFullName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-base font-semibold">{userFullName}</h4>
            <p className="text-sm">{title}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <AddProfileSectionDialog />
          <Button variant={"secondary"}>About this profile</Button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfileStickyHeader;
