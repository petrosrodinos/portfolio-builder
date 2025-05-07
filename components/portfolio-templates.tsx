"use client";

import React, { useState } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { PortfolioTemplates as templates } from "@/constants/templates";
import { Button } from "./ui/button";
import { Check, Eye, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { upsertUser } from "services/user";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useAuthStore } from "stores/auth";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";

interface PortfolioTemplatesProps {
  className?: string;
  isLandingPage?: boolean;
}

const PortfolioTemplates = ({ className, isLandingPage = false }: PortfolioTemplatesProps) => {
  const {
    preferences: { portfolio_theme },
    updateUser,
  } = useAuthStore();

  const [templateToConfirm, setTemplateToConfirm] = useState<string | null>(null);

  const { mutate: upsertUserMutation, isPending } = useMutation({
    mutationFn: upsertUser,
    onSuccess: (data) => {
      updateUser(data);
      setTemplateToConfirm(null);
      toast({
        title: "Template changed",
        description: "Your portfolio template has been changed",
      });
    },
  });

  const handleSelectTemplate = (templateId: string) => {
    if (templateId !== portfolio_theme) {
      setTemplateToConfirm(templateId);
    }
  };

  const confirmTemplateChange = (templateId: string) => {
    upsertUserMutation({
      preferences: { portfolio_theme: templateId },
    });
  };

  return (
    <>
      <div className={cn("grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 mt-1", className)}>
        {templates.map((template: any) => (
          <Card key={template.id} className={cn("overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02] w-full", portfolio_theme === template.id && "ring-2 ring-primary")}>
            <div className="relative w-full h-40">
              <Image src={template.image} alt={template.name} fill className="object-cover w-20 h-20" />
              {/* <div className={`h-full w-full bg-gradient-to-br ${template.gradient}`} /> */}
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{template.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{template.description}</p>
              <div className="mt-4 flex flex-col gap-2">
                {!isLandingPage && (
                  <Button
                    className="w-full text-sm sm:text-base"
                    variant={portfolio_theme === template.id ? "default" : "outline"}
                    disabled={portfolio_theme === template.id}
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    <Check className="mr-2 h-4 w-4 shrink-0" />
                    <span className="truncate">{portfolio_theme === template.id ? "Selected" : "Select"}</span>
                  </Button>
                )}
                <Button variant="outline" className="w-full text-sm sm:text-base" onClick={() => window.open(template.preview, "_blank")}>
                  <Eye className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">Preview</span>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!templateToConfirm} onOpenChange={() => setTemplateToConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Portfolio Template</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to change your portfolio template? This will update your portfolio&apos;s appearance.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => templateToConfirm && confirmTemplateChange(templateToConfirm)}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PortfolioTemplates;
