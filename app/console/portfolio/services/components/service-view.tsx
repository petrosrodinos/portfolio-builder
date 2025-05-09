"use client";

import React, { useState } from "react";
import { Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProjectForm from "./service-form";
import { useQuery } from "@tanstack/react-query";
import { getExperiences } from "services/experience";
import { useAuthStore } from "stores/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PortfolioExperienceTypes } from "@/constants/supabase";
import ServiceCard from "./service-card";
import ExperienceSkeleton from "@/components/ui/experience-skeleton";

const ServiceView = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { user_id } = useAuthStore((state) => state);

  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: () => getExperiences(user_id, PortfolioExperienceTypes.service),
    enabled: !!user_id,
  });

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleCancel = () => {
    setIsAddModalOpen(false);
  };

  if (isLoading) {
    return <ExperienceSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Service
        </Button>
      </div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Service</DialogTitle>
          </DialogHeader>
          <ProjectForm onCancel={handleCancel} serviceLength={services?.length || 0} />
        </DialogContent>
      </Dialog>

      {!services?.length && !isLoading ? (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>No services entries yet</AlertTitle>
          <AlertDescription>Add your services to show clients what you can do.</AlertDescription>
        </Alert>
      ) : (
        services.map((service) => <ServiceCard key={service.id} service={service} />)
      )}
    </div>
  );
};

export default ServiceView;
