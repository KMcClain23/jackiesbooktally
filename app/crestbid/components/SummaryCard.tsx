import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string;
  subtext?: string;
  progressBarPercentage?: number;
  fullWidthProgressBar?: boolean;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  subtext,
  progressBarPercentage,
  fullWidthProgressBar,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-3xl font-semibold text-gray-800 mt-1">{value}</p>
      {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}

      {progressBarPercentage !== undefined && !fullWidthProgressBar && (
        <div className="mt-4">
          <div className="bg-gray-200 rounded-full h-2 w-2/3">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${progressBarPercentage}%` }}
            ></div>
          </div>
        </div>
      )}

      {fullWidthProgressBar && progressBarPercentage !== undefined &&(
        <div className="mt-4">
          <div className="bg-gray-200 rounded-full h-2 w-full">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${progressBarPercentage}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
