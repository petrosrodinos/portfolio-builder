"use client";

import React from "react";
import { getAllReferredUsers, getAffiliateCodes } from "@/services/affiliate";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AFFILIATE_COMMISSION_PERCENTAGE } from "@/constants/index";
import Loading from "../users/components/loading";

const Affiliates = () => {
  const {
    data: referralsData,
    isLoading: referralsLoading,
    error: referralsError,
  } = useQuery({
    queryKey: ["affiliates"],
    queryFn: getAllReferredUsers,
  });

  const {
    data: codesData,
    isLoading: codesLoading,
    error: codesError,
  } = useQuery({
    queryKey: ["affiliateCodes"],
    queryFn: getAffiliateCodes,
  });

  if (referralsLoading || codesLoading) return <Loading />;
  if (referralsError || codesError) return <div>Error loading data</div>;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Affiliate Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Referral ID</TableHead>
                  <TableHead>Referrer ID</TableHead>
                  <TableHead>Referrer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Total Referrals</TableHead>
                  <TableHead>Active Subscriptions</TableHead>
                  <TableHead>Trailing Subscriptions</TableHead>
                  <TableHead>Total Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(referralsData || {}).map(([referrerId, users]) => {
                  const activeSubscriptions = users.filter((user) => user.users.subscriptions?.status === "active").length;
                  const trialingSubscriptions = users.filter((user) => user.users.subscriptions?.status === "trialing").length;
                  const totalRevenue = users.reduce((sum, user) => {
                    const amount = user.users.subscriptions?.prices?.unit_amount * AFFILIATE_COMMISSION_PERCENTAGE || 0;
                    return sum + amount / 100;
                  }, 0);

                  return (
                    <TableRow key={referrerId}>
                      <TableCell className="font-medium">{users[0].id}</TableCell>
                      <TableCell className="font-medium">{referrerId}</TableCell>
                      <TableCell>{users[0].referrer.full_name}</TableCell>
                      <TableCell>{users[0].referrer.email}</TableCell>
                      <TableCell>{users.length}</TableCell>
                      <TableCell>
                        <Badge variant="default">{activeSubscriptions}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">{trialingSubscriptions}</Badge>
                      </TableCell>
                      <TableCell>${totalRevenue.toFixed(2)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Affiliate Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {codesData?.map((code) => (
                  <TableRow key={code.id}>
                    <TableCell className="font-medium">{code.code}</TableCell>
                    <TableCell>{code.user_id}</TableCell>
                    <TableCell>{code.users?.full_name}</TableCell>
                    <TableCell>{code.users?.email}</TableCell>
                    <TableCell>{new Date(code.created_at).toLocaleDateString()}</TableCell>
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

export default Affiliates;
