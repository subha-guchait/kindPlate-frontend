import PointHistoryList from "@/components/pointHistory/PoinHistoryList";
import usePointHistory from "@/hooks/usePointHistory";

const PointHistoryPage = () => {
  const pointHistoryState = usePointHistory();

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      {/* Total Points */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold">🌟 Your Points</h2>
        <p className="text-4xl font-extrabold mt-2">
          {pointHistoryState.totalPoint}
        </p>
      </div>

      {/* History List */}
      <PointHistoryList {...pointHistoryState} />
    </div>
  );
};

export default PointHistoryPage;
