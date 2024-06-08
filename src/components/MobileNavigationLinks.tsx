import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const MobileNavigationLinks = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-1">
        <SheetHeader>
          <div className="flex items-center gap-1">
            <Image src="/logo.svg" alt="Jobly" width={50} height={50} className="size-10" />
            <p className="text-base font-medium">Jobly</p>
          </div>
        </SheetHeader>
        <div className="p-1">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigationLinks;
