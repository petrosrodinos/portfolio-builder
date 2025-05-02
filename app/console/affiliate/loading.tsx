import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-[200px]" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-[300px]" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-col gap-2 w-full">
          <div className="relative flex-1 min-w-0">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="absolute right-0 top-0 h-9 w-9" />
          </div>
          <div className="flex justify-start">
            <Skeleton className="h-9 w-[120px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Loading;
