'use client';

import customFetch from '@/app/utils/customFetch';
import { Link } from '@chakra-ui/next-js';
import {
  Box,
  Button,
  Heading,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';

interface ISingleJobPageClientProps {
  jobId: string;
}

const SingleJobPageClient = ({ jobId }: ISingleJobPageClientProps) => {
  const { data, isLoading } = useQuery({
    queryKey: 'jobs',
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${jobId}`);
      return data.job;
    },
  });

  console.log(data);

  return (
    <Box>
      <Stack>
        <Box>
          <Heading color={useColorModeValue('facebook.500', 'gray.200')}>
            Software Engineer
          </Heading>
          <Text color={useColorModeValue('gray.500', 'gray.400')}>
            Some Company Inc.
          </Text>
        </Box>
        <Stack
          background={useColorModeValue('gray.100', 'gray.800')}
          p={8}
          boxShadow={'md'}
          gap={8}
          color={useColorModeValue('gray.600', 'gray.300')}
        >
          <Stat>
            <StatLabel>Job Location</StatLabel>
            <StatNumber>Los Angeles, CA</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Job Type</StatLabel>
            <StatNumber>Remote</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Application Created At</StatLabel>
            <StatNumber>13.03.2023</StatNumber>
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
              color={useColorModeValue('gray.600', 'gray.400')}
            >
              &ldquo;This is a great company to work for. I really like the
              people and the culture. I hope I get the job! &rdquo;
            </Text>
          </Stat>
        </Stack>
      </Stack>
      <Button
        mt={4}
        bg={useColorModeValue('facebook.500', 'gray.700')}
        color={'white'}
        _hover={{
          bg: useColorModeValue('facebook.300', 'gray.600'),
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
