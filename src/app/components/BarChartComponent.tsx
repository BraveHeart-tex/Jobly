"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface IBarChartComponentProps {
  data: any;
}

const BarChartComponent = ({ data }: IBarChartComponentProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3 " />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip cursor={{ fill: "#374151", opacity: 0.3 }} content={<CustomTooltip />} labelClassName="text-primary" />
        <Bar
          dataKey="count"
          radius={[10, 10, 0, 0]}
          name="Applications"
          className="fill-facebook-500 dark:fill-facebook-200"
          barSize={75}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card shadow-lg rounded-lg p-6 grid grid-cols-1 gap-2">
        <p className="text-facebook dark:text-primary font-semibold">{`${label}`}</p>
        <p className="text-success">
          <span className="font-semibold">Job Applications: </span>
          {payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};

export default BarChartComponent;
