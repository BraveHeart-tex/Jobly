import EditJobPageClient from './EditJobPageClient';

interface IParams {
  jobId: string;
}

const EditJobPage = ({ params }: { params: IParams }) => {
  return (
    <main>
      <EditJobPageClient jobId={params.jobId} />
    </main>
  );
};

export default EditJobPage;
