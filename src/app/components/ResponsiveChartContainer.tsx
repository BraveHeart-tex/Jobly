'use client';
import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import BarChartComponent from './Charts/BarChartComponent';
import { useState } from 'react';
import MyAreaChart from './Charts/AreaChartComponent';
import MyLineChart from './Charts/LineChartComponent';
import { useQuery } from 'react-query';
import customFetch from '../utils/customFetch';

const ResponsiveChartContainer = () => {
  const [chartType, setChartType] = useState('bar');
  const { data, isLoading } = useQuery({
    queryKey: 'applicationStats',
    queryFn: async () => {
      const { data } = await customFetch.get('/jobs/monthlyData');
      return data.monthlyApplicationsData;
    },
  });

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
      {isLoading ? (
        <Flex mt={10} display={'flex'} justifyContent={'center'} gap={4}>
          <Text color='gray.500'>Loading Chart...</Text>
          <Spinner color='facebook.500' />
        </Flex>
      ) : (
        <Box
          width={'100%'}
          height={'400px'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {chartType === 'bar' ? (
            <BarChartComponent data={data} />
          ) : chartType === 'line' ? (
            <MyLineChart data={data} />
          ) : (
            <MyAreaChart data={data} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default ResponsiveChartContainer;
