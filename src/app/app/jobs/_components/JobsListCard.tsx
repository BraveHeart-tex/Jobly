"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ROUTES } from "@/lib/constants";
import type { ArrayElement } from "@/lib/types";
import {
  cn,
  generateReadableEnumLabel,
  getAvatarPlaceholder,
} from "@/lib/utils";
import type { RouterOutputs } from "@/trpc/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type JobsListCardProps = {
  job: ArrayElement<RouterOutputs["job"]["getJobListings"]>;
  isActive?: boolean;
};

export const renderCompanyLogo = (
  companyName: string,
  logo?: string | null,
  className?: string,
) => {
  if (logo) {
    return <Image src={logo} width={80} height={80} alt={companyName} />;
  }

  return (
    <Avatar className={className}>
      <AvatarFallback>{getAvatarPlaceholder(companyName)}</AvatarFallback>
    </Avatar>
  );
};

const JobsListCard = ({ job, isActive }: JobsListCardProps) => {
  const router = useRouter();
  const { id, title, company, employmentType, workType } = job;

  return (
    <div
      onMouseDown={() => {
        router.push(`${ROUTES.JOBS}?currentJobId=${id}`);
      }}
      key={id}
      className={cn(
        "cursor-pointer rounded-md bg-card p-4",
        isActive && "bg-muted-foreground/20 dark:bg-accent",
      )}
    >
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          {renderCompanyLogo(company.name, company.logo)}
          <div className="flex flex-col">
            <h4 className="text-base font-medium text-foreground">{title}</h4>
            <p className="text-sm text-muted-foreground">{company.name}</p>
          </div>
        </div>
        <p className="line-clamp-3 text-foreground/70">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
          debitis, delectus ducimus excepturi expedita harum minus nesciunt
          perferendis quos? A accusantium assumenda atque aut blanditiis culpa
          debitis doloremque earum eius error excepturi fuga ipsum iure, maxime
          minima mollitia natus neque obcaecati omnis pariatur perspiciatis,
          quasi repudiandae tempora vel veritatis voluptatibus?
        </p>
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
          <div className="rounded-md bg-muted p-1 text-muted-foreground">
            {generateReadableEnumLabel(employmentType)}
          </div>
          <div className="rounded-md bg-muted p-1 text-muted-foreground">
            {generateReadableEnumLabel(workType)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsListCard;
