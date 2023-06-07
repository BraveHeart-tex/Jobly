'use client';
import { Box, SimpleGrid } from '@chakra-ui/react';
import JobStatusCard from '../components/StatsPage/JobStatusCard';
import ResponsiveChartContainer from '../components/ResponsiveChartContainer';

const StatsPage = () => {
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

export default StatsPage;
