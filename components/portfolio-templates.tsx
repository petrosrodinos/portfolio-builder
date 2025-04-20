"use client";

import React, { useState } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import {
  PortfolioTemplates as templates,
  TemplateType,
  TemplateTypes,
} from "@/constants/templates";
import { Button } from "./ui/button";
import { Check, Eye } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { upsertUser } from "services/user";

const PortfolioTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<typeof TemplateTypes | null>(null);

  const { mutate: upsertUserMutation } = useMutation({
    mutationFn: upsertUser,
  });

  const handleSelectTemplate = (templateId: typeof TemplateTypes) => {
    setSelectedTemplate(templateId);
    upsertUserMutation({
      preferences: { portfolio_theme: templateId },
    });
  };
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <Card
          key={template.id}
          className={cn(
            "overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02] w-full",
            selectedTemplate === template.id && "ring-2 ring-primary"
          )}
        >
          <div className="aspect-video bg-muted w-full">
            <div className={`h-full w-full bg-gradient-to-br ${template.gradient}`} />
          </div>
          <div className="p-4">
            <h3 className="font-semibold">{template.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{template.description}</p>
            <div className="mt-4 flex flex-col gap-2">
              <Button
                className="w-full text-sm sm:text-base"
                variant={selectedTemplate === template.id ? "default" : "outline"}
                onClick={() => handleSelectTemplate(template.id)}
              >
                <Check className="mr-2 h-4 w-4 shrink-0" />
                <span className="truncate">
                  {selectedTemplate === template.id ? "Selected" : "Select"}
                </span>
              </Button>
              <Button
                variant="outline"
                className="w-full text-sm sm:text-base"
                onClick={() => window.open(template.preview, "_blank")}
              >
                <Eye className="mr-2 h-4 w-4 shrink-0" />
                <span className="truncate">Preview</span>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PortfolioTemplates;
