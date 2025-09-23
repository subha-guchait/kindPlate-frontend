import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CreditCard } from "lucide-react";

export default function AdsCard({ ad, pauseAd, deleteAd, resumeAd, readOnly }) {
  // nice date formatting
  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "N/A";

  // format minutes into "Xd Yh Zm"
  const formatMinutesToDhms = (minutesInput) => {
    const minutes = Number(minutesInput) || 0;
    if (minutes <= 0) return "0m";

    const days = Math.floor(minutes / 1440); // 24*60
    const hours = Math.floor((minutes % 1440) / 60);
    const mins = minutes % 60;

    const parts = [];
    if (days) parts.push(`${days}d`);
    if (hours) parts.push(`${hours}h`);
    if (mins) parts.push(`${mins}m`);

    return parts.join(" ");
  };

  // compute runtime in minutes (prefer runtimeMinutes from backend)
  const getRuntimeMinutes = (ad) => {
    // prefer backend-supplied aggregated runtime
    if (ad.runtimeMinutes != null && !isNaN(ad.runtimeMinutes)) {
      return Math.max(0, Math.floor(Number(ad.runtimeMinutes)));
    }

    // fallback using totalRuntime + (now - lastResumedAt) if live
    let runtime = Math.max(0, Number(ad.totalRuntime || 0));

    if (ad.status === "live" && ad.lastResumedAt) {
      const last = new Date(ad.lastResumedAt);
      const add = Math.floor((Date.now() - last.getTime()) / (1000 * 60));
      if (!isNaN(add) && add > 0) runtime += add;
    } else if (!ad.totalRuntime && ad.startDate) {
      // new ad (no totalRuntime yet) — estimate from startDate
      const start = new Date(ad.startDate);
      const add = Math.floor((Date.now() - start.getTime()) / (1000 * 60));
      if (!isNaN(add) && add > 0) runtime = add;
    }

    return Math.max(0, Math.floor(runtime));
  };

  const runtimeMinutes = getRuntimeMinutes(ad);
  const runtimeLabel = formatMinutesToDhms(runtimeMinutes);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="rounded-2xl shadow-md border border-gray-200 bg-white overflow-hidden transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/3 w-full">
          <img
            src={ad.mediaUrl}
            alt={ad.title}
            className="h-48 md:h-full w-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Title + Status */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {ad.title}
              </h2>
              <Badge
                variant={
                  ad.status === "live"
                    ? "success"
                    : ad.status === "paused"
                    ? "secondary"
                    : "destructive"
                }
              >
                {String(ad.status).toUpperCase()}
              </Badge>
            </div>

            {/* Payment Info */}
            <div className="flex items-center text-sm text-gray-600 gap-2">
              <CreditCard className="h-4 w-4 text-gray-500" />
              <span>
                Payment:{" "}
                <span
                  className={
                    ad.paymentStatus === "Success" ||
                    ad.paymentStatus === "Paid"
                      ? "text-green-600 font-medium"
                      : ad.paymentStatus === "Pending"
                      ? "text-yellow-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {ad.paymentStatus}
                </span>
              </span>
            </div>

            {/* Dates Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Start: {formatDate(ad.startDate)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Run: {runtimeLabel}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  End: {ad.endDate ? formatDate(ad.endDate) : "Ongoing"}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          {!readOnly && (
            <div className="flex gap-3 mt-5">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() =>
                  ad.status === "paused" ? resumeAd(ad._id) : pauseAd(ad._id)
                }
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
