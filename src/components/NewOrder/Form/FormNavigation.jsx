import React from "react";
import { Button } from "@/components/ui/button";

export const FormNavigation = ({
  isFormValid,
  handleBack,
  activeStep,
  handleNext,
  steps,
}) => {
  const isLastStep = activeStep === steps.length - 1;

  return (
    <div className="flex justify-end gap-4 mt-6">
      <Button
        variant="outline"
        onClick={handleBack}
        disabled={activeStep === 0}
      >
        Back
      </Button>
      <Button
        onClick={handleNext}
        disabled={!isFormValid}
        className={isLastStep ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
      >
        {isLastStep ? "Submit Order" : "Next"}
      </Button>
    </div>
  );
};
