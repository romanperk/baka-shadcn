import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useFormContext, Controller } from "react-hook-form";

export const Step3 = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6 min-h-[300px]">
      <div className="space-y-2">
        <Label htmlFor="paymentMethod">Payment Method</Label>
        <Controller
          name="paymentMethod"
          control={control}
          rules={{ required: "Payment method is required" }}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="paymentMethod">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="PayPal">PayPal</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.paymentMethod && (
          <span className="text-red-500 text-xs">
            {errors.paymentMethod.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="deliveryMethod">Delivery Method</Label>
        <Controller
          name="deliveryMethod"
          control={control}
          rules={{ required: "Delivery method is required" }}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="deliveryMethod">
                <SelectValue placeholder="Select delivery method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Express">Express</SelectItem>
                <SelectItem value="Pickup">Pickup</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.deliveryMethod && (
          <span className="text-red-500 text-xs">
            {errors.deliveryMethod.message}
          </span>
        )}
      </div>
    </div>
  );
};
