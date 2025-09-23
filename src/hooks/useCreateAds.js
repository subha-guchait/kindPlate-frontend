// src/hooks/useCreateAds.js
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { getPrice } from "@/api/priceApi";
import { uploadAdMedia } from "@/api/mediaApi";
import { createAd } from "@/api/adApi";
import { load } from "@cashfreepayments/cashfree-js";

const useCreateAds = () => {
  const [form, setForm] = useState({
    content: "",
    image: null, // File
    websiteUrl: "",
    duration: "", // string input, convert to number when sending
  });

  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef(null);

  // Helper: reset/prepare AbortController so uploads/requests can be cancelled
  const nextAbortController = () => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();
    return abortRef.current;
  };

  // Auto-calc price on valid duration
  useEffect(() => {
    const val = Number(form.duration);
    if (!val || val <= 0) {
      setPrice(null);
      return;
    }

    let canceled = false;
    (async () => {
      try {
        const res = await getPrice("ads", val);
        if (!canceled) setPrice(res?.price?.price ?? null);
      } catch (e) {
        if (!canceled) {
          setPrice(null);
          toast.error("Failed to calculate price");
          // Non-blocking: the server will still calculate order amount when creating the ad
        }
      }
    })();

    return () => {
      canceled = true;
    };
  }, [form.duration]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Core flow: validate → get presigned → upload → create ad → redirect
  const submitAndPay = async () => {
    const err = validateAdsData(form);
    if (err) {
      toast.error(err);
      return;
    }

    try {
      setLoading(true);
      const controller = nextAbortController();

      // 1) Upload to S3 using your provided helper
      const mediaUrl = await uploadAdMedia(form.image, {
        signal: controller.signal,
      });

      // 2) Create the ad post on your backend (backend returns orderId)
      const payload = {
        content: form.content?.trim() || "",
        mediaUrl, // S3 url (cleaned by your helper)
        webUrl: form.websiteUrl?.trim() || "",
        duration: Number(form.duration),
      };

      // Adjust endpoint to your backend route
      const res = await createAd(payload);

      const { paymentSessionId, orderId } = res || {};
      if (!paymentSessionId || !orderId) {
        throw new Error(
          "Payment session or orderId missing from server response"
        );
      }

      // 3) Start Cashfree checkout
      const cashfree = await load({ mode: "sandbox" }); // use "production" later
      const checkoutOptions = {
        paymentSessionId,
        redirectTarget: "_modal", // shows modal on current page
      };

      await cashfree.checkout(checkoutOptions);
      window.location.href = `/payments/receipt/${orderId}`;
    } catch (e) {
      if (axios.isCancel?.(e)) return;
      console.error(e);
      toast.error(e?.message || "Failed to create ad");
    } finally {
      setLoading(false);
    }
  };

  // Allow consumers to reset the form after success/abort if needed
  const resetForm = () => {
    setForm({
      content: "",
      image: null,
      websiteUrl: "",
      duration: "",
    });
    setPrice(null);
  };

  // Cleanup in case the component unmounts mid-flight
  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  return {
    form,
    setForm,
    handleChange,
    price,
    loading,
    submitAndPay,
    resetForm,
  };
};

export default useCreateAds;

// Content optional; image required; websiteUrl optional (if present must be valid); duration > 0
export function validateAdsData({ content, image, websiteUrl, duration }) {
  if (!image) return "Please select an image for the ad.";

  if (websiteUrl && !/^https?:\/\/.+\..+/.test(websiteUrl.trim())) {
    return "Invalid website URL.";
  }

  if (!duration || isNaN(duration) || Number(duration) <= 0) {
    return "Duration must be a positive number.";
  }

  return null;
}
