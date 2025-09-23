import { Card, CardContent } from "@/components/ui/card";

function StatCard({ icon, label, value, loading }) {
  return (
    <Card className="shadow-md hover:shadow-lg transition rounded-2xl">
      <CardContent className="p-6 flex items-center gap-4">
        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          {loading ? (
            <div className="h-5 w-20 bg-gray-200 rounded shimmer"></div>
          ) : (
            <p className="text-xl font-bold text-gray-800">{value}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default StatCard;
