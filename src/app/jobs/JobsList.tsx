'use client';
import { Box, Text, SimpleGrid } from '@chakra-ui/react';
import JobCard from './JobCard';

const JobsList = () => {
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
      >
        <JobCard />
      </SimpleGrid>
    </Box>
  );
};

export default JobsList;
