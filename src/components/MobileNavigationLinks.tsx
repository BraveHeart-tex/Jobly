"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { APP_NAME } from "@/lib/constants";
import { getNavigationLinksByRole } from "@/lib/navigationLinks";
import type { User } from "lucia";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface MobileNavigationLinksProps {
  userRole?: User["role"];
}

const MobileNavigationLinks = ({ userRole }: MobileNavigationLinksProps) => {
  const [open, setOpen] = useState(false);
  const navigationLinks = getNavigationLinksByRole(userRole);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-1">
        <SheetHeader>
          <div className="flex items-center gap-1">
            <Image
              src="/logo.svg"
              alt={`${APP_NAME} Logo`}
              width={50}
              height={50}
              priority
              className="size-10"
            />
            <p className="text-lg font-medium">{APP_NAME}</p>
          </div>
        </SheetHeader>

        <div>
          <Accordion
            type="single"
            collapsible
            defaultValue={navigationLinks[0]?.triggerLabel}
          >
            {navigationLinks.map((navigationMenuItem) => (
              <AccordionItem
                value={navigationMenuItem.triggerLabel}
                key={navigationMenuItem.triggerLabel}
              >
                <AccordionTrigger className="text-base data-[state='open']:text-primary data-[state='open']:border-b">
                  {navigationMenuItem.triggerLabel}
                </AccordionTrigger>
                {navigationMenuItem.linkItems.map((linkItem) => (
                  <AccordionContent
                    key={linkItem.href}
                    className="border-b px-1 py-4 hover:bg-muted"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <Link href={linkItem.href}>
                      <div className="mb-1 flex items-center gap-1">
                        <linkItem.icon size={21} />
                        <h3 className="text-base font-medium text-foreground">
                          {linkItem.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {linkItem.description}
                      </p>
                    </Link>
                  </AccordionContent>
                ))}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigationLinks;
