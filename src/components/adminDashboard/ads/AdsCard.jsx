import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function AdsCard({ ad, pauseAd, deleteAd, readOnly }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white overflow-hidden"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-1/3 w-full">
          <img
            src={ad.image}
            alt={ad.title}
            className="h-48 md:h-full w-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">{ad.title}</h2>
            <p className="text-sm text-gray-600">
              Advertiser: <span className="font-medium">{ad.advertiser}</span>
            </p>
            <p className="text-sm">
              Payment:{" "}
              <span
                className={
                  ad.paymentStatus === "Paid"
                    ? "text-green-600 font-medium"
                    : "text-red-600 font-medium"
                }
              >
                {ad.paymentStatus}
              </span>
            </p>
            <p className="text-xs text-gray-500">
              {ad.startDate} → {ad.endDate}
            </p>
          </div>

          {/* User Info */}
          <div className="bg-gray-50 border rounded-lg p-3 mt-3 text-sm">
            <p>
              <strong>User:</strong> {ad.user?.name} ({ad.user?.username})
            </p>
            <p>
              <strong>Email:</strong> {ad.user?.email}
            </p>
            <p>
              <strong>Mobile:</strong> {ad.user?.mobile}
            </p>
          </div>

          {/* Actions */}
          {!readOnly && (
            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => pauseAd(ad._id)}
              >
                {ad.status === "paused" ? "Resume" : "Pause"}
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => deleteAd(ad._id)}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
