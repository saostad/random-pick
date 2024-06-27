import React from "react";

const tips = [
  "Eat a variety of foods to ensure you're getting all necessary nutrients.",
  "Aim for at least 5 servings of fruits and vegetables daily.",
  "Choose whole grains over refined grains for more fiber and nutrients.",
  "Limit processed foods, which often contain added sugars and unhealthy fats.",
  "Stay hydrated by drinking plenty of water throughout the day.",
  // Add more tips here
];

export const EducationalTips: React.FC = () => {
  const [currentTip, setCurrentTip] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 10000); // Change tip every 10 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Healthy Eating Tip:</h3>
      <p>{tips[currentTip]}</p>
    </div>
  );
};
