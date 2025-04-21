import { Card } from "@/components/ui/card";
import React from "react";

const RecentUpdates = () => {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-semibold">Recent Updates</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <div>
            <p className="font-medium">Added new project: E-commerce Dashboard</p>
            <p className="text-sm text-muted-foreground">2 hours ago</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <div>
            <p className="font-medium">Updated skills section</p>
            <p className="text-sm text-muted-foreground">Yesterday</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <div>
            <p className="font-medium">Changed portfolio theme</p>
            <p className="text-sm text-muted-foreground">3 days ago</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecentUpdates;
