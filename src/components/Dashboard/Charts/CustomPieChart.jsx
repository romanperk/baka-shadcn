import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useBreakpoints } from "../../../hooks/useBreakpoints";

export const CustomPieChart = ({ title, icon, data, colors }) => {
  const hasData = data && data.length > 0;
  const { downMd } = useBreakpoints();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="w-full h-[280px]">
          {hasData ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  outerRadius="60%"
                  innerRadius="30%"
                  labelLine={false}
                  isAnimationActive={false}
                  label={({ name, percent }) =>
                    downMd ? null : `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {data.map((_entry, index) => (
                    <Cell
                      key={`chart-cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  animationDuration={0}
                  contentStyle={{
                    borderRadius: "var(--radius)",
                  }}
                />
                {downMd && <Legend verticalAlign="bottom" height={36} />}
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-muted-foreground">
                <p>No data available</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
