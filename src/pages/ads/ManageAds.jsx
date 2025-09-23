import { useState } from "react";
import useManageAds from "@/hooks/useManageAds";
import LiveAds from "@/components/userAds/LiveAds";
import PastAds from "@/components/userAds/PastAds";
import PausedAds from "@/components/userAds/PausedAds";

export default function ManageAds() {
  // const [tab, setTab] = useState("live"); // "live" | "past"
  const {
    tab,
    setTab,
    liveAds,
    pausedAds,
    pastAds,
    pauseAd,
    resumeAd,
    deleteAd,
    pageLive,
    setPageLive,
    pagePaused,
    setPagePaused,
    totalLive,
    pagePast,
    setPagePast,
    totalPast,
    totalPaused,
    loading,
    hasLivePreviousPage,
    hasLiveNextPage,
    hasPausedPreviousPage,
    hasPausedNextPage,
    hasPastPreviousPage,
    hasPastNextPage,
  } = useManageAds();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📢 My Ads</h1>

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
          onClick={() => setTab("paused")}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
            tab === "paused" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Paused Ads
          <span
            className={`px-2 py-0.5 rounded-full text-sm ${
              tab === "paused"
                ? "bg-white text-blue-600"
                : "bg-blue-600 text-white"
            }`}
          >
            {totalPaused}
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
          hasPreviousPage={hasLivePreviousPage}
          hasNextPage={hasLiveNextPage}
        />
      ) : tab === "paused" ? (
        <PausedAds
          ads={pausedAds}
          resumeAd={resumeAd}
          deleteAd={deleteAd}
          page={pagePaused}
          setPage={setPagePaused}
          total={totalPaused}
          hasPreviousPage={hasPausedPreviousPage}
          hasNextPage={hasPausedNextPage}
        />
      ) : (
        <PastAds
          ads={pastAds}
          page={pagePast}
          setPage={setPagePast}
          total={totalPast}
          hasPreviousPage={hasPastPreviousPage}
          hasNextPage={hasPastNextPage}
        />
      )}
    </div>
  );
}
