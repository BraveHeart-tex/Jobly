'use client';
import { chakra, Box, useColorMode } from '@chakra-ui/react';
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
  const { colorMode } = useColorMode();
  // FIXME: REFACTOR THIS
  const getBorderBottomColorByStatus = (jobStatusData: JobStatusData) => {
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
  const getHeadingTextByStatus = (jobStatusData: JobStatusData) => {
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
  const getIconByStatus = (jobStatusData: JobStatusData) => {
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
          bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
          borderBottom={'4px solid'}
          borderBottomColor={getBorderBottomColorByStatus(data)}
        >
          <chakra.header
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            mb={4}
            color={colorMode === 'light' ? 'gray.800' : 'gray.100'}
          >
            <chakra.span fontSize={'4xl'}>{data.count}</chakra.span>
            <chakra.span>{getIconByStatus(data)}</chakra.span>
          </chakra.header>
          <chakra.p
            fontSize={'lg'}
            color={colorMode === 'light' ? 'gray.500' : 'gray.300'}
          >
            {getHeadingTextByStatus(data)}
          </chakra.p>
        </Box>
      ))}
    </>
  );
};

export default JobStatusCard;
