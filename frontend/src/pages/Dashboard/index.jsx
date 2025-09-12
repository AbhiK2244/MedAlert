import React from "react";
import Left from "./components/Left";
import Right from "./components/Right";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex gap-4">
      <div className="w-[30vw] hidden md:block">
        <Left />
      </div>
      <div className="md:flex-1 w-full">
        <Right />
      </div>
    </div>
  );
};

export default Dashboard;


























// import React, { useRef, useState } from "react";
// import { HiOutlineUpload } from "react-icons/hi";
// import { BsCameraFill } from "react-icons/bs";
// import { IoIosClose } from "react-icons/io";
// import axios from 'axios';

// // ProgressBar reusable component
// function ProgressBar({ value, total }) {
//   const percent = Math.min(100, Math.round((value / total) * 100));
//   return (
//     <div className="flex-1 mx-4">
//       <div className="h-2 bg-gray-200 rounded-full w-full">
//         <div
//           className="h-2 rounded-full bg-blue-400 transition-all duration-300"
//           style={{ width: `${percent}%` }}
//         />
//       </div>
//     </div>
//   );
// }

// export default function Dashboard() {
//   // Photo scan state
//   const galleryInputRef = useRef(null);
//   const cameraInputRef = useRef(null);
//   const filesRef = useRef([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [ocrResults, setOcrResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // Daily goals state
//   const [water, setWater] = useState(0);
//   const [meals, setMeals] = useState(0);
//   const [sleep, setSleep] = useState(0);

//   // Goals data config
//   const goals = [
//     {
//       name: "Drink Water",
//       emoji: "💧",
//       state: water,
//       setState: setWater,
//       total: 8,
//     },
//     {
//       name: "Balanced Meals",
//       emoji: "🥗",
//       state: meals,
//       setState: setMeals,
//       total: 3,
//     },
//     {
//       name: "Sleep Hours",
//       emoji: "😴",
//       state: sleep,
//       setState: setSleep,
//       total: 8,
//     },
//   ];

//   const performOcrRequest = async (formData) => {
//     const backendUrl = "https://medalert-backend-ae9o.onrender.com/ocr";
//     return axios.post(backendUrl, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//       timeout: 90000,
//     });
//   };

//   const handleScan = async () => {
//     if (filesRef.current.length === 0) {
//       alert("Please upload an image first.");
//       return;
//     }
//     setIsLoading(true);
//     setOcrResults(null);

//     const formData = new FormData();
//     filesRef.current.forEach((file) => {
//       formData.append("files[]", file);
//     });

