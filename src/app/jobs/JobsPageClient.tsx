'use client';

import { Box, Stack } from '@chakra-ui/react';
import JobsList from './JobsList';
import JobSearchForm from './JobSearchForm';

const JobsPageClient = () => {
  return (
    <Stack>
      <JobSearchForm />
      <JobsList />
    </Stack>
  );
};

export default JobsPageClient;
