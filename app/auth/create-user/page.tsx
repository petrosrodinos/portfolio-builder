"use client";

import React, { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import ProfileForm from "app/console/account/profile/components/profile-form";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "@/hooks/use-toast";
import { getStripe } from "@/lib/stripe/client";
import { checkoutWithStripe } from "@/services/billing/stripe";
import { useMutation } from "@tanstack/react-query";
import { CookieKeys } from "@/constants/cookies";
const CreateUser = () => {
  const router = useRouter();

  const { mutate: checkoutMutation, isPending: checkoutPending } = useMutation({
    mutationFn: async (price_id: string) => {
      const sessionId = await checkoutWithStripe(
        price_id,
        `/subscription_payment?redirect=/auth/portfolio-resume`
      );
      return sessionId;
    },
    onSuccess: async (sessionId: string) => {
      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    },
    onError: (error: any) => {
      toast({
        title: "Could not checkout",
        description: error.message,
        duration: 3000,
      });
    },
  });

  const handleCreateUser = () => {
    const openCheckoutSession = Cookies.get(CookieKeys.checkout_session_price);
    if (openCheckoutSession) {
      checkoutMutation(openCheckoutSession);
    } else {
      router.push("/auth/select-plan");
    }
  };

  useEffect(() => {
    router.prefetch("/auth/select-plan");
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center from-background to-muted/20 max-w-md mx-auto">
      <div className="w-full max-w-3xl">
        <div className="mb-4 text-center">
          <div className="mb-2 flex justify-center">
            <div className="rounded-full bg-primary/10 p-3">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Complete Your Profile</h1>
          <p className="mt-2 text-muted-foreground">
            Great! Your account is created. Now let's set up your professional profile to start
            building your portfolio.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Personal Information</h2>
          </div>
          <ProfileForm onSuccess={handleCreateUser} isCheckoutPending={checkoutPending} />
        </div>

        <div className="mt-3 text-center text-sm text-muted-foreground">
          You can always update your profile later from your{" "}
          <p className="font-medium text-primary">dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
