"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersIcon, ArrowUpRight, ArrowDownRight, UserCheck } from "lucide-react";
import React from "react";
import { User } from "@/interfaces/user";

interface StatsProps {
  users: User[];
}

const Stats = ({ users }: StatsProps) => {
  const totalUsers = users.length;
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const usersThisMonth = users.filter((user) => {
    const userDate = new Date(user.created_at);
    return userDate.getMonth() === currentMonth && userDate.getFullYear() === currentYear;
  }).length;

  const usersLastMonth = users.filter((user) => {
    const userDate = new Date(user.created_at);
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const year = currentMonth === 0 ? currentYear - 1 : currentYear;
    return userDate.getMonth() === lastMonth && userDate.getFullYear() === year;
  }).length;

  const activeUsers = users.filter((user) => user.subscriptions).length;

  const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
  };

  const newUsersChange = calculatePercentageChange(usersThisMonth, usersLastMonth);
  const newUsersChangeFormatted = `${newUsersChange >= 0 ? "+" : ""}${newUsersChange.toFixed(1)}%`;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers.toString(),
      change: "",
      icon: UsersIcon,
      trend: "up",
    },
    {
      title: "New Users This Month",
      value: usersThisMonth.toString(),
      change: newUsersChangeFormatted,
      icon: UsersIcon,
      trend: newUsersChange >= 0 ? "up" : "down",
    },
    {
      title: "Active Users",
      value: activeUsers.toString(),
      change: `${((activeUsers / totalUsers) * 100).toFixed(1)}%`,
      icon: UserCheck,
      trend: "up",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat, index) => (
        <Card key={index} className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {stat.change && (
              <div className="flex items-center text-xs">
                {stat.trend === "up" ? <ArrowUpRight className="h-4 w-4 text-green-500" /> : <ArrowDownRight className="h-4 w-4 text-red-500" />}
                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                {stat.title === "New Users This Month" && <span className="text-muted-foreground ml-1">from last month</span>}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Stats;
