import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ServiceFormValues, ServiceFormSchema } from "@/validation-schemas/portfolio";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { upsertExperience } from "services/experience";
import { useAuthStore } from "stores/auth";
import { PortfolioExperience } from "interfaces/portfolio";
import { PortfolioExperienceTypes } from "@/constants/supabase";
import { usePrivileges } from "@/hooks/use-privileges";
interface ServiceFormProps {
  onCancel: () => void;
  service?: PortfolioExperience;
  serviceLength: number;
}

const ServiceForm = ({ onCancel, service, serviceLength }: ServiceFormProps) => {
  const { user_id } = useAuthStore((state) => state);
  const queryClient = useQueryClient();
  const { canCreateRecord } = usePrivileges();

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(ServiceFormSchema),
    defaultValues: service || {
      title: "",
      description: "",
      price: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => upsertExperience(data),
    onSuccess: () => {
      toast({
        title: "Service saved successfully",
        description: "You have successfully saved your service",
        duration: 1000,
      });
      queryClient.invalidateQueries({ queryKey: ["services"] });
      onCancel();
    },
    onError: (error) => {
      toast({
        title: "Could not save service",
        description: error.message,
        duration: 3000,
      });
    },
  });

  const onSubmit = (data: ServiceFormValues) => {
    if (!service && !canCreateRecord("services", serviceLength)) return;

    mutate({
      ...data,
      user_id,
      type: PortfolioExperienceTypes.service,
      id: service?.id,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Web Design" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" min={0} placeholder="e.g. 100" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your service, what you do, what you offer..." className="min-h-[100px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button loading={isPending} type="submit" className="flex-1">
            Save Service
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ServiceForm;
