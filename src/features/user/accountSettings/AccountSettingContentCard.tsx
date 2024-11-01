import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type React from "react";

interface AccountSettingContentCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  contentClassName?: string;
}

const AccountSettingContentCard = ({
  title,
  description,
  children,
  contentClassName,
}: AccountSettingContentCardProps) => {
  return (
    <Card className="shadow-none border-0 lg:shadow lg:border bg-background lg:bg-card">
      <CardHeader className="p-0 lg:p-6 mb-4 lg:mb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent
        className={cn("pt-4 lg:pt-0 space-y-6 p-0 lg:p-6", contentClassName)}
      >
        {children}
      </CardContent>
    </Card>
  );
};
export default AccountSettingContentCard;
