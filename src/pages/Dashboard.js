// src/pages/Dashboard.js
import React from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import TradingPairsWidget from "../components/dashboard/TradingPairsWidget";

const Dashboard = () => {
  return (
      <div className="space-y-8">
        <DashboardHeader />

        <TradingPairsWidget />

      </div>
  );
};

export default Dashboard;
