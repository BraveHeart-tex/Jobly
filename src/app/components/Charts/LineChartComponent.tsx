'use client';
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
        <XAxis dataKey='date' />
        <YAxis dataKey={'count'} />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          name='Number of jobs applied'
          dataKey='count'
          stroke='#2D3748'
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MyLineChart;
