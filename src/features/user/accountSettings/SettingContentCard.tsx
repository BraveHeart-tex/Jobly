import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type React from "react";

interface SettingContentCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const SettingContentCard = ({
  title,
  description,
  children,
}: SettingContentCardProps) => {
  return (
    <Card className="shadow-none border-0 lg:shadow lg:border bg-background lg:bg-card">
      <CardHeader className="p-0 lg:p-6">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-0 lg:p-6">{children}</CardContent>
    </Card>
  );
};
export default SettingContentCard;
