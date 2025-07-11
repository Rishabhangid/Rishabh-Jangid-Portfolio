import React from "react";

export const RatingComponent = ({ rating }) => {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < rating ? "text-yellow-500" : "text-gray-400"}>
          ★
        </span>
      ))}
    </div>
  );
};
