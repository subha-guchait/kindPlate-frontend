import { useEffect } from "react";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import toast from "react-hot-toast";

export default function NetworkNotifier() {
  const { isOnline, firstRender } = useNetworkStatus();

  useEffect(() => {
    if (firstRender) return; // skip notifications on first load

    if (!isOnline) {
      toast.error("You are offline. Some features may not work.", {
        duration: 4000,
        position: "top-right",
        icon: "🚫",
      });
    } else {
      toast.success("Back online!", {
        duration: 3000,
        position: "top-right",
        icon: "🟢",
      });
    }
  }, [isOnline, firstRender]);

  return null;
}
