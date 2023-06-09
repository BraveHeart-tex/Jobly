'use client';
import { Box, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import ResponsiveChartContainer from './components/ResponsiveChartContainer';
import JobStatusCard from './components/StatsPage/JobStatusCard';

const ApplicationStatsClient = () => {
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} gap={4}>
        <JobStatusCard />
      </SimpleGrid>
      <Box mt={'64px'}>
        <ResponsiveChartContainer />
      </Box>
    </Box>
  );
};

export default ApplicationStatsClient;
