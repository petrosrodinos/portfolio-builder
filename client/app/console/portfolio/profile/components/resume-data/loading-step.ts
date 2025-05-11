import { useEffect, useState } from "react";

const loadingSteps = [
  "Reading data from your resume...",
  "Getting personal information...",
  "Getting education history...",
  "Getting work experience...",
  "Getting skills and certifications...",
  "Getting projects...",
  "Getting services...",
  "Getting links...",
  "Getting languages...",
  "Creating your portfolio...",
  "Creating your profile...",
  "Adding your experiences...",
  "Adding your skills...",
  "Adding your projects...",
  "Adding your links...",
  "Adding your languages...",
];

export const useLoadingStep = (isPending: boolean) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentStepText, setCurrentStepText] = useState(loadingSteps[0]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPending) {
      setCurrentStep(0);
      setCurrentStepText(loadingSteps[0]);

      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const nextStep = prev < loadingSteps.length - 1 ? prev + 1 : 0;
          setCurrentStepText(loadingSteps[nextStep]);
          return nextStep;
        });
      }, 2000);
    } else {
      setCurrentStep(0);
      setCurrentStepText(loadingSteps[0]);
    }
    return () => clearInterval(interval);
  }, [isPending]);

  return { currentStepText };
}

