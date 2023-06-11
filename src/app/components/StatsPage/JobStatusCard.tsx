'use client';
import customFetch from '@/app/utils/customFetch';
import {
  chakra,
  Box,
  Text,
  useColorMode,
  Flex,
  Spinner,
  Button,
  Heading,
  Link,
} from '@chakra-ui/react';
import React from 'react';
import {
  AiOutlineClockCircle,
  AiOutlineDelete,
  AiOutlineHourglass,
} from 'react-icons/ai';
import { useQuery } from 'react-query';

interface TotalJobApplicationStat {
  status: string;
  count: number;
}

const JobStatusCard = () => {
  const { data: totalStatsData, isLoading } = useQuery<
    TotalJobApplicationStat[]
  >({
    queryKey: 'jobStatusData',
    queryFn: async () => {
      const { data } = await customFetch.get('/jobs/totalStats');
      return data.totalApplicationStats;
    },
  });

  const { colorMode } = useColorMode();
  // FIXME: REFACTOR THIS
  const getBorderBottomColorByStatus = (
    jobStatusData: TotalJobApplicationStat
  ) => {
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
  const getHeadingTextByStatus = (jobStatusData: TotalJobApplicationStat) => {
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
  const getIconByStatus = (jobStatusData: TotalJobApplicationStat) => {
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

  if (!isLoading && !totalStatsData) {
    return (
      <Flex flexDirection={'column'} gap={4} mt={8}>
        <Heading
          as={'h4'}
          fontSize={'2xl'}
          color={colorMode === 'light' ? 'facebook.500' : 'gray.300'}
        >
          No data was found to populate insight cards
        </Heading>
        <Text color={colorMode === 'light' ? 'gray.600' : 'gray.300'}>
          It seems like you haven&apos;t added any of your job applications yet.
          Click on the button below to get started.
        </Text>
        <Button
          color={'white'}
          bg={colorMode === 'light' ? 'facebook.500' : 'gray.700'}
          _hover={{
            bg: colorMode === 'light' ? 'facebook.300' : 'gray.600',
          }}
          width={'fit-content'}
        >
          <Link
            href={'/dashboard/jobs/add'}
            _hover={{
              textDecoration: 'none',
            }}
          >
            Add Your Application Information
          </Link>
        </Button>
      </Flex>
    );
  }

  return (
    <>
      {totalStatsData &&
        totalStatsData.map((data) => (
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
