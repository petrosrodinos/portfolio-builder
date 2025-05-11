import Plans from "app/console/billing/subscription/components/plans";
import React from "react";

const SelectPlanPage = () => {
  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-4">Choose Your Plan</h1>
      </div>
      <Plans redirectParam="/auth/portfolio-resume" />
    </div>
  );
};

export default SelectPlanPage;
