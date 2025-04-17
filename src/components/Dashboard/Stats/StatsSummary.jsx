import React from "react";
import { StatsDetail } from "./StatsDetail";
import { CheckCircle, RefreshCw, Clock, ShoppingBag } from "lucide-react";

const StatsSummary = ({ orderStats }) => {
  const statsCards = [
    {
      icon: <ShoppingBag className="h-5 w-5 text-blue-500" />,
      title: "Total Orders",
      value: orderStats.totalOrders,
      color: "hsl(210 100% 50%)", // blue-500
      progress: 100,
      percentage: "100%",
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      title: "Completed",
      value: orderStats.completedOrders,
      color: "hsl(142.1 76.2% 36.3%)", // green-600
      progress: orderStats.completionRate,
      percentage: `${orderStats.completionRate}%`,
    },
    {
      icon: <RefreshCw className="h-5 w-5 text-cyan-500" />,
      title: "Processing",
      value: orderStats.processingOrders,
      color: "hsl(189 94.5% 43.1%)", // cyan-500
      progress:
        orderStats.totalOrders > 0
          ? (orderStats.processingOrders / orderStats.totalOrders) * 100
          : 0,
      percentage:
        orderStats.totalOrders > 0
          ? `${Math.round(
              (orderStats.processingOrders / orderStats.totalOrders) * 100
            )}%`
          : "0%",
    },
    {
      icon: <Clock className="h-5 w-5 text-amber-500" />,
      title: "Pending",
      value: orderStats.pendingOrders,
      color: "hsl(48 96.5% 53.1%)", // amber-400
      progress:
        orderStats.totalOrders > 0
          ? (orderStats.pendingOrders / orderStats.totalOrders) * 100
          : 0,
      percentage:
        orderStats.totalOrders > 0
          ? `${Math.round(
              (orderStats.pendingOrders / orderStats.totalOrders) * 100
            )}%`
          : "0%",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statsCards.map((card, index) => (
        <StatsDetail
          key={index}
          icon={card.icon}
          title={card.title}
          value={card.value}
          color={card.color}
          progress={card.progress}
          percentage={card.percentage}
        />
      ))}
    </div>
  );
};

export default StatsSummary;
