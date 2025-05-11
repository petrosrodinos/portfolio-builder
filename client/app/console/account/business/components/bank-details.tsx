"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BankInfoSchema } from "@/validation-schemas/business";
import { BankInfoFormValues } from "@/validation-schemas/business";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth";

const BankDetails = () => {
  const { full_name } = useAuthStore();
  const form = useForm<BankInfoFormValues>({
    resolver: zodResolver(BankInfoSchema),
    defaultValues: {
      account_holder_name: full_name,
      account_number: "",
      bank_name: "",
      swift: "",
    },
  });

  const onSubmit = (data: BankInfoFormValues) => {
    console.log(data);
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Banking Information</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="account_holder_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Holder Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bank_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input placeholder="Chase Bank" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="swift"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Swift/BIC</FormLabel>
                <FormControl>
                  <Input placeholder="CHASEUS33" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="account_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number(IBAN)</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter account number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Save Banking Information</Button>
        </form>
      </Form>
    </div>
  );
};

export default BankDetails;
