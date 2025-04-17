import React from "react";
import { cn } from "@/lib/utils";

export const OrderStepper = ({ activeStep, steps, downMd }) => {
  return (
    <div className="flex items-center justify-between mb-8 gap-4 overflow-x-auto">
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isCompleted = index < activeStep;

        return (
          <div
            key={index}
            className={cn(
              "flex flex-col items-center min-w-[60px] relative flex-1"
            )}
          >
            {index < steps.length - 1 && (
              <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-border z-[-1] translate-x-1/2 sm:translate-x-1/4" />
            )}

            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border-2 text-base font-semibold transition-colors z-10",
                isCompleted
                  ? "bg-green-500 border-green-500 text-white"
                  : isActive
                  ? "border-primary"
                  : "bg-muted border-border text-muted-foreground"
              )}
            >
              {index + 1}
            </div>

            {!downMd && (
              <span className="mt-2 text-xs text-center text-muted-foreground max-w-[90px]">
                {step}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
