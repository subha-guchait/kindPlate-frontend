// src/components/ads/LiveAds.jsx
import AdsCard from "./AdsCard";
import { Button } from "@/components/ui/button";

export default function LiveAds({
  ads,
  pauseAd,
  deleteAd,
  page,
  setPage,
  total,
}) {
  const hasNext = page * 10 < total;

  return (
    <div className="space-y-6">
      {ads.length === 0 ? (
        <p className="text-gray-500">No live ads available.</p>
      ) : (
        ads.map((ad) => (
          <AdsCard key={ad._id} ad={ad} pauseAd={pauseAd} deleteAd={deleteAd} />
        ))
      )}

      <div className="flex justify-center gap-4 mt-6">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          disabled={!hasNext}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
