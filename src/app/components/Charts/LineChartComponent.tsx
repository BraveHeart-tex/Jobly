'use client';
import { useColorModeValue } from '@chakra-ui/react';
import {
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  LineChart,
} from 'recharts';

interface IPieChartProps {
  data: any;
}

const MyLineChart = ({ data }: IPieChartProps) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='date'
          tick={{ fill: useColorModeValue('#4A5568', '#F7FAFC') }}
        />
        <YAxis
          dataKey={'count'}
          tick={{ fill: useColorModeValue('#4A5568', '#F7FAFC') }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: useColorModeValue('#f7fafc', '#1a202c'),
          }}
        />
        <Legend />
        <Line
          type='monotone'
          name='Number of jobs applied'
          dataKey='count'
          stroke={useColorModeValue('#385898', '#f7fafc')}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MyLineChart;
