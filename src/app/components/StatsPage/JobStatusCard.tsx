'use client';
import { chakra, Box } from '@chakra-ui/react';
import React from 'react';
import {
  AiOutlineClockCircle,
  AiOutlineDelete,
  AiOutlineHourglass,
} from 'react-icons/ai';

const exampleData = [
  {
    status: 'pending',
    count: 24,
  },
  {
    status: 'interview',
    count: 10,
  },
  {
    status: 'rejected',
    count: 7,
  },
];

interface JobStatusData {
  status: string;
  count: number;
}

// interface IJobStatusCardProps {
//   data: JobStatusData[];
// }

const JobStatusCard = () => {
  // FIXME: REFACTOR THIS
  const borderBottomColor = (jobStatusData: JobStatusData) => {
    if (jobStatusData.status === 'pending') {
      return 'orange.500';
    }
    if (jobStatusData.status === 'interview') {
      return 'blue.500';
    }
    if (jobStatusData.status === 'rejected') {
      return 'red.500';
    }
  };

  // FIXME: REFACTOR THIS
  const headingText = (jobStatusData: JobStatusData) => {
    if (jobStatusData.status === 'pending') {
      return 'Pending Applications';
    }
    if (jobStatusData.status === 'interview') {
      return 'Scheduled Interviews';
    }
    if (jobStatusData.status === 'rejected') {
      return 'Declined Applications';
    }
  };

  // FIXME: REFACTOR THIS
  const icon = (jobStatusData: JobStatusData) => {
    if (jobStatusData.status === 'pending') {
      return <AiOutlineClockCircle size={50} />;
    }
    if (jobStatusData.status === 'interview') {
      return <AiOutlineHourglass size={50} />;
    }
    if (jobStatusData.status === 'rejected') {
      return <AiOutlineDelete size={50} />;
    }
  };

  return (
    <>
      {exampleData.map((data) => (
        <Box
          key={data.status}
          p={'32px'}
          rounded={'md'}
          boxShadow={'md'}
          borderBottom={'4px solid'}
          borderBottomColor={borderBottomColor(data)}
        >
          <chakra.header
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            mb={4}
          >
            <chakra.span fontSize={'4xl'}>{data.count}</chakra.span>
            <chakra.span>{icon(data)}</chakra.span>
          </chakra.header>
          <chakra.p fontSize={'lg'}>{headingText(data)}</chakra.p>
        </Box>
      ))}
    </>
  );
};

export default JobStatusCard;
