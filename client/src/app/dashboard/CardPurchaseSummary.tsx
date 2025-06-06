import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingDown, TrendingUp } from "lucide-react";
import numeral from "numeral";
import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CardPurchaseSummary = () => {
  const { data, isLoading } = useGetDashboardMetricsQuery();
  const purchaseSummary = data?.purchaseSummary || [];

  const lastDataPoint = purchaseSummary[purchaseSummary.length - 1] || null;

  return (
    <div className="bg-white flex flex-col justify-between shadow-md rounded-2xl row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <div>
            <h2 className="text-lg font-semibold px-7 pt-5 mb-2">
              Purchase Summary
            </h2>
            <hr className="text-gray-300" />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-4 mt-7 px-7">
              <p className="text-xs text-gray-400">Purchased</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold">
                  {lastDataPoint
                    ? numeral(lastDataPoint.totalPurchased).format("$0.00a")
                    : "0"}
                </p>
              </div>
              {lastDataPoint && (
                <p
                  className={`text-sm ${
                    lastDataPoint.changePercentage! >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  } flex ml-3`}
                >
                  {lastDataPoint.changePercentage! >= 0 ? (
                    <TrendingUp className="w-4 h-4 mr-2" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-2" />
                  )}
                  {Math.abs(lastDataPoint.changePercentage!)}%
                </p>
              )}
            </div>
            <ResponsiveContainer width={"100%"} height={200} className={`p-2`}>
              <AreaChart
                data={purchaseSummary}
                margin={{ top: 0, right: 0, left: -50, bottom: 45 }}
              >
                <XAxis dataKey={"date"} tick={false} axisLine={false} />
                <YAxis tickLine={false} tick={false} axisLine={false} />
                <Tooltip
                  formatter={(value: number) => [
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(value),
                  ]}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                  }}
                />
                <Area
                  type={"linear"}
                  dataKey={"totalPurchased"}
                  stroke="#8884d8"
                  fill="#8884d8"
                  dot={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default CardPurchaseSummary;
