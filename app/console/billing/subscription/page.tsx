import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Plans from "./components/plans";
const Subscription = () => {
  return (
    <div className="container py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Subscription Management</h1>
          <p className="text-muted-foreground text-lg">
            Choose the perfect plan for your portfolio needs
          </p>
        </div>

        <Plans />

        <Card>
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-muted-foreground">Status</p>
                <p className="text-green-500 font-medium">Active</p>
              </div>
              <div>
                <p className="text-muted-foreground">Next Billing Date</p>
                <p className="font-medium">March 1, 2024</p>
              </div>
              <div>
                <p className="text-muted-foreground">Payment Method</p>
                <p className="font-medium">•••• •••• •••• 4242</p>
              </div>
              <div>
                <p className="text-muted-foreground">Billing Cycle</p>
                <p className="font-medium">Monthly</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button variant="outline">Update Payment Method</Button>
            <Button variant="outline">View Billing History</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Subscription;
