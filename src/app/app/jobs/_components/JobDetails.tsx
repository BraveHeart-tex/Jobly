import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getAvatarPlaceholder } from "@/lib/utils";
import { api } from "@/trpc/server";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import JobDetailsContainer from "./JobDetailsContainer";

type JobDetailsProps = {
  currentJobId: number;
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

const JobDetails = async ({ currentJobId }: JobDetailsProps) => {
  const jobDetails = await api.job.getJobById({ id: currentJobId });

  if (!jobDetails) return null;

  // Do mutation
  // if (!jobDetails.userViewedJob) {
  // }

  return (
    <JobDetailsContainer
      currentJobId={currentJobId}
      className="h-full overflow-auto rounded-lg bg-background p-4"
    >
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {renderCompanyLogo(
            jobDetails?.company.name,
            jobDetails?.company.logo,
            "size-14",
          )}
          <div className="grid">
            <h2 className="text-2xl font-semibold tracking-tight">
              {jobDetails.title}
            </h2>
            <p className="text-base text-muted-foreground">
              {jobDetails.company.name}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button>Apply Now</Button>
          <Button variant="secondary" className="flex items-center gap-1">
            <Bookmark size={18} />
            Save
          </Button>
        </div>
      </header>

      <div className="mt-12">
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
      </div>
    </JobDetailsContainer>
  );
};

export default JobDetails;
