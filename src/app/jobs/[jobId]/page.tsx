import { Button } from '@chakra-ui/react';
import SingleJobPageClient from './SingleJobPageClient';

interface IParams {
  jobId: string;
}

const SingleJobPage = ({ params }: { params: IParams }) => {
  return (
    <main>
      <SingleJobPageClient />
    </main>
  );
};

export default SingleJobPage;
