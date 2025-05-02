"use client";

import React from "react";
import Stats from "./components/stats";
import Charts from "./components/charts";
import Users from "./components/users";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/user";
import Loading from "./components/loading";

function DashboardView() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  if (isLoading) return <Loading />;
  return (
    <div className="w-full min-h-screen bg-background">
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        </div>

        <Stats users={users} />

        <Charts users={users} />

        <Users users={users} />
      </div>
    </div>
  );
}

export default DashboardView;
