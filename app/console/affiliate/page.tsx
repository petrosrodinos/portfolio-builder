"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/stores/auth";
import GenerateCode from "./components/generate-code";
const mockReferredUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    date: new Date("2024-03-15"),
    status: "active",
    commission: 50,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    date: new Date("2024-03-10"),
    status: "pending",
    commission: 30,
  },
];

const AffiliatePage = () => {
  const { user_id } = useAuthStore();
  const { toast } = useToast();
  const totalEarnings = 80;
  const totalReferrals = 2;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Affiliate Program</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Card className="w-full sm:w-[200px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalEarnings}</div>
            </CardContent>
          </Card>
          <Card className="w-full sm:w-[200px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalReferrals}</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <GenerateCode />

      <Card>
        <CardHeader>
          <CardTitle>Referred Users</CardTitle>
          <CardDescription>Track your referrals and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[120px]">Name</TableHead>
                  <TableHead className="min-w-[180px]">Email</TableHead>
                  <TableHead className="min-w-[120px]">Date</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="text-right min-w-[100px]">Commission</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReferredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">{user.email}</TableCell>
                    <TableCell>{format(user.date, "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      <Badge
                        variant={user.status === "active" ? "default" : "secondary"}
                        className="whitespace-nowrap"
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">${user.commission}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AffiliatePage;
