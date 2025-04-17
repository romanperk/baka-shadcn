import React from "react";
import { CreditCard, Car } from "lucide-react";
import { CustomPieChart } from "./CustomPieChart";

const StatsCharts = ({ orderStats }) => {
  const PAYMENT_COLORS = [
    "hsl(220 70% 50%)",
    "hsl(340 75% 55%)",
    "hsl(30 80% 55%)",
    "hsl(280 65% 60%)",
  ];

  const DELIVERY_COLORS = [
    "hsl(220 70% 50%)",
    "hsl(340 75% 55%)",
    "hsl(30 80% 55%)",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <CustomPieChart
          title="Payment Method Distribution"
          icon={<CreditCard className="h-5 w-5 text-primary" />}
          data={orderStats.paymentMethodDistribution}
          colors={PAYMENT_COLORS}
        />
      </div>

      <div>
        <CustomPieChart
          title="Delivery Method Distribution"
          icon={<Car className="h-5 w-5 text-primary" />}
          data={orderStats.deliveryMethodDistribution}
          colors={DELIVERY_COLORS}
        />
      </div>
    </div>
  );
};

export default StatsCharts;
