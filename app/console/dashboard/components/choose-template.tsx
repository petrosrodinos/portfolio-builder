import PortfolioTemplates from "@/components/portfolio-templates";
import { Card } from "@/components/ui/card";
import React from "react";

const ChooseTemplate = () => {
  return (
    <div className="mt-8">
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold">Choose Your Template</h2>
        <p className="mb-6 text-muted-foreground">
          Select a template to customize your portfolio's layout and style
        </p>

        <PortfolioTemplates />
      </Card>
    </div>
  );
};

export default ChooseTemplate;
