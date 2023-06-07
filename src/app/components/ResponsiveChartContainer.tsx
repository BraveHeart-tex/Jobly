'use client';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import BarChartComponent from './Charts/BarChartComponent';
import { useState } from 'react';
import MyAreaChart from './Charts/AreaChartComponent';
import MyLineChart from './Charts/LineChartComponent';

const ResponsiveChartContainer = () => {
  const [chartType, setChartType] = useState('bar');

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
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        gap={4}
        flexDirection={{
          base: 'column',
          lg: 'row',
        }}
      >
        <Text>Change Chart Type:</Text>
        <Box>
          <Button onClick={() => setChartType('bar')}>Bar</Button>
          <Button onClick={() => setChartType('line')}>Line</Button>
          <Button onClick={() => setChartType('area')}>Area</Button>
        </Box>
      </Flex>
      {chartType === 'bar' && <BarChartComponent data={exampleData} />}
      {chartType === 'line' && <MyLineChart data={exampleData} />}
      {chartType === 'area' && <MyAreaChart data={exampleData} />}
    </Box>
  );
};

export default ResponsiveChartContainer;
