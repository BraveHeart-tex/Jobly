'use client';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import BarChartComponent from './Charts/BarChartComponent';

const ResponsiveChartContainer = () => {
  const exampleData = [
    {
      date: 'Jul 2021',
      count: 1,
    },
    {
      date: 'Aug 2021',
      count: 4,
    },
    {
      date: 'Sep 2021',
      count: 3,
    },
    {
      date: 'Oct 2021',
      count: 2,
    },
    {
      date: 'Nov 2021',
      count: 2,
    },
    {
      date: 'Dec 2021',
      count: 5,
    },
  ];
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      gap={4}
    >
      <Heading>Your Applications by Month</Heading>
      <Text>
        This chart shows the number of applications you have submitted each
        month.
      </Text>
      {/* TODO: Change chart types */}
      {/* TODO: Change btn styles */}
      <Box>
        <Button>Bar</Button>
        <Button>Pie</Button>
        <Button>Area</Button>
      </Box>
      <BarChartComponent data={exampleData} />
    </Box>
  );
};

export default ResponsiveChartContainer;
