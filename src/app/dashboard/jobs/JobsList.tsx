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
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const JobsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
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
        page: currentPage,
      },
    ],
    queryFn: async () => {
      const { data } = await customFetch('/jobs', {
        params: {
          page: currentPage,
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

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <Box>
      <Text fontSize={'xl'} my={3}>
        {jobApplications.length} Jobs Found
      </Text>
      <SimpleGrid
        columns={{
          base: 1,
          lg: 2,
          xl: 3,
        }}
        gap={6}
      >
        {jobApplications.length === 0 && (
          <Box>
            <Heading
              color={colorMode === 'light' ? 'facebook.500' : 'gray.300'}
              fontSize={'3xl'}
            >
              No jobs found.
            </Heading>
            <Text color={colorMode === 'light' ? 'gray.500' : 'gray.400'}>
              Try again by changing removing any existing filters.
            </Text>
          </Box>
        )}
        {jobApplications.map((jobApplication) => (
          <JobCard key={jobApplication.id} jobApplication={jobApplication} />
        ))}
      </SimpleGrid>
      <Box display={'flex'} justifyContent={'center'} gap={4} mt={4}>
        <Button
          colorScheme='facebook'
          leftIcon={<ArrowLeftIcon />}
          isDisabled={currentPage === 1}
          onClick={handlePreviousPage}
        >
          Previous
        </Button>
        <Button
          colorScheme='facebook'
          rightIcon={<ArrowRightIcon />}
          onClick={handleNextPage}
          isDisabled={
            jobApplications.length < itemsPerPage ||
            jobApplications.length === 0
          }
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default JobsList;
