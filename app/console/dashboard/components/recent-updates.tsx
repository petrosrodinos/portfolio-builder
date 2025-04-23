import { Card } from "@/components/ui/card";
import React from "react";
import { Badge } from "@/components/ui/badge";

const RecentUpdates = () => {
  const skeletonUpdates = [
    { titleWidth: "w-3/4", timeWidth: "w-1/4" },
    { titleWidth: "w-2/3", timeWidth: "w-1/3" },
    { titleWidth: "w-1/2", timeWidth: "w-1/5" },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recent Updates</h2>
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
          Under Construction
        </Badge>
      </div>
      <div className="space-y-4">
        {skeletonUpdates.map((update, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <div className="w-full">
              <div className={`h-5 ${update.titleWidth} mb-1 rounded-md bg-gray-200`} />
              <div className={`h-4 ${update.timeWidth} rounded-md bg-gray-300`} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentUpdates;
