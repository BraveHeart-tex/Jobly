import { getGeneric } from "@/lib/generic";
import EditJobPageClient from "./EditJobPageClient";
import { JobApplication } from "@prisma/client";

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
    <main>
      <EditJobPageClient jobApplication={jobApplication} />
    </main>
  );
};

export default EditJobPage;
