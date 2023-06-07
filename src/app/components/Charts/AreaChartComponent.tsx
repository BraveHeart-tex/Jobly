'use client';
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
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type='monotone' dataKey='count' stroke='#A0AEC0' fill='#2D3748' />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default MyAreaChart;
