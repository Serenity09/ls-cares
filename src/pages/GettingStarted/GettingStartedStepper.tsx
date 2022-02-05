import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { Navigate, useLocation } from "react-router-dom";

interface GettingStartedStepperSettings {
  steps: Array<{
    title: string;
    element: JSX.Element;
  }>;
}

export default function GettingStartedStepper(
  props: GettingStartedStepperSettings
) {
  const [activeStep, setActiveStep] = React.useState(0);
  const location = useLocation();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Stepper activeStep={activeStep} sx={{ mb: "1rem" }}>
        {props.steps.map((step) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={step.title} {...stepProps}>
              <StepLabel {...labelProps}>{step.title}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === props.steps.length ? (
        <Navigate to="/guide" state={{ from: location }} />
      ) : (
        <React.Fragment>
          {props.steps[activeStep].element}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === props.steps.length - 1 ? "Let's go" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </>
  );
}