//     try {
//       const response = await performOcrRequest(formData);
//       console.log("Ocr result: ", response)
//       setOcrResults(response.data);
//     } catch (error) {
//       if (error.response && error.response.status === 503) {
//         console.log(
//           "Server is waking up (503 error). Retrying in 10 seconds..."
//         );
//         await new Promise((resolve) => setTimeout(resolve, 10000));
//         try {
//           const retryResponse = await performOcrRequest(formData);
//           setOcrResults(retryResponse.data);
//         } catch (retryError) {
//           console.error("Error during retry OCR process:", retryError);
//           setOcrResults({
//             error: "The server is busy. Please try again in a minute.",
//           });
//         }
//       } else {
//         console.error("Error during OCR process:", error);
//         setOcrResults({
//           error: "Could not scan the image(s). Please try again.",
//         });
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFileChange = (event) => {
//     const newFiles = Array.from(event.target.files);
//     if (newFiles.length) {
//       filesRef.current = [...filesRef.current, ...newFiles];
//       const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
//       setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
//     }
//   };
//   const handleRemoveImage = (indexToRemove) => {
//     filesRef.current = filesRef.current.filter(
//       (_, index) => index !== indexToRemove
//     );
//     setImagePreviews((prevPreviews) =>
//       prevPreviews.filter((_, index) => index !== indexToRemove)
//     );
//   };
//   const clearImages = () => {
//     setImagePreviews([]);
//     setOcrResults(null);
//     filesRef.current = [];
//     if (galleryInputRef.current) galleryInputRef.current.value = "";
//     if (cameraInputRef.current) cameraInputRef.current.value = "";
//   };

//   return (
//     <div className="min-h-screen bg-[#F6F8FB] p-8">
//       <div className="grid md:grid-cols-3 gap-6">
//         {/* Profile Card */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between">
//           <div className="flex items-center gap-4">
//             <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-2xl font-bold text-[#8451C1] shadow">
//               SJ
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800">
//                 Sarah Johnson
//               </h2>
//               <p className="text-sm text-gray-500">Age 32</p>
//             </div>
//           </div>
//           <div className="mt-6 p-3 rounded-lg bg-yellow-50">
//             <p className="text-yellow-600 font-semibold text-sm">
//               Health Status
//             </p>
//             <p className="text-gray-700 text-sm">Good health, keep it up</p>
//           </div>
//           <div className="mt-4">
//             <p className="text-sm text-gray-500">Medical Conditions</p>
//             <div className="flex gap-2 mt-2">
//               <span className="bg-gray-100 px-3 py-1 rounded-lg text-xs text-gray-500">
//                 Type 2 Diabetes
//               </span>
//               <span className="bg-gray-100 px-3 py-1 rounded-lg text-xs text-gray-500">
//                 Hypertension
//               </span>
//             </div>
//           </div>
//           <div className="mt-4">
//             <p className="text-sm text-gray-600">Current Streak</p>
//             <p className="text-green-600 font-bold text-2xl mt-1">12 days</p>
//           </div>
//         </div>
//         {/* Quick Actions */}
//         <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-6 flex flex-col">
//           <h3 className="font-semibold mb-4 text-gray-800">Quick Actions</h3>
//           <div className="grid gap-3">
//             <div>
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={handleFileChange}
//                 ref={galleryInputRef}
//                 style={{ display: "none" }}
//               />
//               <input
//                 type="file"
//                 capture="environment"
//                 onChange={handleFileChange}
//                 ref={cameraInputRef}
//                 style={{ display: "none" }}
//               />
//               <div className="w-full flex gap-4">
//                 <button
//                   className="px-4 py-2 flex flex-col justify-center items-center gap-2 bg-neutral-50 cursor-pointer md:w-full w-1/2 h-26 border-2 border-primary-light border-dashed rounded-md"
//                   onClick={() => galleryInputRef.current.click()}
//                 >
//                   <HiOutlineUpload size={40} className="text-primary" />
//                   <span className="text-sm text-neutral-600">
//                     Choose photos
//                   </span>
//                 </button>
//                 <button
//                   className="md:hidden px-4 py-2 bg-primary rounded-md text-white w-1/2 flex flex-col justify-center items-center gap-2 cursor-pointer"
//                   onClick={() => cameraInputRef.current.click()}
//                 >
//                   <BsCameraFill size={40} className="text-white" />
//                   <span>Capture Image</span>
//                 </button>
//               </div>
//             </div>
//             <button onClick={handleScan} disabled={isLoading} className="border border-gray-200 py-3 rounded-xl shadow hover:bg-primary hover:text-white cursor-pointer transition text-gray-700 font-medium">
//               {isLoading ? "Generating Report..." : "Generate Report"}
//             </button>
//           </div>
//           <div className="flex flex-col gap-4">
//             <div className="flex justify-between mt-6">
//               <div className="mt-3 h-6 flex items-center text-sm">
//                 {imagePreviews.length > 0 ? (
//                   <span className="text-red-500">
//                     {imagePreviews.length}{" "}
//                     {imagePreviews?.length > 1 ? "photos" : "photo"} selected.
//                   </span>
//                 ) : (
//                   <span className="text-gray-400">No photo selected.</span>
//                 )}
//               </div>
//               {imagePreviews.length > 0 && (
//                 <button
//                   onClick={clearImages}
//                   className="px-4 py-1 text-sm rounded-full border border-red-600 cursor-pointer font-medium text-red-600 hover:text-white hover:bg-red-600 transition duration-300"
//                 >
//                   Clear
//                 </button>
//               )}
//             </div>
//             <div className="flex items-center gap-4 flex-wrap">
//               {imagePreviews.length > 0 &&
//                 imagePreviews.map((src, index) => (
//                   <div key={index} className="h-26 w-26 rounded-md relative">
//                     <img src={src} alt={`Preview ${index + 1}`} className="object-cover h-full w-full rounded-md" />
//                     <button
//                       className="absolute -top-2 -right-1 cursor-pointer text-white bg-red-500 rounded-full w-3 h-3 flex justify-center items-center"
//                       onClick={() => handleRemoveImage(index)}
//                     >
//                       <IoIosClose />
//                     </button>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Daily Wellness Goals Section */}
//       <div className="grid md:grid-cols-3 gap-6 mt-8">
//         <div className="bg-white rounded-2xl shadow-xl p-6">
//           <h3 className="font-semibold mb-4 text-gray-800">
//             Daily Wellness Goals
//           </h3>
//           <div className="space-y-6">
//             {goals.map((goal) => (
//               <div key={goal.name} className="flex items-center">
//                 <span className="text-lg">{goal.emoji}</span>
//                 <span className="ml-2 w-32">{goal.name}</span>
//                 <button
//                   className="w-7 h-7 rounded-full bg-gray-100 text-blue-500 text-xl flex items-center justify-center hover:bg-blue-50"
//                   disabled={goal.state <= 0}
//                   onClick={() => goal.setState(Math.max(0, goal.state - 1))}
//                 >
//                   −
//                 </button>
//                 <ProgressBar value={goal.state} total={goal.total} />
//                 <button
//                   className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 text-xl flex items-center justify-center hover:bg-blue-200"
//                   disabled={goal.state >= goal.total}
//                   onClick={() =>
//                     goal.setState(Math.min(goal.total, goal.state + 1))
//                   }
//                 >
//                   +
//                 </button>
//                 <span className="w-10 ml-2 text-sm text-gray-500 text-center">
//                   {goal.state}/{goal.total}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* Add similar cards for "Daily Activity Check-in" and "Achievements" for a complete dashboard */}
//       </div>
//     </div>
//   );
// }
