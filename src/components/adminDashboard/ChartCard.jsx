import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

function ChartCard({
  title,
  data,
  dataKey,
  barColor,
  lineColor,
  period,
  setPeriod,
  year,
  setYear,
  month,
  setMonth,
}) {
  const years = ["2021", "2022", "2023", "2024", "2025"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
          <div className="flex gap-2 items-center">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>

            {period === "daily" && (
              <>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </>
            )}

            {period === "monthly" && (
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          {period === "weekly" || period === "daily" ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey={dataKey} fill={barColor} radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={lineColor}
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default ChartCard;
