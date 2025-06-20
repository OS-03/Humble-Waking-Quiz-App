import * as React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;
  return (
    <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
      <div
        className="h-full transition-all duration-300 bg-gradient-to-r from-blue-900 via-sky-400 via-indigo-200 via-indigo-100 to-gray-400"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
