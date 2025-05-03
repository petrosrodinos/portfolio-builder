import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Subscription as SubscriptionType } from "@/interfaces/billing";

interface SubscriptionProps {
  subscription: SubscriptionType;
  onOpenPortal: () => void;
  isPending: boolean;
}

const Subscription = ({ subscription, onOpenPortal, isPending }: SubscriptionProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Current Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          {subscription ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-muted-foreground">Status</p>
                <p className={`font-medium ${["active", "trialing"].includes(subscription?.status) ? "text-green-500" : "text-red-500"}`}>
                  {["active", "trialing"].includes(subscription?.status) && "Active"}
                  {subscription.status == "trialing" && " (Trial)"}
                  {subscription?.status === "past_due" && "Past Due"}
                  {subscription?.status === "unpaid" && "Unpaid"}
                  {subscription?.status === "incomplete" && "Incomplete"}
                  {subscription?.status === "incomplete_expired" && "Incomplete Expired"}
                  {subscription?.status === "canceled" && "Canceled"}
                </p>
              </div>
              <div>
                {!subscription?.canceled_at && (
                  <div>
                    <p className="text-muted-foreground">Next Billing Date</p>
                    <p className="font-medium">
                      {subscription?.current_period_end && formatDate(subscription?.current_period_end)}
                      {subscription?.trial_end && formatDate(subscription?.trial_end)}
                    </p>
                  </div>
                )}
                {subscription?.canceled_at && (
                  <div>
                    <p className="text-muted-foreground">Canceled at</p>
                    <p className="font-medium">{formatDate(subscription?.canceled_at)}</p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-muted-foreground">Billing Cycle</p>
                {!subscription.canceled_at && <p className="font-medium">{subscription?.prices?.interval === "month" ? "Monthly" : "Yearly"}</p>}
                {subscription.canceled_at && <p className="font-medium text-red-500">Active until {formatDate(subscription?.cancel_at)}</p>}
              </div>
              <div>
                <p className="text-muted-foreground">Created at</p>
                <p className="font-medium">{formatDate(subscription?.created)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Plan</p>
                <p className="font-medium">{subscription?.prices?.products?.name}</p>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">No subscription found. Please subscribe to a plan above.</p>
          )}
        </CardContent>
        <CardFooter className="flex gap-4">
          {subscription && (
            <Button disabled={isPending} onClick={() => onOpenPortal()} variant="outline">
              {isPending ? "Opening Portal..." : "Open Portal"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default Subscription;
