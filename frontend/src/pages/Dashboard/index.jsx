import React, { useRef, useState } from "react";

// ProgressBar reusable component
function ProgressBar({ value, total }) {
  const percent = Math.min(100, Math.round((value / total) * 100));
  return (
    <div className="flex-1 mx-4">
      <div className="h-2 bg-gray-200 rounded-full w-full">
        <div
          className="h-2 rounded-full bg-blue-400 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default function Dashboard() {
  // Photo scan state
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const fileInputRef = useRef(null);

  // Daily goals state
  const [water, setWater] = useState(0);
  const [meals, setMeals] = useState(0);
  const [sleep, setSleep] = useState(0);

  // Handler for file selection
  const handlePhotoChange = (e) => setSelectedPhotos([...e.target.files]);
  const triggerFileInput = () => fileInputRef.current.click();

  // Goals data config
  const goals = [
    {
      name: "Drink Water",
      emoji: "💧",
      state: water,
      setState: setWater,
      total: 8,
    },
    {
      name: "Balanced Meals",
      emoji: "🥗",
      state: meals,
      setState: setMeals,
      total: 3,
    },
    {
      name: "Sleep Hours",
      emoji: "😴",
      state: sleep,
      setState: setSleep,
      total: 8,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FB] p-8">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-2xl font-bold text-[#8451C1] shadow">
              SJ
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Sarah Johnson</h2>
              <p className="text-sm text-gray-500">Age 32</p>
            </div>
          </div>
          <div className="mt-6 p-3 rounded-lg bg-yellow-50">
            <p className="text-yellow-600 font-semibold text-sm">Health Status</p>
            <p className="text-gray-700 text-sm">Good health, keep it up</p>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Medical Conditions</p>
            <div className="flex gap-2 mt-2">
              <span className="bg-gray-100 px-3 py-1 rounded-lg text-xs text-gray-500">Type 2 Diabetes</span>
              <span className="bg-gray-100 px-3 py-1 rounded-lg text-xs text-gray-500">Hypertension</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Current Streak</p>
            <p className="text-green-600 font-bold text-2xl mt-1">12 days</p>
          </div>
        </div>
        {/* Quick Actions */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-6 flex flex-col">
          <h3 className="font-semibold mb-4 text-gray-800">Quick Actions</h3>
          <div className="grid gap-3">
            <button
              onClick={triggerFileInput}
              className="bg-[#2877FF] text-white py-4 rounded-xl shadow hover:bg-blue-700 font-semibold text-lg transition"
            >
              <span className="mr-2">📷</span>Scan New Product
            </button>
            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handlePhotoChange}
            />
            <button className="border border-gray-200 py-3 rounded-xl shadow hover:bg-gray-100 transition text-gray-700 font-medium">
              Generate Report
            </button>
            <button className="border border-gray-200 py-3 rounded-xl shadow hover:bg-gray-100 transition text-gray-700 font-medium">
              Update Medical Data
            </button>
          </div>
          <div className="mt-3 h-6 flex items-center text-sm">
            {selectedPhotos.length > 0
              ? <span className="text-[#2877FF]">{selectedPhotos.length} photo(s) selected.</span>
              : <span className="text-gray-400">No photo selected.</span>
            }
          </div>
          <div className="mt-2 text-xs text-[#2877FF] flex items-center">
            💡
            <span className="ml-1">Pro Tip: Scan barcodes for instant nutritional analysis and personalized recommendations.</span>
          </div>
        </div>
      </div>
      {/* Daily Wellness Goals Section */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="font-semibold mb-4 text-gray-800">Daily Wellness Goals</h3>
          <div className="space-y-6">
            {goals.map((goal) => (
              <div key={goal.name} className="flex items-center">
                <span className="text-lg">{goal.emoji}</span>
                <span className="ml-2 w-32">{goal.name}</span>
                <button
                  className="w-7 h-7 rounded-full bg-gray-100 text-blue-500 text-xl flex items-center justify-center hover:bg-blue-50"
                  disabled={goal.state <= 0}
                  onClick={() => goal.setState(Math.max(0, goal.state - 1))}
                >
                  −
                </button>
                <ProgressBar value={goal.state} total={goal.total} />
                <button
                  className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 text-xl flex items-center justify-center hover:bg-blue-200"
                  disabled={goal.state >= goal.total}
                  onClick={() => goal.setState(Math.min(goal.total, goal.state + 1))}
                >
                  +
                </button>
                <span className="w-10 ml-2 text-sm text-gray-500 text-center">
                  {goal.state}/{goal.total}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Add similar cards for "Daily Activity Check-in" and "Achievements" for a complete dashboard */}
      </div>
    </div>
  );
}
