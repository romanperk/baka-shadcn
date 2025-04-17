import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export const StatsDetail = ({
  icon,
  title,
  value,
  color,
  progress,
  percentage,
}) => {
  const navigate = useNavigate();
  const isClickable = title === "Total Orders";

  return (
    <Card
      className={cn(
        "overflow-hidden relative",
        isClickable && "cursor-pointer hover:shadow-md transition-shadow"
      )}
      onClick={isClickable ? () => navigate("/orders") : undefined}
    >
      <div
        className="absolute top-0 left-0 w-full h-1"
        style={{ backgroundColor: color }}
      />
      <CardContent>
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
        <h3 className="text-2xl font-bold mb-3">{value}</h3>
        <div className="flex items-center gap-2">
          <Progress
            value={progress}
            className="h-2 flex-grow"
            style={{
              ["--progress-background"]: color,
            }}
          />
          <span className="text-xs font-medium" style={{ color }}>
            {percentage}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsDetail;
