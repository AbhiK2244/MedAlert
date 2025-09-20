import React from "react";
import Field from "./Field";

const textStyle = {
  Normal: "text-green-500 font-medium",
  Low: "text-red-500 font-medium",
  High: "text-red-500 font-medium",
};

const bmiTextStyle = {
  Normal: "text-green-500 font-medium",
  Underweight: "text-red-500 font-medium",
  "Overweight/Obese": "text-red-500 font-medium",
};

const calculateBMI = (weightKg, heightCm) => {
  if (weightKg == 0 || heightCm == 0)
    return { bmi: "Cannot determine", category: "" };
  const heightM = heightCm / 100;
  const bmiCalculated = weightKg / (heightM * heightM);
  const bmi = parseFloat(bmiCalculated.toFixed(2));

  let category = "";
  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = "Normal";
  } else {
    category = "Overweight/Obese";
  }

  return {
    bmi,
    category,
  };
};

const HealthInformation = ({ healthData, isFetching }) => {
  return (
    <div className="p-4 shadow-lg border-neutral-300 rounded-lg mt-6">
      <h2 className="text-lg font-medium mb-3">Health</h2>
      <div className="grid grid-cols-2 gap-4">
        <Field
          isFetching={isFetching}
          title="Weight"
          text={`${healthData ? healthData?.weight + "kg" : "undefined"}`}
        />
        <Field
          isFetching={isFetching}
          title="Height"
          text={`${healthData ? healthData?.height + "cm" : "undefined"}`}
        />
        <Field
          isFetching={isFetching}
          className={`${textStyle[healthData?.bpLevel]}`}
          title="Blood Pressure"
          text={`${healthData?.bpLevel}`}
        />
        <Field
          isFetching={isFetching}
          className={`${textStyle[healthData?.sugarLevel]}`}
          title="Sugar"
          text={`${healthData?.sugarLevel}`}
        />
        <Field
          isFetching={isFetching}
          title="Allergies"
          text={healthData?.allergies}
        />
        <Field
          isFetching={isFetching}
          title="Medications"
          text={healthData?.medications}
        />
        <Field
          isFetching={isFetching}
          title="AdditionalDetails"
          text={healthData?.additionalDetails}
        />

        <Field
          isFetching={isFetching}
          className={`${
            bmiTextStyle[
              calculateBMI(healthData?.weight || 0, healthData?.height || 0)
                .category
            ]
          }`}
          title="Body Mass Index (BMI)"
          text={`${
            calculateBMI(healthData?.weight || 0, healthData?.height || 0).bmi
          } ${
            calculateBMI(healthData?.weight || 0, healthData?.height || 0)
              .category
          }`}
        />
      </div>
    </div>
  );
};

export default HealthInformation;
