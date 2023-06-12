'use client';

import JobTypeOptions from '@/app/utils/JobTypeOptions';
import customFetch from '@/app/utils/customFetch';
import formatDate from '@/app/utils/formatDate';
import { Link } from '@chakra-ui/next-js';
import {
  Box,
  Button,
  Heading,
  Spinner,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { JobApplication } from '@prisma/client';
import { useQuery } from 'react-query';

interface ISingleJobPageClientProps {
  jobId: string;
}

const SingleJobPageClient = ({ jobId }: ISingleJobPageClientProps) => {
  const colorMode = useColorMode().colorMode;
  const { data, isLoading, isError } = useQuery<JobApplication>({
    queryKey: ['singleJob', jobId],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${jobId}`);
      return data.job;
    },
  });

  if (isError) {
    return (
      <Box height={'100%'} display={'flex'} flexDirection={'column'}>
        <Heading
          color={colorMode === 'light' ? 'facebook.500' : 'gray.200'}
          mb={3}
        >
          404 Job Not Found :(
        </Heading>
        <Text mr={2} color={'gray.500'}>
          No job data was found for the given id: {jobId}
        </Text>
        <Button
          width={'fit-content'}
          mt={4}
          bg={colorMode === 'light' ? 'facebook.500' : 'gray.700'}
          color={'white'}
          _hover={{
            bg: colorMode === 'light' ? 'facebook.300' : 'gray.600',
          }}
        >
          <Link
            href={'/dashboard/jobs'}
            _hover={{
              textDecoration: 'none',
            }}
          >
            Back to Jobs List
          </Link>
        </Button>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box height={'100%'} display={'flex'}>
        <Text mr={2} color={'gray.500'}>
          Loading...
        </Text>
        <Spinner color='facebook.500' />
      </Box>
    );
  }

  return (
    <Box>
      <Stack>
        <Box>
          <Heading color={colorMode === 'light' ? 'facebook.500' : 'gray.200'}>
            {data?.jobTitle}
          </Heading>
          <Text color={colorMode === 'light' ? 'gray.500' : 'gray.400'}>
            {data?.companyName}
          </Text>
        </Box>
        <Stack
          background={colorMode === 'light' ? 'gray.100' : 'gray.800'}
          p={8}
          boxShadow={'md'}
          gap={8}
          color={colorMode === 'light' ? 'gray.600' : 'gray.300'}
        >
          <Stat>
            <StatLabel>Job Location</StatLabel>
            <StatNumber>{data?.location}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Job Type</StatLabel>
            <StatNumber>{JobTypeOptions[data?.jobType!]}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Application Created At</StatLabel>
            <StatNumber>{formatDate(new Date(data?.createdAt!))}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Application Status</StatLabel>
            <StatNumber>Interview</StatNumber>
          </Stat>
          <Stat>
            <Heading as={'h3'} fontSize={'2xl'}>
              Comments
            </Heading>
            <Text
              width={{
                base: '100%',
                lg: '75%',
                xl: '50%',
              }}
              lineHeight={1.7}
              color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
            >
              {data?.comments === ''
                ? 'No comments were added for this job application'
                : null}
              {data?.comments && `"${data?.comments}"`}
            </Text>
          </Stat>
        </Stack>
      </Stack>
      <Button
        width={'fit-content'}
        mt={4}
        bg={colorMode === 'light' ? 'facebook.500' : 'gray.700'}
        color={'white'}
        _hover={{
          bg: colorMode === 'light' ? 'facebook.300' : 'gray.600',
        }}
      >
        <Link
          href={'/dashboard/jobs'}
          _hover={{
            textDecoration: 'none',
          }}
        >
          Back to Jobs List
        </Link>
      </Button>
    </Box>
  );
};

export default SingleJobPageClient;
