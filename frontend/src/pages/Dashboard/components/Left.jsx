import React, { useState } from "react";

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

const Left = () => {
  // Daily goals state
  const [water, setWater] = useState(0);
  const [meals, setMeals] = useState(0);
  const [sleep, setSleep] = useState(0);
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
    <div className="flex flex-col gap-6 w-full">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-2xl font-bold text-[#8451C1] shadow">
            SJ
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Sarah Johnson
            </h2>
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
            <span className="bg-gray-100 px-3 py-1 rounded-lg text-xs text-gray-500">
              Type 2 Diabetes
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-lg text-xs text-gray-500">
              Hypertension
            </span>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600">Current Streak</p>
          <p className="text-green-600 font-bold text-2xl mt-1">12 days</p>
        </div>
      </div>
      {/* Daily Goals */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="font-semibold mb-4 text-gray-800">
          Daily Wellness Goals
        </h3>
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
                onClick={() =>
                  goal.setState(Math.min(goal.total, goal.state + 1))
                }
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
    </div>
  );
};

export default Left;
