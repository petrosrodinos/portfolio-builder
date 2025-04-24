"use client";
import React from "react";
import Analytics from "./components/analytics";
import RecentUpdates from "./components/recent-updates";
import QuickActions from "./components/quick-actions";
import Header from "./components/header";
import ChooseTemplate from "./components/choose-template";
import { getPortfolio } from "@/services/portfolio";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth";

const Dashboard = () => {
  const { user_id } = useAuthStore();
  const { data } = useQuery({
    queryKey: ["portfolio"],
    queryFn: () => getPortfolio(user_id),
    enabled: !!user_id,
  });

  return (
    <div className="container mx-auto p-6">
      <Header />

      <Analytics portfolio={data} />

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <RecentUpdates />

        <QuickActions portfolio={data} />
      </div>
      <ChooseTemplate />
    </div>
  );
};

export default Dashboard;
