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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search, Users, CreditCard, TrendingUp, AlertCircle } from "lucide-react";

// Mock data - replace with actual data from your backend
const subscriptionStats = [
  {
    title: "Total Subscribers",
    value: "2,543",
    change: "+12.5%",
    icon: Users,
  },
  {
    title: "Active Plans",
    value: "1,892",
    change: "+8.2%",
    icon: CreditCard,
  },
  {
    title: "Monthly Revenue",
    value: "$45,231",
    change: "+15.3%",
    icon: TrendingUp,
  },
  {
    title: "Churn Rate",
    value: "2.4%",
    change: "-0.8%",
    icon: AlertCircle,
  },
];

const subscriptions = [
  {
    id: "1",
    customer: "John Doe",
    email: "john@example.com",
    plan: "Pro",
    status: "active",
    amount: "$9.99",
    nextBilling: "2024-04-01",
  },
  {
    id: "2",
    customer: "Jane Smith",
    email: "jane@example.com",
    plan: "Enterprise",
    status: "active",
    amount: "$29.99",
    nextBilling: "2024-04-15",
  },
  {
    id: "3",
    customer: "Bob Johnson",
    email: "bob@example.com",
    plan: "Free",
    status: "inactive",
    amount: "$0",
    nextBilling: "N/A",
  },
  // Add more mock data as needed
];

const SubscriptionsView = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Subscription Management</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search subscriptions..." className="pl-8 w-[300px]" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button>Export Data</Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subscriptionStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={`text-xs ${
                  stat.change.startsWith("+") ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Subscriptions</CardTitle>
          <CardDescription>Manage your customer subscriptions and billing</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Next Billing</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="font-medium">{subscription.customer}</TableCell>
                  <TableCell>{subscription.email}</TableCell>
                  <TableCell>{subscription.plan}</TableCell>
                  <TableCell>
                    <Badge variant={subscription.status === "active" ? "default" : "secondary"}>
                      {subscription.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{subscription.amount}</TableCell>
                  <TableCell>{subscription.nextBilling}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Subscription</DropdownMenuItem>
                        <DropdownMenuItem>Send Invoice</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Cancel Subscription
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionsView;
