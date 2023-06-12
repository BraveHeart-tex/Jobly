'use client';
import customFetch from '@/app/utils/customFetch';
import {
  Box,
  Flex,
  Heading,
  Spinner,
  useColorMode,
  Text,
  Button,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import EditJobModalForm from './EditJobForm';
import { JobApplication } from '@prisma/client';
import { Link } from '@chakra-ui/next-js';

interface IEditJobPageClientProps {
  jobId: string;
}

const EditJobPageClient = ({ jobId }: IEditJobPageClientProps) => {
  const colorMode = useColorMode().colorMode;
  const { data, isLoading } = useQuery<JobApplication>({
    queryKey: ['fetchJobById', jobId],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${jobId}`);
      return data.job;
    },
  });

  if (isLoading) {
    return (
      <Flex alignItems={'center'}>
        <Heading
          mr={4}
          color={colorMode === 'light' ? 'facebook.500' : 'gray.200'}
          fontSize={'xl'}
        >
          Loading job application data...
        </Heading>
        <Spinner color='facebook.500' />
      </Flex>
    );
  }

  if (!data) {
    return (
      <Box>
        <Heading
          mr={4}
          color={colorMode === 'light' ? 'facebook.500' : 'gray.200'}
          fontSize={'3xl'}
        >
          404 Job Not Found
        </Heading>
        <Text mt={3} color={colorMode === 'light' ? 'gray.500' : 'gray.400'}>
          It seems that the job application you are looking for does not exist.
        </Text>
        <Button
          color={'white'}
          bg={colorMode === 'light' ? 'facebook.500' : 'gray.700'}
          mt={6}
          _hover={{
            bg: colorMode === 'light' ? 'facebook.300' : 'gray.600',
          }}
        >
          <Link
            _hover={{
              textDecoration: 'none',
            }}
            textTransform={'capitalize'}
            href={'/dashboard/jobs'}
          >
            Go back to jobs list
          </Link>
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Heading
        color={colorMode === 'light' ? 'facebook.500' : 'gray.200'}
        mb={6}
      >
        Editing: {data.jobTitle} at {data.companyName}
      </Heading>
      <EditJobModalForm currentJobApplication={data} />
      <Button
        color={'gray.500'}
        variant={'ghost'}
        _hover={{
          bg: colorMode === 'light' ? 'facebook.100' : 'gray.700',
        }}
      >
        <Link
          _hover={{
            textDecoration: 'none',
          }}
          textTransform={'capitalize'}
          href={'/dashboard/jobs'}
        >
          Go back to jobs list
        </Link>
      </Button>
    </Box>
  );
};

export default EditJobPageClient;
