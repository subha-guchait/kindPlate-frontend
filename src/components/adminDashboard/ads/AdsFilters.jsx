// src/components/ads/AdsFilters.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AdsFilters({ filters, setFilters }) {
  const [user, setUser] = useState(filters.user);
  const [startDate, setStartDate] = useState(filters.startDate);
  const [endDate, setEndDate] = useState(filters.endDate);

  const applyFilters = () => {
    setFilters({ user, startDate, endDate });
  };

  const resetFilters = () => {
    setUser("");
    setStartDate("");
    setEndDate("");
    setFilters({ user: "", startDate: "", endDate: "" });
  };

  return (
    <div className="bg-white shadow rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-4 sm:items-end">
      <input
        type="text"
        placeholder="Filter by user"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="border rounded px-3 py-2 text-sm w-full sm:w-40"
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border rounded px-3 py-2 text-sm w-full sm:w-40"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border rounded px-3 py-2 text-sm w-full sm:w-40"
      />
      <Button onClick={applyFilters}>Apply</Button>
      <Button variant="outline" onClick={resetFilters}>
        Reset
      </Button>
    </div>
  );
}
