import React from "react";
import { CheckCircle } from "lucide-react";

export const SubmittedStep = ({ submitted, loadingProgress }) => {
  if (!submitted) return null;

  return (
    <div className="min-h-[240px] flex flex-col items-center justify-center text-center px-4 mx-auto max-w-[90%] space-y-6">
      <CheckCircle className="text-green-500 w-14 h-14" />

      <h2 className="text-xl font-semibold">Order Submitted Successfully!</h2>

      <div className="w-72 h-3 bg-muted rounded-full overflow-hidden">
        <div
          className="bg-green-500 h-full transition-all duration-300"
          style={{ width: `${loadingProgress}%` }}
        />
      </div>

      <p className="text-muted-foreground text-sm">
        Redirecting to order list...
      </p>
    </div>
  );
};
