import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

export const Step1 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6 min-h-[300px]">
      <div className="space-y-2">
        <Label htmlFor="userName">Name</Label>
        <Input
          id="userName"
          {...register("userName", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
          placeholder="Enter your name"
        />
        {errors.userName && (
          <span className="text-red-500 text-xs">
            {errors.userName.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="userEmail">Email</Label>
        <Input
          id="userEmail"
          type="email"
          {...register("userEmail", {
            required: "Email is required",
            pattern: {
              value: /^[^@]+@[^@]+\.[^@]+$/,
              message: "Invalid email address",
            },
          })}
          placeholder="Enter your email"
        />
        {errors.userEmail && (
          <span className="text-red-500 text-xs">
            {errors.userEmail.message}
          </span>
        )}
      </div>
    </div>
  );
};
