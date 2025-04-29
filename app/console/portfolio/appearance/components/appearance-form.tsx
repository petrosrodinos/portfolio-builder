"use client";
import { useForm } from "react-hook-form";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { fonts } from "@/constants/fonts";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFont } from "@/context/font-context";
import PortfolioTemplates from "@/components/portfolio-templates";
import {
  PortfolioAppearanceFormSchema,
  PortfolioAppearanceFormValues,
} from "@/validation-schemas/appearance";

export function AppearanceForm() {
  const { font, setFont } = useFont();

  const form = useForm<PortfolioAppearanceFormValues>({
    resolver: zodResolver(PortfolioAppearanceFormSchema),
    defaultValues: {
      font,
    },
  });

  function onSubmit(data: PortfolioAppearanceFormValues) {
    if (data.font != font) setFont(data.font);

    toast({
      title: "Appearance updated",
      description: "Your portfolio appearance has been updated.",
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <PortfolioTemplates />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
          <FormField
            control={form.control}
            name="font"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Font</FormLabel>
                <div className="relative w-max">
                  <FormControl>
                    <select
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "w-[200px] appearance-none font-normal capitalize"
                      )}
                      {...field}
                    >
                      {fonts.map((font) => (
                        <option key={font} value={font}>
                          {font}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                </div>
                <FormDescription className="font-manrope">
                  Set the font you want to use in your portfolio.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Update preferences</Button>
        </form>
      </Form>
    </div>
  );
}
