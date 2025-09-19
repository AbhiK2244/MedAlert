import React, { useEffect } from "react";
import {
  useDeleteAllReportsMutation,
  useDeleteReportByIdMutation,
  useGetMyReportsQuery,
} from "../../services/analysisReport";
import { FaArrowRight, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import toast from "react-hot-toast";

const Reports = () => {
  const {
    data: reports,
    isFetching: isReportFetching,
    isError,
    refetch,
  } = useGetMyReportsQuery();

  const [deleteReportById, { isLoading: isDeleteByIdLoading }] =
    useDeleteReportByIdMutation();
  const [deleteAllReports, { isLoading: isDeleteAllReportsLoading }] =
    useDeleteAllReportsMutation();

  useEffect(() => {
    refetch();
  }, [isDeleteByIdLoading, reports, isDeleteAllReportsLoading]);

  const shortenText = (text) => {
    const words = text.trim().split(/\s+/);

    if (words.length > 25) {
      return words.slice(0, 25).join(" ") + "...";
    }

    return text;
  };

  const handleDeleteById = async (event, reportId) => {
    event.stopPropagation();
    if (!reportId) {
      toast.error("Invalid request. Please try again!");
    }
    try {
      let result = await deleteReportById(reportId);
      if (result?.error) {
        toast.error(
          result?.error.data.message ||
            "Delete request failed. Please try again."
        );
      } else {
        toast.success("Report deleted successfully");
      }
    } catch (error) {
      console.log("Error deleting the report: ", error);
    }
  };

  const handleAllReportDelete = async() => {
    try {
      let result = await deleteAllReports();
      if (result?.error) {
        toast.error(
          result?.error.data.message ||
            "Delete request failed. Please try again."
        );
      } else {
        toast.success(result?.data?.message || "Reports deleted successfully");
      }
    } catch (error) {
      console.log("Error deleting the report: ", error);
    }
  }

  return reports?.data?.length > 0 ? (
    <div className="md:p-6 px-4 py-6">
      <div className="flex items-center justify-between">
        <h2 className="md:ml-3 ml-9 font-medium text-xl lg:text-3xl">Reports</h2>
        <button onClick={handleAllReportDelete} type="button" className="px-4 py-1 text-red-500 border border-red-500 rounded-full cursor-pointer hover:bg-red-500 hover:text-white text-xs flex justify-center items-center">
          {isDeleteAllReportsLoading ? <div className="flex items-center gap-0.5">
            <FaSpinner className="animate-spin" /> <span>Deleting</span></div>:
          "Delete all"}
          </button>
      </div>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-3 p-6">
        {reports?.data?.map((report) => (
          <div key={report._id} className="relative">
            <Link
              to={`/report/${report._id}`}
              className="flex flex-col gap-3 p-4 border border-neutral-300 shadow-xl rounded-xl hover:scale-105 transition-all duration-300 h-58"
            >
              <h3 className="text-xl font-medium line-clamp-1">
                {report?.ocrResult?.productName ||
                  report?.ocrResult?.description ||
                  "Report"}
              </h3>
              <p className="text-sm text-neutral-600 text-justify">
                {shortenText(report?.summary)}
              </p>

              <div className="flex items-center justify-between">
                <button className="text-left flex items-center gap-2 text-xs mt-auto">
                  <span>View more</span>
                  <FaArrowRight className="text-primary mt-0.5" />
                </button>
              </div>
            </Link>
            <div
              className="absolute right-2 bottom-2 flex justify-center items-center p-1 text-3xl"
              onClick={(e) => e.preventDefault()} // stops <Link> navigation
            >
              {isDeleteByIdLoading ? (
                <FaSpinner className="animate-spin text-2xl" />
              ) : (
                <MdOutlineDelete
                  onClick={(event) => handleDeleteById(event, report._id)}
                  title="delete"
                  className="text-red-500 hover:bg-blue-50 rounded-full transition duration-300 cursor-pointer"
                />
              )}
            </div>
          </div>
        ))}
      </div>
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
