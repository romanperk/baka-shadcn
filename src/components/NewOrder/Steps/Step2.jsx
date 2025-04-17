import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useFormContext, Controller } from "react-hook-form";

export const Step2 = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6 min-h-[300px]">
      <div className="space-y-2">
        <Label htmlFor="productName">Product</Label>
        <Controller
          name="productName"
          control={control}
          rules={{ required: "Product is required" }}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="productName">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Headphones">Headphones</SelectItem>
                <SelectItem value="Keyboard">Keyboard</SelectItem>
                <SelectItem value="Smart Watch">Smart Watch</SelectItem>
                <SelectItem value="Speaker">Speaker</SelectItem>
                <SelectItem value="Mouse">Mouse</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.productName && (
          <span className="text-red-500 text-xs">
            {errors.productName.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          type="number"
          min={1}
          step={1}
          {...register("quantity", {
            required: "Quantity is required",
            min: { value: 1, message: "Quantity must be at least 1" },
            valueAsNumber: true,
            validate: (value) =>
              Number.isInteger(value) || "Quantity must be an integer",
          })}
          placeholder="Enter quantity"
        />
        {errors.quantity && (
          <span className="text-red-500 text-xs">
            {errors.quantity.message}
          </span>
        )}
      </div>
    </div>
  );
};
