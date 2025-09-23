import AdsCard from "./AdsCard";
import { Button } from "@/components/ui/button";

export default function PausedAds({
  ads,
  resumeAd,
  deleteAd,
  page,
  setPage,
  total,
  hasNextPage,
  hasPreviousPage,
}) {
  return (
    <div className="space-y-6">
      {ads.length === 0 ? (
        <p className="text-gray-500">No Paused ads available.</p>
      ) : (
        ads.map((ad) => (
          <AdsCard
            key={ad._id}
            ad={ad}
            resumeAd={resumeAd}
            deleteAd={deleteAd}
          />
        ))
      )}

      <div className="flex justify-center gap-4 mt-6">
        <Button
          variant="outline"
          disabled={page === 1 || !hasPreviousPage}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          disabled={!hasNextPage}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
