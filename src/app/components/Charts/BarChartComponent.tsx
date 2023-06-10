'use client';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface IBarChartComponentProps {
  data: any;
}

const BarChartComponent = ({ data }: IBarChartComponentProps) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3 ' />
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
        <Bar
          dataKey='count'
          name='Applications'
          fill={useColorModeValue('#385898', '#f7fafc')}
          barSize={75}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
