import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface LoadingProps {
  type?: "card" | "table";
}

const Loading = ({ type = "card" }: LoadingProps) => {
  if (type === "card") {
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
  }

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
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">
                  <Skeleton className="h-4 w-[80px]" />
                </TableHead>
                <TableHead className="min-w-[180px]">
                  <Skeleton className="h-4 w-[120px]" />
                </TableHead>
                <TableHead className="min-w-[120px]">
                  <Skeleton className="h-4 w-[80px]" />
                </TableHead>
                <TableHead className="min-w-[100px]">
                  <Skeleton className="h-4 w-[80px]" />
                </TableHead>
                <TableHead className="text-right min-w-[100px]">
                  <Skeleton className="h-4 w-[80px] ml-auto" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Skeleton className="h-4 w-[150px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[80px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[60px]" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-4 w-[60px] ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Loading;
