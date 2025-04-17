import React from "react";
import { Step1 } from "../Steps/Step1";
import { Step2 } from "../Steps/Step2";
import { Step3 } from "../Steps/Step3";
import { Step4 } from "../Steps/Step4";
import { SubmittedStep } from "../Steps/SubmittedStep";
import { FormNavigation } from "./FormNavigation";
import { useFormContext } from "react-hook-form";

const NewOrderForm = ({
  submitted,
  loadingProgress,
  activeStep,
  handleBack,
  handleNext,
  steps,
  formState,
}) => {
  const { getValues } = useFormContext();

  return (
    <>
      {submitted ? (
        <SubmittedStep
          submitted={submitted}
          loadingProgress={loadingProgress}
        />
      ) : (
        <>
          {activeStep === 0 && <Step1 />}
          {activeStep === 1 && <Step2 />}
          {activeStep === 2 && <Step3 />}
          {activeStep === 3 && <Step4 formData={getValues()} />}
          <FormNavigation
            handleBack={handleBack}
            activeStep={activeStep}
            handleNext={handleNext}
            steps={steps}
            isFormValid={formState.isValid}
          />
        </>
      )}
    </>
  );
};

export default NewOrderForm;
