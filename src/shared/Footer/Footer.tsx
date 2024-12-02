import WebLogo from "@/components/WebLogo";
import Image from "next/image";
import React from "react";
import dev1 from "@/images/dev-1.jpg";
import dev2 from "@/images/dev-2.jpg";
import dev3 from "@/images/dev-3.jpg";


const developers = [
  {
    name: "Md. Abdullah Al Noman Turag",
    photo: dev1,
    profileUrl: "https://github.com/Turag-nsu",
  },
  {
    name: "Abdulla Al Nayem",
    photo: dev2,
    profileUrl: "https://github.com/nayem012",
  },
  {
    name: "Prithi Zaglul",
    photo: dev3,
    profileUrl: "https://github.com/developer3",
  },
];

const Footer: React.FC = () => {
  return (
    <div className="nc-Footer relative py-20 lg:pt-28 lg:pb-24 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Logo and Website Description */}
        <div>
          <WebLogo />
          <p className="mt-5 text-sm text-neutral-600 dark:text-neutral-300">
            This website is for research purposes and is being developed as a
            project. It will evolve into a business platform in the future.
          </p>
        </div>

        {/* Developer Profiles */}
        <div>
          <h2 className="text-xl font-semibold text-neutral-700 dark:text-neutral-200 mb-5">
            Developers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {developers.map((dev, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4"
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
                  <p className="font-medium text-neutral-700 dark:text-neutral-200">
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
      </div>
    </div>
  );
};

export default Footer;
