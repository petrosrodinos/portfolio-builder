import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "stores/auth";
import { sendFeedback } from "@/services/feedback";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { SUPPORT_EMAIL } from "../constants";

const NiceToHave = () => {
  const { user_id, email, full_name } = useAuthStore();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      feedback: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => sendFeedback(data),
    onSuccess: () => {
      toast({
        title: "Thank you!",
        description: "Your feedback has been sent!",
      });
      form.reset();
      setOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    },
  });

  const handleSubmit = (values: { feedback: string }) => {
    if (!values.feedback) return;
    mutate({
      feedback: values.feedback,
      full_name,
      email,
      user_id,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative h-7 w-24 flex justify-start rounded-md bg-muted/25 text-xs font-normal text-muted-foreground shadow-none hover:bg-muted/50">
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nice To Have</DialogTitle>
          <DialogDescription>Share your feedback on what features you&apos;d like to see in the future.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormItem>
              <FormLabel>What would you like to have?</FormLabel>
              <FormControl>
                <Textarea placeholder="It would be great if..." {...form.register("feedback")} />
              </FormControl>
              <FormMessage />
            </FormItem>
            <div className="text-sm text-muted-foreground">
              Facing any problems?{" "}
              <Link href={`mailto:${SUPPORT_EMAIL}`} className="text-primary hover:underline">
                {SUPPORT_EMAIL}
              </Link>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Sending..." : "Send"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NiceToHave;
