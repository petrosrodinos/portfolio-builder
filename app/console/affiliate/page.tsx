"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign } from "lucide-react";
import GenerateCode from "./components/generate-code";
import { getReferredUsers } from "@/services/affiliate";
import { useAuthStore } from "@/stores/auth";
import { useQuery } from "@tanstack/react-query";
import ReferedUsers from "./components/refered-users";
const AffiliatePage = () => {
  const totalEarnings = 80;
  const totalReferrals = 2;

  const { user_id } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ["referred-users", user_id],
    queryFn: () => getReferredUsers(user_id),
  });

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
              <div className="text-2xl font-bold">{data?.length}</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <GenerateCode />

      <ReferedUsers referredUsers={data} isLoading={isLoading} />
    </div>
  );
};

export default AffiliatePage;
