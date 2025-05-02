"use client";

import { PUBLIC_SITE_URL } from "@/constants/index";
import { useEffect, useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/stores/auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { createAffiliateCode, getAffiliateCode } from "@/services/affiliate";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loading from "../loading";
import {
  createAccountInStripeAndOnboard,
  getAccount,
  getAccountLoginLink,
} from "@/services/billing/stripe";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function GenerateCode() {
  const { user_id, email } = useAuthStore();
  const { toast } = useToast();
  const [affiliateLink, setAffiliateLink] = useState<string>("");
  const router = useRouter();

  const { data, isPending: isLoading } = useQuery({
    queryKey: ["affiliate-code"],
    queryFn: async () => {
      const affiliateCode = await getAffiliateCode(user_id);
      return affiliateCode;
    },
    enabled: !!user_id,
  });

  const { data: stripeAccount, isPending: isLoadingAccount } = useQuery({
    queryKey: ["stripe-account"],
    queryFn: async () => {
      const account = await getAccount(data?.stripe_account_id);
      return account;
    },
    enabled: !!data?.stripe_account_id,
  });

  const { data: loginLink, isPending: isLoadingLoginLink } = useQuery({
    queryKey: ["login-link", data?.stripe_account_id],
    queryFn: async () => {
      return getAccountLoginLink(data.stripe_account_id);
    },
    enabled: !!data?.stripe_account_id,
  });

  const { mutate: createAccountInStripe, isPending: isCreatingAccount } = useMutation({
    mutationFn: () => createAccountInStripeAndOnboard(user_id, email, data?.stripe_account_id),
    onSuccess: (data) => {
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });
      router.push(data.account_link);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { mutate: generateAffiliateCode, isPending } = useMutation({
    mutationFn: () => createAffiliateCode({ user_id }),
    onSuccess: (data) => {
      setAffiliateLink(`${PUBLIC_SITE_URL}/auth/sign-up?ref=${data.code}`);
      toast({
        title: "Affiliate link generated",
        description: "Your new affiliate link has been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateLink);
    toast({
      title: "Link copied",
      description: "Your affiliate link has been copied to clipboard.",
    });
  };

  const handleGenerateCode = () => {
    if (!data?.stripe_account_id) {
      createAccountInStripe();
    } else {
      generateAffiliateCode();
    }
  };

  useEffect(() => {
    if (!data?.code) return;
    setAffiliateLink(`${PUBLIC_SITE_URL}/auth/sign-up?ref=${data.code}`);
  }, [data]);

  if (isLoading || isLoadingAccount || isLoadingLoginLink) return <Loading />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Affiliate Link</CardTitle>
        <CardDescription>
          Generate and share your unique affiliate link to earn commissions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-col gap-2 w-full">
          <div className="relative flex-1 min-w-0">
            <Input
              value={affiliateLink}
              readOnly
              className="w-full font-mono text-sm pr-8 h-9"
              placeholder="Generate a link to get started"
              style={{
                whiteSpace: "nowrap",
                overflow: "auto",
                textOverflow: "unset",
              }}
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-0 h-9 w-9"
              onClick={copyToClipboard}
              disabled={!affiliateLink}
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            {!data?.stripe_account_id && (
              <p className="text-sm text-muted-foreground">
                To start earning commissions, you need to connect your Stripe account first. This
                allows us to process payments and send your earnings.
              </p>
            )}
            {!stripeAccount?.charges_enabled && !stripeAccount?.payouts_enabled ? (
              <p className="text-sm text-muted-foreground">
                Your Stripe account is created. Please finish onboarding to start earning
                commissions.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Your Stripe account is created. You are now ready to start earning commissions.
              </p>
            )}
            {loginLink && (
              <p className="text-sm text-blue-500">
                <Link href={loginLink || ""} target="_blank">
                  Stripe Portal
                </Link>
              </p>
            )}
            <div className="flex justify-start">
              <Button
                loading={isPending || isCreatingAccount}
                disabled={isPending || isCreatingAccount || !!affiliateLink}
                onClick={() => handleGenerateCode()}
                className="h-9 text-sm px-3"
              >
                <LinkIcon className="h-3.5 w-3.5 mr-1.5" />
                {!data?.stripe_account_id ? "Connect Stripe" : "Generate Link"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
