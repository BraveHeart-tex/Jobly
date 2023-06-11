import SingleJobPageClient from './SingleJobPageClient';

interface IParams {
  jobId: string;
}

const SingleJobPage = ({ params }: { params: IParams }) => {
  return (
    <main>
      <SingleJobPageClient jobId={params.jobId} />
    </main>
  );
};

export default SingleJobPage;
