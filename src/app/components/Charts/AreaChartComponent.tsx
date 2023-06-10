'use client';
import { useColorModeValue } from '@chakra-ui/react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

interface IAreaChartProps {
  data: any;
}

const MyAreaChart = ({ data }: IAreaChartProps) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='date'
          tick={{ fill: useColorModeValue('#4A5568', '#F7FAFC') }}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fill: useColorModeValue('#4A5568', '#F7FAFC') }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: useColorModeValue('#f7fafc', '#1a202c'),
          }}
        />
        <Area
          type='monotone'
          dataKey='count'
          name='Number of jobs applied'
          stroke={useColorModeValue('#223B67', '#fff')}
          fill={useColorModeValue('#385898', '#f7fafc')}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default MyAreaChart;
