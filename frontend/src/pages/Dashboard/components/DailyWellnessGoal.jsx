import React, { useState } from "react";
import ProgressBar from './ProgressBar'

const DailyWellnessGoal = () => {
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
    <div className="p-4">
            <h3 className="font-semibold mb-4 text-gray-800">
              Daily Wellness Goals
            </h3>
            <div className="space-y-6">
              {goals.map((goal) => (
                <div key={goal.name} className="flex items-center">
                  <span className="text-sm">{goal.emoji}</span>
                  <span className="ml-1 w-28 text-sm">{goal.name}</span>
                  <button
                    className="w-6 h-6 text-xs font-bold rounded-full bg-neutral-100 text-primary flex items-center justify-center hover:bg-blue-100 cursor-pointer transition duration-500"
                    disabled={goal.state <= 0}
                    onClick={() => goal.setState(Math.max(0, goal.state - 1))}
                  >
                    −
                  </button>
                  <ProgressBar value={goal.state} total={goal.total} />
                  <button
                    className="w-6 h-6 text-xs font-bold rounded-full bg-neutral-100 text-primary flex items-center justify-center hover:bg-blue-100 cursor-pointer transition duration-500"
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
  )
}

export default DailyWellnessGoal
