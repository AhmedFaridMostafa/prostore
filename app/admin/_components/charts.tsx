"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartConfig = {
  totalSales: {
    label: "Total Sales",
  },
} satisfies ChartConfig;

const Chart = ({
  data: { salesData },
}: {
  data: { salesData: { month: string; totalSales: number }[] };
}) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={salesData}>
        <CartesianGrid vertical={false} className="stroke-gray-400" />

        <XAxis
          dataKey="month"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />

        <ChartLegend content={<ChartLegendContent />} />

        <Bar
          dataKey="totalSales"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ChartContainer>
  );
};
export default Chart;
