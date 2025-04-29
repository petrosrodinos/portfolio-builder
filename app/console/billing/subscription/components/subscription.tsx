import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { createStripePortal } from "@/services/subscriptions/stripe";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";

interface SubscriptionProps {
  subscription: any;
}

const Subscription = ({ subscription }: SubscriptionProps) => {
  const router = useRouter();
  const currentPath = usePathname();

  const { mutate, isPending } = useMutation({
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
              <div>
                <p className="text-muted-foreground">Next Billing Date</p>
                <p className="font-medium">
                  {subscription?.current_period_end
                    ? new Date(subscription?.current_period_end).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              {/* <div>
              <p className="text-muted-foreground">Payment Method</p>
              <p className="font-medium">
                {subscription?.default_payment_method?.card?.brand || "N/A"}
              </p>
            </div> */}
              <div>
                <p className="text-muted-foreground">Billing Cycle</p>
                <p className="font-medium">
                  {subscription?.prices?.interval === "month" ? "Monthly" : "Yearly"}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            {/* <Button variant="outline">Update Payment Method</Button> */}
            <Button disabled={isPending} onClick={() => mutate()} variant="outline">
              {isPending ? "Opening Portal..." : "Open Portal"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default Subscription;
