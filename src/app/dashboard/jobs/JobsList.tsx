'use client';
import {
  Box,
  Text,
  SimpleGrid,
  Spinner,
  Flex,
  useColorMode,
  Heading,
  Button,
} from '@chakra-ui/react';
import JobCard from './JobCard';
import { useQuery } from 'react-query';
import customFetch from '@/app/utils/customFetch';
import { JobApplication } from '@prisma/client';
import { Link } from '@chakra-ui/next-js';
import { useAppSelector } from '@/app/redux/hooks';

const JobsList = () => {
  const {
    searchTerm,
    companySearchTerm,
    applicationStatus,
    jobType,
    sortTerm,
  } = useAppSelector((state) => state.searchReducer);
  const { colorMode } = useColorMode();
  const { isLoading, data: jobApplications } = useQuery<
    JobApplication[],
    Error
  >({
    queryKey: [
      'jobs',
      {
        search: searchTerm,
        company: companySearchTerm,
        status: applicationStatus,
        jobType,
        sort: sortTerm,
      },
    ],
    queryFn: async () => {
      const { data } = await customFetch('/jobs', {
        params: {
          search: searchTerm,
          company: companySearchTerm,
          status: applicationStatus,
          jobType,
          sort: sortTerm,
        },
      });
      return data.jobApplications;
    },
  });

  if (isLoading) {
    return (
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
        height={'35vh'}
      >
        <Flex
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={4}
        >
          <Text color={colorMode === 'light' ? 'gray.600' : 'gray.300'}>
            Loading your job applications...
          </Text>
          <Spinner
            color={colorMode === 'light' ? 'facebook.500' : 'gray.300'}
          />
        </Flex>
      </Flex>
    );
  }

  if (!isLoading && !jobApplications) {
    return (
      <Flex flexDirection={'column'} gap={4} mt={8}>
        <Heading
          as={'h4'}
          fontSize={'2xl'}
          color={colorMode === 'light' ? 'facebook.500' : 'gray.300'}
        >
          No jobs found
        </Heading>
        <Text color={colorMode === 'light' ? 'gray.600' : 'gray.300'}>
          You haven&apos;t added any of your job applications yet. Click on the
          button below to get started.
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
    <Box>
      <Text fontSize={'xl'} my={3}>
        22 Jobs Found
      </Text>
      <SimpleGrid
        columns={{
          base: 1,
          lg: 2,
          xl: 3,
        }}
        gap={6}
      >
        {jobApplications.map((jobApplication) => (
          <JobCard key={jobApplication.id} jobApplication={jobApplication} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default JobsList;
