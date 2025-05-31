import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CardSalesSummary = () => {
  const { data, isLoading, isError } = useGetDashboardMetricsQuery();
  const salesSummary = data?.salesSummary || [];

  const [timeFrame, setTimeFrame] = useState("weekly");

  const totalValueSum =
    salesSummary.reduce((acc, curr) => acc + Number(curr.totalValue), 0) || 0;

  const averageChangePercentage =
    salesSummary.reduce(
      (acc, curr, _, array) => acc + curr.changePercentage! / array.length,
      0
    ) || 0;

  const highestValueData = salesSummary.reduce((acc, curr) => {
    return acc.totalValue > curr.totalValue ? acc : curr;
  }, salesSummary[0] || {});

  const highestValueDate = highestValueData.date
    ? new Date(highestValueData.date).toLocaleDateString("en", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  if (isError) {
    return <div className="m-5">Failed to fetch data</div>;
  }

  //   useEffect(() => {
  //     console.info("isLoading:", isLoading);
  //     console.info("data:", data);
  //     console.info("salesSummary:", salesSummary);
  //     console.info("totalValueSum:", totalValueSum);
  //     console.info("averageChangePercentage:", averageChangePercentage);
  //   }, [data]);

  return (
    <div className="bg-white rounded-2xl shadow-md flex flex-col justify-between row-span-3 xl:row-span-6">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Sales Summary
            </h2>
            <hr className="text-gray-300" />
          </div>
          <div>
            <div className="flex items-center justify-between my-6 px-7">
              <div className="text-lg font-medium">
                <p className="text-xs text-gray-400">Value</p>
                <div>
                  <span className="text-2xl font-extrabold">
                    $
                    {(totalValueSum / 1000000).toLocaleString("en", {
                      maximumFractionDigits: 2,
                    })}
                    m
                  </span>
                  <span className="text-green-500 text-sm ml-2">
                    <TrendingUp className="inline w-4 h-4 mr-1" />
                    {averageChangePercentage.toFixed(2)}%
                  </span>
                </div>
              </div>
              <select
                className="shadow-sm bortder border-gray-300 bg-white p-2 rounded"
                value={timeFrame}
                onChange={(e) => {
                  setTimeFrame(e.target.value);
                }}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <ResponsiveContainer width={"100%"} height={350} className={`px-7`}>
              <BarChart
                data={salesSummary}
                margin={{ top: 0, right: 0, left: -21, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.toLocaleDateString("en", {
                      month: "short",
                      day: "numeric",
                    })}`;
                  }}
                />
                <YAxis
                  tick={{ fontSize: 12, dx: -1 }}
                  tickFormatter={(value) => {
                    return `$${(value / 1000000).toFixed(0)}m`;
                  }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return [
                      date.toLocaleDateString("en", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }),
                    ];
                  }}
                  formatter={(value: number) => [
                    `${new Intl.NumberFormat("en", {
                      style: "currency",
                      currency: "USD",
                    }).format(value)}`,
                  ]}
                />
                <Bar
                  dataKey={"totalValue"}
                  fill="#3182ce"
                  barSize={10}
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <hr className="text-gray-300" />
            <div className="flex justify-between items-center mt-6 text-sm px-7 mb-4">
              <p>{salesSummary.length || 0} days</p>
              <p className="text-sm">
                Highest Sales Date:{" "}
                <span className="font-bold">{highestValueDate}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardSalesSummary;
