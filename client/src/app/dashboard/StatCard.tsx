import { LucideIcon } from "lucide-react";
import React, { JSX } from "react";

type StatDetail = {
  title: string;
  amount: string;
  changePercentage: number;
  IconComponent: LucideIcon;
};

type Props = {
  title: string;
  primaryIcon: JSX.Element;
  details: StatDetail[];
  dateRange: string;
};

const StatCard = ({ title, primaryIcon, details, dateRange }: Props) => {
  const formatPercentage = (value: number) => {
    const signal = value >= 0 ? "+" : "";
    return `${signal}${value.toFixed()}%`;
  };

  const getChangeColor = (value: number) =>
    value >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="md:row-span-1 xl:row-span-2 bg-white shadow-md rounded-2xl col-span-1 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-2 px-5 pt-4">
          <h2 className="font-semibold text-lg text-gray-700">{title}</h2>
          <span className="text-xs text-gray-400">{dateRange}</span>
        </div>
        <hr className="text-gray-300" />
      </div>
      <div className="flex mb-6 items-center justify-around gap-4 px-5 flex-1">
        <div className="rounded-full p-5 bg-blue-50 border-sky-300 border-[1px]">
          {primaryIcon}
        </div>
        <div className="flex-1">
          {details.map((detail, index) => (
            <React.Fragment key={index}>
              <div className="grid grid-cols-3 w-full my-4">
                <span className="text-left text-gray-500">{detail.title}</span>
                <span className="text-center font-bold text-gray-800">
                  {detail.amount}
                </span>
                <div className="flex items-center justify-end">
                  <detail.IconComponent
                    className={`w-4 h-4 mr-1 ${getChangeColor(
                      detail.changePercentage
                    )}`}
                  />

                  <span
                    className={`font-medium ${getChangeColor(
                      detail.changePercentage
                    )}`}
                  >
                    {formatPercentage(detail.changePercentage)}
                  </span>
                </div>
              </div>
              {index < details.length - 1 && <hr className="text-gray-300" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
