import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const DashboardHeader = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="mb-6 overflow-hidden bg-gradient-to-br from-background to-primary/25 dark:from-background dark:to-primary/20">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-sm text-muted-foreground">{currentDate}</p>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Welcome to your order management dashboard
        </p>
      </CardContent>
    </Card>
  );
};

export default DashboardHeader;
