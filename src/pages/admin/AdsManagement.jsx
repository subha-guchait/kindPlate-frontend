// src/pages/AdminAdsManagement.jsx
import { useState } from "react";
import useAds from "@/hooks/admin/useAds";
import LiveAds from "@/components/adminDashboard/ads/LiveAds";
import PastAds from "@/components/adminDashboard/ads/PastAds";
import AdsFilters from "@/components/adminDashboard/ads/AdsFilters";

export default function AdsManagement() {
  const [tab, setTab] = useState("live"); // "live" | "past"
  const {
    liveAds,
    pastAds,
    pauseAd,
    deleteAd,
    pageLive,
    setPageLive,
    totalLive,
    pagePast,
    setPagePast,
    totalPast,
    filters,
    setFilters,
    loading,
  } = useAds();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📢 Ads Management</h1>

      {/* Filters */}
      <AdsFilters filters={filters} setFilters={setFilters} />

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTab("live")}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
            tab === "live" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Live Ads
          <span
            className={`px-2 py-0.5 rounded-full text-sm ${
              tab === "live"
                ? "bg-white text-blue-600"
                : "bg-blue-600 text-white"
            }`}
          >
            {totalLive}
          </span>
        </button>

        <button
          onClick={() => setTab("past")}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
            tab === "past" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Past Ads
          <span
            className={`px-2 py-0.5 rounded-full text-sm ${
              tab === "past"
                ? "bg-white text-blue-600"
                : "bg-blue-600 text-white"
            }`}
          >
            {totalPast}
          </span>
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading ads...</p>
      ) : tab === "live" ? (
        <LiveAds
          ads={liveAds}
          pauseAd={pauseAd}
          deleteAd={deleteAd}
          page={pageLive}
          setPage={setPageLive}
          total={totalLive}
        />
      ) : (
        <PastAds
          ads={pastAds}
          page={pagePast}
          setPage={setPagePast}
          total={totalPast}
        />
      )}
    </div>
  );
}
