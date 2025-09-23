import AdsCard from "./AdsCard";
import { Button } from "@/components/ui/button";

export default function PastAds({
  ads,
  page,
  setPage,
  total,
  hasNextPage,
  hasPreviousPage,
}) {
  return (
    <div className="space-y-6">
      {ads.length === 0 ? (
        <p className="text-gray-500">No past ads found.</p>
      ) : (
        ads.map((ad) => <AdsCard key={ad._id} ad={ad} readOnly />)
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
