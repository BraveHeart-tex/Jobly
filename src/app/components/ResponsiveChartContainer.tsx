'use client';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
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
      <Heading color={useColorModeValue('gray.700', 'gray.200')}>
        Your Applications by Month
      </Heading>
      <Text color={useColorModeValue('gray.500', 'gray.200')}>
        Below chart shows the number of applications you have submitted each
        month.
      </Text>
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        gap={4}
        flexDirection={{
          base: 'column',
          lg: 'row',
        }}
      >
        <Text color={useColorModeValue('gray.500', 'gray.200')}>
          Change Chart Type:
        </Text>
        <Flex gap={4}>
          <Button
            bg={useColorModeValue('facebook.500', 'gray.700')}
            color={'white'}
            _hover={{
              bg: useColorModeValue('facebook.600', 'gray.600'),
            }}
            onClick={() => setChartType('bar')}
          >
            Bar
          </Button>
          <Button
            bg={useColorModeValue('facebook.500', 'gray.700')}
            color={'white'}
            _hover={{
              bg: useColorModeValue('facebook.600', 'gray.600'),
            }}
            onClick={() => setChartType('line')}
          >
            Line
          </Button>
          <Button
            bg={useColorModeValue('facebook.500', 'gray.700')}
            color={'white'}
            _hover={{
              bg: useColorModeValue('facebook.600', 'gray.600'),
            }}
            onClick={() => setChartType('area')}
          >
            Area
          </Button>
        </Flex>
      </Flex>
      {chartType === 'bar' && <BarChartComponent data={exampleData} />}
      {chartType === 'line' && <MyLineChart data={exampleData} />}
      {chartType === 'area' && <MyAreaChart data={exampleData} />}
    </Box>
  );
};

export default ResponsiveChartContainer;
