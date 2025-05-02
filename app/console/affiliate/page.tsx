"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Copy, Users, DollarSign, Link } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [affiliateLink, setAffiliateLink] = useState<string>("");
  const totalEarnings = 80;
  const totalReferrals = 2;

  const generateAffiliateLink = () => {
    const userId = "user123";
    const baseUrl = "https://portfolio-builder.com";
    const newLink = `${baseUrl}/ref/${userId}`;
    setAffiliateLink(newLink);
    toast({
      title: "Affiliate link generated",
      description: "Your new affiliate link has been created successfully.",
    });
  };

  const copyToClipboard = () => {
    if (!affiliateLink) {
      toast({
        title: "No link to copy",
        description: "Please generate an affiliate link first.",
        variant: "destructive",
      });
      return;
    }
    navigator.clipboard.writeText(affiliateLink);
    toast({
      title: "Link copied",
      description: "Your affiliate link has been copied to clipboard.",
    });
  };

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

      <Card>
        <CardHeader>
          <CardTitle>Your Affiliate Link</CardTitle>
          <CardDescription>
            Generate and share your unique affiliate link to earn commissions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col gap-2 w-full">
            <div className="relative flex-1 min-w-0">
              <Input
                value={affiliateLink}
                readOnly
                className="w-full font-mono text-sm pr-8 h-9"
                placeholder="Generate a link to get started"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "auto",
                  textOverflow: "unset",
                }}
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-0 h-9 w-9"
                onClick={copyToClipboard}
                disabled={!affiliateLink}
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="flex justify-start">
              <Button onClick={generateAffiliateLink} className="h-9 text-sm px-3">
                <Link className="h-3.5 w-3.5 mr-1.5" />
                Generate Link
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
