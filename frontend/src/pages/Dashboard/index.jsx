import React, { useRef, useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import { BsCameraFill } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { toast } from "react-hot-toast";
// import axios from "axios";
import { useAnalysisReportMutation } from "../../services/analysisReport";
import { useNavigate } from "react-router-dom";
import { PiPlusBold } from "react-icons/pi";
import { usePerformOCRMutation } from "../../services/performOCR";

const Dashboard = () => {
  const galleryInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const filesRef = useRef([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [ocrResults, setOcrResults] = useState([]);
  const [userNotes, setUserNotes] = useState("");
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const navigate = useNavigate();

  const [analysisReport, { isLoading: isReportLoading }] =
    useAnalysisReportMutation();
  
  const [performOCR, {isLoading}] = usePerformOCRMutation();

  const handleScan = async () => {
    if (filesRef.current.length === 0) {
      toast.error("Please upload an image first.");
      return;
    }
    // setIsLoading(true);
    setOcrResults(null);

    const formData = new FormData();
    filesRef.current.forEach((file) => {
      formData.append("files[]", file);
    });

    try {
      const response = await performOCR(formData);
      console.log("Result from ocr: ", response);
      if (response?.error) {
        toast.error(response?.error.data.message || "Something went wrong!");
      } else {
        console.log("Text extracted successfully.");
        return response?.data?.data;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleGenerateReport = async () => {
    try {
      const result = await handleScan();
      const reportData = {
        userNotes,
        ocrResult: result,
      };
      console.log("report data", reportData);
      const response = await analysisReport(reportData);
      if (response?.error) {
        toast.error(response?.error.data.message || "Something went wrong!");
      } else {
        console.log("Report generated successfully:", response);
        toast.success("Report generated successfully.");
        const id = response?.data?.data?._id;
        navigate(`/report/${id}`);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    }
  };

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    if (newFiles.length) {
      filesRef.current = [...filesRef.current, ...newFiles];
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };
  const handleRemoveImage = (indexToRemove) => {
    filesRef.current = filesRef.current.filter(
      (_, index) => index !== indexToRemove
    );
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, index) => index !== indexToRemove)
    );
  };
  const clearImages = () => {
    setImagePreviews([]);
    setOcrResults(null);
    filesRef.current = [];
    if (galleryInputRef.current) galleryInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };
  return (
    <div className="p-6 flex flex-col">
      <h3 className="font-semibold mb-4 text-gray-800 ml-4 text-xl">
        Quick Actions
      </h3>
      <div className="grid gap-3">
        <div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            ref={galleryInputRef}
            style={{ display: "none" }}
          />
          <input
            type="file"
            capture="environment"
            onChange={handleFileChange}
            ref={cameraInputRef}
            style={{ display: "none" }}
          />
          <div className="w-full flex flex-col md:flex-row gap-2 justify-between">
            <div
              className={`flex gap-10 ${
                imagePreviews?.length > 0 ? "min-w-32" : "md:w-full"
              }`}
            >
              <button
                className={`md:px-4 md:py-2 px-2 py-2 flex flex-col justify-center items-center gap-2 bg-neutral-50 hover:bg-neutral-100 cursor-pointer w-1/2 ${
                  imagePreviews?.length > 0 ? "md:w-fit" : "md:w-full"
                } md:h-26 border-2 border-primary-light border-double rounded-md duration-300`}
                onClick={() => galleryInputRef.current.click()}
              >
                {imagePreviews?.length > 0 ? (
                  <PiPlusBold
                    className={`text-primary text-3xl ${
                      imagePreviews?.length > 0 ? "md:text-2xl" : "md:text-5xl"
                    }`}
                  />
                ) : (
                  <HiOutlineUpload
                    className={`text-primary text-3xl ${
                      imagePreviews?.length > 0 ? "md:text-2xl" : "md:text-5xl"
                    }`}
                  />
                )}
                <span className="text-sm text-neutral-600">
                  {imagePreviews?.length > 0 ? "Add more" : "Choose photos"}
                </span>
              </button>
              <button
                className="md:hidden px-2 py-2 bg-primary rounded-md text-white w-1/2 md:w-fit md:h-26 flex flex-col justify-center items-center gap-2 cursor-pointer"
                onClick={() => cameraInputRef.current.click()}
              >
                <BsCameraFill className="text-white text-3xl md:text-5xl" />
                <span>Capture Image</span>
              </button>
            </div>

            {/* for laptop and tab view */}
            <div className="hidden md:flex items-center gap-4 flex-wrap md:mt-0">
              {imagePreviews.length > 0 &&
                imagePreviews.map((src, index) => (
                  <div key={index} className="h-26 w-26 rounded-md relative">
                    <img
                      src={src}
                      alt={`Preview ${index + 1}`}
                      className="object-cover h-full w-full rounded-md"
                    />
                    <button
                      className="absolute -top-2 -right-1 cursor-pointer text-white bg-red-500 rounded-full w-3 h-3 flex justify-center items-center"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <IoIosClose />
                    </button>
                  </div>
                ))}
            </div>

            {/* for mobile view only  */}
            <div className="flex flex-col gap-4 md:hidden">
              <div className="flex justify-between mt-2">
                <div className="mt-3 h-6 flex items-center text-sm">
                  {imagePreviews.length > 0 ? (
                    <span className="text-red-500">
                      {imagePreviews.length}{" "}
                      {imagePreviews?.length > 1 ? "photos" : "photo"} selected.
                    </span>
                  ) : (
                    <span className="text-gray-400">No photo selected.</span>
                  )}
                </div>
                {imagePreviews.length > 0 && (
                  <button
                    onClick={clearImages}
                    className="text-sm rounded-full cursor-pointer font-medium text-red-600 hover:text-white hover:bg-red-600 transition duration-300"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex items-center gap-4 flex-wrap md:mt-0">
                {imagePreviews.length > 0 &&
                  imagePreviews.map((src, index) => (
                    <div key={index} className="h-26 w-26 rounded-md relative">
                      <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="object-cover h-full w-full rounded-md"
                      />
                      <button
                        className="absolute -top-2 -right-1 cursor-pointer text-white bg-red-500 rounded-full w-3 h-3 flex justify-center items-center"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <IoIosClose />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full px-4 mt-1">
            <button
              className="text-sm font-medium cursor-pointer transition duration-300"
              onClick={() => setIsNoteOpen(!isNoteOpen)}
            >
              {isNoteOpen ? (
                <span className="text-red-600 hover:text-red-500">
                  Hide notes
                </span>
              ) : (
                <span className="text-primary-hover hover:text-primary">
                  Add notes
                </span>
              )}
            </button>
          </div>
          {isNoteOpen && (
            <div className="mt-2">
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-primary transition duration-300"
                rows="3"
                placeholder="Add your note here..."
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
              />
            </div>
          )}
        </div>
        <button
          onClick={handleGenerateReport}
          disabled={isLoading || isReportLoading || imagePreviews?.length === 0}
          className="border border-gray-200 py-3 rounded-xl shadow hover:bg-primary hover:text-white cursor-pointer transition text-gray-700 font-medium disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-black"
        >
          {isLoading || isReportLoading
            ? "Generating Report..."
            : "Generate Report"}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
