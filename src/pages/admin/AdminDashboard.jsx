import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  UtensilsCrossed,
  HandHeart,
  IndianRupee,
  FileDown,
  Megaphone,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import useAdminDashboard from "@/hooks/admin/useAdminDashboard";

import StatCard from "@/components/adminDashboard/StatCard";
import ChartCard from "@/components/adminDashboard/ChartCard";

export default function AdminDashboard() {
  const {
    revenueData,
    revenuePeriod,
    setRevenuePeriod,
    revenueYear,
    setRevenueYear,
    revenueMonth,
    setRevenueMonth,

    donationData,
    donationPeriod,
    setDonationPeriod,
    donationYear,
    setDonationYear,
    donationMonth,
    setDonationMonth,
    summary,
    loadingSummary,
    errorSummary,
  } = useAdminDashboard();

  const stats = [
    {
      icon: <IndianRupee className="w-6 h-6" />,
      label: "Total Revenue",
      value: `₹${summary?.totalPayments || 0}`,
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: "Total Users",
      value: summary?.totalUsers || 0,
    },
    {
      icon: <UtensilsCrossed className="w-6 h-6" />,
      label: "Food Donations",
      value: summary?.totalFoodDonated || 0,
    },
    {
      icon: <Megaphone className="w-6 h-6" />,
      label: "Ads",
      value: summary?.totalApprovedAds || 0,
    },
  ];

  const charts = [
    {
      title: "Food Donations",
      data: donationData,
      dataKey: "donations",
      barColor: "#4f46e5",
      lineColor: "#4f46e5",
      period: donationPeriod,
      setPeriod: setDonationPeriod,
      year: donationYear,
      setYear: setDonationYear,
      month: donationMonth,
      setMonth: setDonationMonth,
    },
    {
      title: "Revenue",
      data: revenueData,
      dataKey: "revenue",
      barColor: "#16a34a",
      lineColor: "#16a34a",
      period: revenuePeriod,
      setPeriod: setRevenuePeriod,
      year: revenueYear,
      setYear: setRevenueYear,
      month: revenueMonth,
      setMonth: setRevenueMonth,
    },
  ];

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Admin Dashboard Report</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #111827;
            }
            h1 {
              text-align: center;
              margin-bottom: 30px;
              color: #1f2937;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th, td {
              border: 1px solid #d1d5db;
              padding: 12px 15px;
              text-align: left;
            }
            th {
              background-color: #f3f4f6;
              color: #111827;
            }
            tr:nth-child(even) {
              background-color: #f9fafb;
            }
          </style>
        </head>
        <body>
          <h1>Admin Dashboard Report</h1>
          <table>
            <tr><th>Metric</th><th>Value</th></tr>
            ${stats
              .map((s) => `<tr><td>${s.label}</td><td>${s.value}</td></tr>`)
              .join("")}
          </table>
          <p>Generated on: ${new Date().toLocaleString()}</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <Button onClick={handlePrint} className="cursor-pointer">
          <FileDown className="w-4 h-4 mr-2" /> Export Report
        </Button>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} loading={loadingSummary} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {charts.map((chart, idx) => (
          <ChartCard key={idx} {...chart} />
        ))}
      </div>
    </div>
  );
}
