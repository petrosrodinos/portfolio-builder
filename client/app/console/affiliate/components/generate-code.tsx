"use client";

import { PUBLIC_SITE_URL } from "@/constants/index";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/stores/auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { createAffiliateCode, getAffiliateCode } from "@/services/affiliate";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loading from "../loading";
import { createAccountInStripeAndOnboard, getAccount, getAccountLoginLink } from "@/services/billing/stripe";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function GenerateCode() {
  const { user_id, email } = useAuthStore();
  const { toast } = useToast();
  const [affiliateLink, setAffiliateLink] = useState<string>("");
  const router = useRouter();

  const { data: affiliateCode, isPending: isLoading } = useQuery({
    queryKey: ["affiliate-code"],
    queryFn: async () => {
      const affiliateCode = await getAffiliateCode(user_id);
      return affiliateCode;
    },
    enabled: !!user_id,
    retry: false,
  });

  const { data: stripeAccount, isPending: isLoadingAccount } = useQuery({
    queryKey: ["stripe-account"],
    queryFn: async () => {
      const account = await getAccount(affiliateCode?.stripe_account_id);
      return account;
    },
    enabled: !!affiliateCode?.stripe_account_id,
  });

  const { data: loginLink, isPending: isLoadingLoginLink } = useQuery({
    queryKey: ["login-link", affiliateCode?.stripe_account_id],
    queryFn: async () => {
      const loginLink = await getAccountLoginLink(affiliateCode.stripe_account_id);
      return loginLink;
    },
    enabled: !!affiliateCode?.stripe_account_id,
  });

  const { mutate: createAccountInStripe, isPending: isCreatingAccount } = useMutation({
    mutationFn: () => createAccountInStripeAndOnboard(user_id, email, affiliateCode?.stripe_account_id),
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
      setAffiliateLink(`${PUBLIC_SITE_URL}?ref=${data.code}`);
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
    if (!affiliateCode?.stripe_account_id) {
      createAccountInStripe();
    } else {
      generateAffiliateCode();
    }
  };

  useEffect(() => {
    if (!affiliateCode?.code) return;
    setAffiliateLink(`${PUBLIC_SITE_URL}?ref=${affiliateCode.code}`);
  }, [affiliateCode]);

  if (isLoading) return <Loading />;
  if (affiliateCode?.stripe_account_id && (isLoadingAccount || isLoadingLoginLink)) return <Loading />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Affiliate Link</CardTitle>
        <CardDescription>Generate and share your unique affiliate link to earn commissions</CardDescription>
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
            <Button variant="outline" size="icon" className="absolute right-0 top-0 h-9 w-9" onClick={copyToClipboard} disabled={!affiliateLink}>
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            {!affiliateCode?.stripe_account_id && !stripeAccount && <p className="text-sm text-muted-foreground">To start earning commissions, you need to connect your Stripe account first. This allows us to process payments and send your earnings.</p>}

            {affiliateCode?.stripe_account_id && stripeAccount?.payouts_enabled && stripeAccount?.charges_enabled && <p className="text-sm text-muted-foreground">Your Stripe account is created. You are now ready to start earning commissions.</p>}

            {affiliateCode?.stripe_account_id && !stripeAccount?.charges_enabled && !stripeAccount?.payouts_enabled && <p className="text-sm text-muted-foreground">Your Stripe account is created. Please finish onboarding to start earning commissions.</p>}

            {loginLink && (
              <p className="text-sm text-blue-500">
                <Link href={loginLink || ""} target="_blank">
                  Stripe Account Portal
                </Link>
              </p>
            )}
            <div className="flex justify-start">
              <Button loading={isPending || isCreatingAccount} disabled={isPending || isCreatingAccount || !!affiliateLink || (loginLink && (!stripeAccount?.payouts_enabled || !stripeAccount?.charges_enabled))} onClick={() => handleGenerateCode()} className="h-9 text-sm px-3">
                {/* || (!stripeAccount?.payouts_enabled && !stripeAccount?.charges_enabled) */}
                <LinkIcon className="h-3.5 w-3.5 mr-1.5" />
                {!affiliateCode?.stripe_account_id && !stripeAccount?.payouts_enabled && !stripeAccount?.charges_enabled ? "Connect Stripe" : "Generate Link"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
