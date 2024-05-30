import { getGeneric } from "@/lib/generic";
import EditJobPageClient from "./EditJobPageClient";
import { JobApplication } from "@prisma/client";
import AnimationRoot from "@/components/animations/AnimationRoot";

interface IParams {
  jobId: string;
}

const EditJobPage = async ({ params }: { params: IParams }) => {
  const jobId = parseInt(params.jobId);
  const result = await getGeneric<JobApplication>({
    tableName: "jobApplication",
    whereCondition: { id: jobId },
  });

  const jobApplication = result?.data;

  return (
    <AnimationRoot>
      <EditJobPageClient jobApplication={jobApplication} />
    </AnimationRoot>
  );
};

export default EditJobPage;
