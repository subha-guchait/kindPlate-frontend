// src/hooks/useManageAds.js
import { useState, useEffect } from "react";
import {
  getUserAd,
  pauseAd as pauseAdApi,
  resumeAd as resumeAdApi,
  deleteAd as deleteAdApi,
} from "@/api/adApi";

export default function useManageAds() {
  const [liveAds, setLiveAds] = useState([]);
  const [pausedAds, setPausedAds] = useState([]);
  const [pastAds, setPastAds] = useState([]);
  const [pageLive, setPageLive] = useState(1);
  const [pagePaused, setPagePaused] = useState(1);
  const [pagePast, setPagePast] = useState(1);

  // Totals (synced from any response)
  const [totalLive, setTotalLive] = useState(0);
  const [totalPaused, setTotalPaused] = useState(0);
  const [totalPast, setTotalPast] = useState(0);

  //pagination
  const [hasLiveNextPage, setHasLiveNextPage] = useState(false);
  const [hasLivePreviousPage, setHasLivePreviousPage] = useState(false);
  const [hasPausedNextPage, setHasPausedNextPage] = useState(false);
  const [hasPausedPreviousPage, setHasPausedPreviousPage] = useState(false);
  const [hasPastNextPage, setHasPastNextPage] = useState(false);
  const [hasPastPreviousPage, setHasPastPreviousPage] = useState(false);

  const [loading, setLoading] = useState(false);

  const [tab, setTab] = useState("live");

  const fetchAds = async (status, page) => {
    try {
      setLoading(true);
      const data = await getUserAd({ status, page });

      // Update ads based on status
      if (status === "live") {
        setLiveAds(data.ads);
        setHasLivePreviousPage(data.hasPreviousPage);
        setHasLiveNextPage(data.hasNextPage);
      }
      if (status === "paused") {
        setPausedAds(data.ads);
        setHasPausedPreviousPage(data.hasPreviousPage);
        setHasPausedNextPage(data.hasNextPage);
      }
      if (status === "expired") {
        setPastAds(data.ads);
        setHasPastPreviousPage(data.hasPreviousPage);
        setHasPastNextPage(data.hasNextPage);
      }

      // ✅ Update totals from stats (keeps all in sync)
      if (data.stats) {
        setTotalLive(data.stats.live || 0);
        setTotalPaused(data.stats.paused || 0);
        setTotalPast(data.stats.expired || 0);
      }
    } catch (err) {
      console.error("Failed to fetch ads", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on page changes
  useEffect(() => {
    if (tab === "live") fetchAds("live", pageLive);
    if (tab === "paused") fetchAds("paused", pagePaused);
    if (tab === "past") fetchAds("expired", pagePast);
  }, [tab, pageLive, pagePaused, pagePast]);

  // Actions
  const handlePauseAd = async (id) => {
    const res = await pauseAdApi(id); // assume this returns the updated ad

    setLiveAds((prev) => prev.filter((ad) => ad._id !== id));
    setPausedAds((prev) => [res.ad, ...prev]); // put updated ad into paused
    setTotalLive((prev) => prev - 1);
    setTotalPaused((prev) => prev + 1);
  };

  const handleResumeAd = async (id) => {
    // console.log("resume ad called");
    const res = await resumeAdApi(id);

    setPausedAds((prev) => prev.filter((ad) => ad._id !== id));
    setLiveAds((prev) => [res.ad, ...prev]); // put updated ad into live

    setTotalLive((prev) => prev + 1);
    setTotalPaused((prev) => prev - 1);
  };

  const handleDeleteAd = async (id) => {
    await deleteAdApi(id);

    // Remove from whichever tab it's currently in
    setLiveAds((prev) => prev.filter((ad) => ad._id !== id));
    setPausedAds((prev) => prev.filter((ad) => ad._id !== id));
    setPastAds((prev) => prev.filter((ad) => ad._id !== id));
  };

  return {
    tab,
    setTab,
    liveAds,
    pausedAds,
    pastAds,
    pageLive,
    setPageLive,
    pagePaused,
    setPagePaused,
    pagePast,
    setPagePast,
    totalLive,
    totalPaused,
    totalPast,
    loading,
    pauseAd: handlePauseAd,
    resumeAd: handleResumeAd,
    deleteAd: handleDeleteAd,
    refreshAds: fetchAds,
    hasLivePreviousPage,
    hasLiveNextPage,
    hasPausedPreviousPage,
    hasPausedNextPage,
    hasPastPreviousPage,
    hasPastNextPage,
  };
}
