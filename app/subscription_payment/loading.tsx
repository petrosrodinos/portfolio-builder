import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <Skeleton className="h-8 w-48 mx-auto" />
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-4 w-72" />
          <Skeleton className="h-10 w-full mt-4" />
        </CardContent>
      </Card>
    </div>
  );
};

export default Loading;
