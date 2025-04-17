import React, { useEffect, useState } from "react";
import NewOrderForm from "../components/NewOrder/Form/NewOrderForm";
import { OrderStepper } from "../components/NewOrder/Stepper/Stepper";
import { useNavigate } from "react-router-dom";
import { useBreakpoints } from "../hooks/useBreakpoints";
import { useOrders } from "../context/ordersContext";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useForm, FormProvider } from "react-hook-form";

const steps = [
  "Personal Details",
  "Select Product",
  "Shipping & Payment",
  "Confirm Order",
];

const defaultValues = {
  userName: "",
  userEmail: "",
  productName: "",
  quantity: 1,
  paymentMethod: "",
  deliveryMethod: "",
  status: "pending",
};

const NewOrder = () => {
  const navigate = useNavigate();
  const { downMd } = useBreakpoints();
  const { addOrder } = useOrders();

  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const methods = useForm({
    mode: "onTouched",
    defaultValues,
  });

  const { handleSubmit, trigger, formState } = methods;

  const handleBack = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  const handleNext = async () => {
    let fieldsToValidate = [];
    if (activeStep === 0) fieldsToValidate = ["userName", "userEmail"];
    if (activeStep === 1) fieldsToValidate = ["productName", "quantity"];
    if (activeStep === 2)
      fieldsToValidate = ["paymentMethod", "deliveryMethod"];

    const valid = await trigger(fieldsToValidate);
    if (!valid) return;

    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      handleSubmit(onSubmit)();
    }
  };

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      paymentMethod: data.paymentMethod.toLowerCase().replace(/ /g, "_"),
      deliveryMethod: data.deliveryMethod.toLowerCase().replace(/ /g, "_"),
    };

    setLoadingProgress(0);
    addOrder(formattedData);
    setSubmitted(true);

    setTimeout(() => {
      navigate("/orders");
    }, 2000);
  };

  useEffect(() => {
    let timer;
    if (submitted) {
      timer = setInterval(() => {
        setLoadingProgress((prev) => (prev + 5 >= 100 ? 100 : prev + 5));
      }, 100);
    }
    return () => clearInterval(timer);
  }, [submitted]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <h2 className="text-2xl font-semibold">New Order</h2>
          {activeStep === 0 && (
            <Button variant="default" onClick={() => navigate("/orders")}>
              <ArrowLeft className="h-4 w-4" />
              {downMd ? "Overview" : "Table Overview"}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <OrderStepper activeStep={activeStep} steps={steps} downMd={downMd} />
          <FormProvider {...methods}>
            <NewOrderForm
              submitted={submitted}
              loadingProgress={loadingProgress}
              activeStep={activeStep}
              handleBack={handleBack}
              handleNext={handleNext}
              steps={steps}
              formState={formState}
            />
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewOrder;
