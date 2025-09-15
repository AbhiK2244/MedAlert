import React from "react";
import { useGetMyReportsQuery } from "../../services/analysisReport";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Reports = () => {
  const {
    data: reports,
    isFetching: isReportFetching,
    isError,
  } = useGetMyReportsQuery();

  const shortenText = (text) => {
    const words = text.trim().split(/\s+/);

    if (words.length > 25) {
      return words.slice(0, 25).join(" ") + "...";
    }

    return text;
  };

  console.log("Reports", reports);
  return reports?.data?.length > 0 ? (
    <div className="min-h-screen gap-6 grid grid-cols-1 md:grid-cols-3 p-6">
      {reports?.data?.map((report) => (
        <Link
          to={`/report/${report._id}`}
          key={report._id}
          className="flex flex-col gap-3 p-4 border border-neutral-300 shadow-xl rounded-xl hover:scale-105 transition-all duration-300"
        >
          <h3 className="text-xl font-medium">
            {report.ocrResult.productName}
          </h3>
          <p className="text-sm text-neutral-600">
            {shortenText(report.summary)}
          </p>
          <button className="text-left flex items-center gap-2 text-xs mt-auto">
            <span>View more</span>
            <FaArrowRight className="text-primary mt-0.5" />
          </button>
        </Link>
      ))}
    </div>
  ) : isReportFetching ? (
    <div className="h-screen grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <div className="h-[200px] md:w-[300px] bg-neutral-200 rounded-xl animate-pulse"></div>
      <div className="h-[200px] md:w-[300px] bg-neutral-200 rounded-xl animate-pulse"></div>
      <div className="h-[200px] md:w-[300px] bg-neutral-200 rounded-xl animate-pulse"></div>
    </div>
  ) : (
    <div className="h-screen flex justify-center items-center font-medium">
      No reports to show.
    </div>
  );
};

export default Reports;
