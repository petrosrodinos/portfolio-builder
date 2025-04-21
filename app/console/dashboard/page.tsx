"use client";
import React from "react";
import Analytics from "./components/analytics";
import RecentUpdates from "./components/recent-updates";
import QuickActions from "./components/quick-actions";
import Header from "./components/header";
import ChooseTemplate from "./components/choose-template";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <Header />

      <Analytics />

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <RecentUpdates />

        <QuickActions />
      </div>
      <ChooseTemplate />
    </div>
  );
};

export default Dashboard;
