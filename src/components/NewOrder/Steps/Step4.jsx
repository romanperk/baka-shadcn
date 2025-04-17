import React from "react";
import { useFormContext } from "react-hook-form";

export const Step4 = () => {
  const { getValues } = useFormContext();
  const formData = getValues();

  return (
    <div className="min-h-[310px] space-y-4">
      <h3 className="text-xl font-semibold text-primary">Order Summary</h3>

      <div className="rounded-lg border bg-background p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-muted-foreground font-medium mb-1">
              Customer Details
            </p>
            <div>{formData.userName}</div>
            <p className="text-muted-foreground">{formData.userEmail}</p>
          </div>

          <div>
            <p className="text-muted-foreground font-medium mb-1">
              Product Details
            </p>
            <div>{formData.productName}</div>
            <p className="text-muted-foreground">
              Quantity: {formData.quantity}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground font-medium mb-1">
              Payment Method
            </p>
            <div>{formData.paymentMethod}</div>
          </div>

          <div>
            <p className="text-muted-foreground font-medium mb-1">
              Delivery Method
            </p>
            <div>{formData.deliveryMethod}</div>
          </div>
        </div>
      </div>

      <div className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950 p-4 text-sm rounded-md">
        <p className="text-blue-800 dark:text-blue-200">
          Please review your order details before submission.
        </p>
      </div>
    </div>
  );
};
