// src/hooks/useAds.js
import { useState, useEffect } from "react";
import axios from "axios";

export default function useAds() {
  const [liveAds, setLiveAds] = useState([]);
  const [pastAds, setPastAds] = useState([]);
  const [pageLive, setPageLive] = useState(1);
  const [pagePast, setPagePast] = useState(1);
  const [totalLive, setTotalLive] = useState(0);
  const [totalPast, setTotalPast] = useState(0);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    user: "",
    startDate: "",
    endDate: "",
  });

  const liveAdsMock = [
    {
      id: "1",
      title: "50% Off Pizza Hut",
      advertiser: "Pizza Hut",
      user: {
        username: "john_doe",
        name: "John Doe",
        email: "john@example.com",
        mobile: "+91 9876543210",
      },
      paymentStatus: "Paid",
      startDate: "2025-09-01",
      endDate: "2025-09-20",
      image: "https://picsum.photos/seed/pizza/400/200",
      status: "Live",
    },
    {
      id: "2",
      title: "Buy 1 Get 1 Free Coffee",
      advertiser: "Starbucks",
      user: {
        username: "jane_smith",
        name: "Jane Smith",
        email: "jane@example.com",
        mobile: "+91 9123456780",
      },
      paymentStatus: "Pending",
      startDate: "2025-09-05",
      endDate: "2025-09-15",
      image: "https://picsum.photos/seed/coffee/400/200",
      status: "Live",
    },
  ];

  const pastAdsMock = [
    {
      id: "101",
      title: "Summer Sale 2025",
      advertiser: "Zara",
      user: {
        username: "fashionista_99",
        name: "Riya Sharma",
        email: "riya@example.com",
        mobile: "+91 9988776655",
      },
      paymentStatus: "Paid",
      startDate: "2025-06-01",
      endDate: "2025-06-30",
      image: "https://picsum.photos/seed/zara/400/200",
      status: "Expired",
    },
    {
      id: "102",
      title: "Tech Expo Banner",
      advertiser: "Samsung",
      user: {
        username: "tech_guru",
        name: "Amit Verma",
        email: "amit@example.com",
        mobile: "+91 9090909090",
      },
      paymentStatus: "Paid",
      startDate: "2025-07-10",
      endDate: "2025-07-25",
      image: "https://picsum.photos/seed/tech/400/200",
      status: "Deleted",
    },
  ];

  const fetchAds = async () => {
    setLoading(true);
    try {
      const [liveRes, pastRes] = await Promise.all([
        axios.get(`/api/admin/ads/live`, {
          params: { page: pageLive, ...filters },
        }),
        axios.get(`/api/admin/ads/past`, {
          params: { page: pagePast, ...filters },
        }),
      ]);

      //   setLiveAds(liveRes.data.ads);
      setLiveAds(liveAdsMock);
      //   setTotalLive(liveRes.data.total);
      setTotalLive(liveAdsMock.length);
      //   setPastAds(pastRes.data.ads);
      setPastAds(pastAdsMock);
      //   setTotalPast(pastRes.data.total);
      setTotalPast(pastAdsMock.length);
    } catch (err) {
      console.error("Error fetching ads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, [pageLive, pagePast, filters]);

  const pauseAd = async (id) => {
    await axios.patch(`/api/admin/ads/${id}/pause`);
    fetchAds();
  };

  const deleteAd = async (id) => {
    await axios.delete(`/api/admin/ads/${id}`);
    fetchAds();
  };

  return {
    liveAds,
    pastAds,
    pageLive,
    setPageLive,
    pagePast,
    setPagePast,
    totalLive,
    totalPast,
    filters,
    setFilters,
    loading,
    pauseAd,
    deleteAd,
  };
}
