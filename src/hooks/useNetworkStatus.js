import { useEffect, useState, useRef } from "react";

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const firstRender = useRef(true); // track first mount

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // mark first render done after effect runs
    firstRender.current = false;

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return { isOnline, firstRender: firstRender.current };
}
