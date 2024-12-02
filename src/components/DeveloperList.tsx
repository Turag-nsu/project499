import Image from "next/image";
import React from "react";

interface Developer {
  name: string;
  photo?: string;
  profileUrl: string;
}

const developers: Developer[] = [
  {
    name: "Md. Abdullah Al Noman Turag",
    photo: "/images/dev-1.jpg", // Replace with actual URLs or paths
    profileUrl: "https://github.com/developer1",
  },
  {
    name: "Abdulla Al Nayem",
    photo: "/images/dev-2.jpg",
    profileUrl: "https://github.com/developer2",
  },
  {
    name: "Prithi Zaglul",
    photo: "/images/dev-3.jpg",
    profileUrl: "https://github.com/developer3",
  },
];

const DeveloperList: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
        Developers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {developers.map((dev, index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4"
          >
            {dev.photo && (
              <Image
                src={dev.photo}
                alt={dev.name}
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-medium text-gray-800 dark:text-white">
                {dev.name}
              </p>
              <a
                href={dev.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeveloperList;
