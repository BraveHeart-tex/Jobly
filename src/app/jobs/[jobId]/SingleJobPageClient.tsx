'use client';

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
} from '@chakra-ui/react';

const SingleJobPageClient = () => {
  return (
    <Box>
      <Stack>
        <Box>
          <Heading color={'gray.700'}>Software Engineer</Heading>
          <Text color={'gray.500'}>Some Company Inc.</Text>
        </Box>
        <Stack p={8} boxShadow={'md'} gap={8}>
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
              color={'gray.600'}
            >
              &ldquo;This is a great company to work for. I really like the
              people and the culture. I hope I get the job! &rdquo;
            </Text>
          </Stat>
        </Stack>
      </Stack>
      <Button
        mt={4}
        bg={'gray.700'}
        color={'white'}
        _hover={{
          bg: 'gray.600',
        }}
      >
        <Link href={'/jobs'}>Back to Jobs List</Link>
      </Button>
    </Box>
  );
};

export default SingleJobPageClient;
