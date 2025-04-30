import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";
import { createStripePortal } from "@/services/billing/stripe";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";

interface SubscriptionProps {
  subscription: any;
}

const Subscription = ({ subscription }: SubscriptionProps) => {
  const router = useRouter();
  const currentPath = usePathname();

  const { mutate: openPortal, isPending } = useMutation({
    mutationFn: () => createStripePortal(currentPath),
    onSuccess: (redirectUrl: string) => {
      router.push(redirectUrl);
    },
    onError: (error: any) => {
      toast({
        title: "Could not open portal",
        description: error.message,
        duration: 3000,
      });
    },
  });

  return (
    <>
      {subscription && (
        <Card>
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-muted-foreground">Status</p>
                <p
                  className={`font-medium ${
                    subscription?.status === "active" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {subscription?.status === "active" ? "Active" : "Inactive"}
                </p>
              </div>
              {!subscription?.canceled_at && (
                <div>
                  <p className="text-muted-foreground">Next Billing Date</p>
                  <p className="font-medium">{formatDate(subscription?.current_period_end)}</p>
                </div>
              )}
              {subscription?.canceled_at && (
                <div>
                  <p className="text-muted-foreground">Canceled at</p>
                  <p className="font-medium">{formatDate(subscription?.canceled_at)}</p>
                </div>
              )}
              <div>
                <p className="text-muted-foreground">Billing Cycle</p>
                {!subscription.canceled_at && (
                  <p className="font-medium">
                    {subscription?.prices?.interval === "month" ? "Monthly" : "Yearly"}
                  </p>
                )}
                {subscription.canceled_at && (
                  <p className="font-medium text-red-500">
                    Will be active until {formatDate(subscription?.cancel_at)}
                  </p>
                )}
              </div>
              <div>
                <p className="text-muted-foreground">Created at</p>
                <p className="font-medium">{formatDate(subscription?.created)}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button disabled={isPending} onClick={() => openPortal()} variant="outline">
              {isPending ? "Opening Portal..." : "Open Portal"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default Subscription;
