// src/hooks/useAd.js
import { useState, useEffect } from "react";
import { getRandomAd } from "@/api/adApi";

export default function useFullScreenAd(user) {
  const [ad, setAd] = useState(null);
  const [visible, setVisible] = useState(false);

  const fetchAd = async () => {
    if (!user || (user?.role == "admin" && user.role == "superAdmin")) {
      return;
    }
    try {
      const res = await getRandomAd();
      console.log(res);
      setAd(res.ad);
      setVisible(true);
    } catch (err) {
      console.error("Failed to fetch ad", err);
    }
  };

  useEffect(() => {
    let timer;

    const scheduleNextAd = async () => {
      await fetchAd(); // fetch ad

      // schedule the next fetch at a random interval
      const interval = Math.floor(Math.random() * (10 - 5 + 1) + 5) * 60 * 1000;
      timer = setTimeout(scheduleNextAd, interval);
    };

    scheduleNextAd(); // start the cycle

    return () => clearTimeout(timer);
  }, [user]);

  const closeAd = () => setVisible(false);

  return { ad, visible, closeAd };
}
