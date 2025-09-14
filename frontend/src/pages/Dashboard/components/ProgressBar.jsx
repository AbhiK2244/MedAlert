import React from "react";

const ProgressBar = ({ value, total }) => {
  const percent = Math.min(100, Math.round((value / total) * 100));
  return (
    <div className="flex-1 mx-2">
      <div className="h-2 bg-gray-200 rounded-full w-full">
        <div
          className="h-2 rounded-full bg-blue-400 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
