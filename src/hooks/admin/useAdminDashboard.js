import { useState, useEffect } from "react";
import {
  getRevenueStats,
  getDonationStats,
  getSummary,
} from "@/api/admin/analyticsApi";
import toast from "react-hot-toast";

export default function useAdminDashboard() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonthIndex = now.getMonth();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonth = months[currentMonthIndex];

  // ---------- Revenue State ----------
  const [revenuePeriod, setRevenuePeriod] = useState("weekly");
  const [revenueYear, setRevenueYear] = useState(currentYear.toString());
  const [revenueMonth, setRevenueMonth] = useState(currentMonth);
  const [revenueData, setRevenueData] = useState([]);
  const [revenueCache, setRevenueCache] = useState({});

  // ---------- Donation State ----------
  const [donationPeriod, setDonationPeriod] = useState("weekly");
  const [donationYear, setDonationYear] = useState(currentYear.toString());
  const [donationMonth, setDonationMonth] = useState(currentMonth);
  const [donationData, setDonationData] = useState([]);
  const [donationCache, setDonationCache] = useState({});

  // ---------- Summary State ----------
  const [summary, setSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(true);

  // ---------- Helpers ----------
  const getCacheKey = (period, month, year) => `${period}-${month}-${year}`;

  const getMonthNumber = (label) => months.indexOf(label) + 1;

  // ---------- Revenue Fetch ----------
  useEffect(() => {
    const fetchRevenue = async () => {
      const key = getCacheKey(revenuePeriod, revenueMonth, revenueYear);

      if (revenueCache[key]) {
        setRevenueData(revenueCache[key]);
        return;
      }

      try {
        const data = await getRevenueStats({
          period: revenuePeriod,
          month: getMonthNumber(revenueMonth),
          year: revenueYear,
        });
        setRevenueData(data.data);
        setRevenueCache((prev) => ({ ...prev, [key]: data.data }));
      } catch (err) {
        toast.error(err.message || "Failed to fetch revenue stats:");
      }
    };

    fetchRevenue();
  }, [revenuePeriod, revenueMonth, revenueYear]);

  // ---------- Donation Fetch ----------
  useEffect(() => {
    const fetchDonations = async () => {
      const key = getCacheKey(donationPeriod, donationMonth, donationYear);

      if (donationCache[key]) {
        setDonationData(donationCache[key]);
        return;
      }

      try {
        const data = await getDonationStats({
          period: donationPeriod,
          month: getMonthNumber(donationMonth),
          year: donationYear,
        });
        setDonationData(data.data);
        setDonationCache((prev) => ({ ...prev, [key]: data.data }));
      } catch (err) {
        toast.error(err.message || "Failed to fetch donation stats:");
      }
    };

    fetchDonations();
  }, [donationPeriod, donationMonth, donationYear]);

  // ---------- Summary Fetch ----------
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoadingSummary(true);
        const data = await getSummary();
        setSummary(data.stats);
      } catch (err) {
        toast.error(err.message || "Failed to fetch summary");
      } finally {
        setLoadingSummary(false);
      }
    };

    fetchSummary();
  }, []);

  return {
    // revenue
    revenueData,
    revenuePeriod,
    setRevenuePeriod,
    revenueYear,
    setRevenueYear,
    revenueMonth,
    setRevenueMonth,

    // donation
    donationData,
    donationPeriod,
    setDonationPeriod,
    donationYear,
    setDonationYear,
    donationMonth,
    setDonationMonth,

    // summary
    summary,
    loadingSummary,
  };
}
