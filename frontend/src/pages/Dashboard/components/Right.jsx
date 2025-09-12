import React, { useRef, useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import { BsCameraFill } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import axios from 'axios';

const Right = () => {
    const galleryInputRef = useRef(null);
      const cameraInputRef = useRef(null);
      const filesRef = useRef([]);
      const [imagePreviews, setImagePreviews] = useState([]);
      const [ocrResults, setOcrResults] = useState([]);
      const [isLoading, setIsLoading] = useState(false);

      const performOcrRequest = async (formData) => {
    const backendUrl = "https://medalert-backend-ae9o.onrender.com/ocr";
    return axios.post(backendUrl, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 90000,
    });
  };

  const handleScan = async () => {
    if (filesRef.current.length === 0) {
      alert("Please upload an image first.");
      return;
    }
    setIsLoading(true);
    setOcrResults(null);

    const formData = new FormData();
    filesRef.current.forEach((file) => {
      formData.append("files[]", file);
    });

    try {
      const response = await performOcrRequest(formData);
      console.log("Ocr result: ", response)
      setOcrResults(response.data);
    } catch (error) {
      if (error.response && error.response.status === 503) {
        console.log(
          "Server is waking up (503 error). Retrying in 10 seconds..."
        );
        await new Promise((resolve) => setTimeout(resolve, 10000));
        try {
          const retryResponse = await performOcrRequest(formData);
          setOcrResults(retryResponse.data);
        } catch (retryError) {
          console.error("Error during retry OCR process:", retryError);
          setOcrResults({
            error: "The server is busy. Please try again in a minute.",
          });
        }
      } else {
        console.error("Error during OCR process:", error);
        setOcrResults({
          error: "Could not scan the image(s). Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
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
    <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-6 flex flex-col">
              <h3 className="font-semibold mb-4 text-gray-800">Quick Actions</h3>
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
                  <div className="w-full flex gap-4">
                    <button
                      className="px-4 py-2 flex flex-col justify-center items-center gap-2 bg-neutral-50 cursor-pointer md:w-full w-1/2 h-26 border-2 border-primary-light border-dashed rounded-md"
                      onClick={() => galleryInputRef.current.click()}
                    >
                      <HiOutlineUpload size={40} className="text-primary" />
                      <span className="text-sm text-neutral-600">
                        Choose photos
                      </span>
                    </button>
                    <button
                      className="md:hidden px-4 py-2 bg-primary rounded-md text-white w-1/2 flex flex-col justify-center items-center gap-2 cursor-pointer"
                      onClick={() => cameraInputRef.current.click()}
                    >
                      <BsCameraFill size={40} className="text-white" />
                      <span>Capture Image</span>
                    </button>
                  </div>
                </div>
                <button onClick={handleScan} disabled={isLoading} className="border border-gray-200 py-3 rounded-xl shadow hover:bg-primary hover:text-white cursor-pointer transition text-gray-700 font-medium">
                  {isLoading ? "Generating Report..." : "Generate Report"}
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between mt-6">
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
                      className="px-4 py-1 text-sm rounded-full border border-red-600 cursor-pointer font-medium text-red-600 hover:text-white hover:bg-red-600 transition duration-300"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  {imagePreviews.length > 0 &&
                    imagePreviews.map((src, index) => (
                      <div key={index} className="h-26 w-26 rounded-md relative">
                        <img src={src} alt={`Preview ${index + 1}`} className="object-cover h-full w-full rounded-md" />
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
  )
}

export default Right
