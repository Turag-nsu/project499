import React from "react";
import Image from "next/image";

interface EventCardProps {
  image: string;
  title: string;
  location: string;
  time: string;
}

const EventCard: React.FC<EventCardProps> = ({ image, title, location, time }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
      <Image
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
        width={400}
        height={300}
        priority
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          📍 {location}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          🕒 {time}
        </p>
        <button className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 dark:focus:ring-blue-800">
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
