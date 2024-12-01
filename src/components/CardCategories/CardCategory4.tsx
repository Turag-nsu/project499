import React, { FC } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { EVENT_DATA_TYPE } from "../../../lib/scraper";

export interface EventCardProps {
  event: EVENT_DATA_TYPE
  className?: string;
}

const CardCategory4: FC<EventCardProps> = ({ event, className = "" }) => {
  
    const name="Microbiology Olympiad 2024"
    const description="The International Biology Olympiad (IBO) is a science Olympiad for high school students under the age of 20. The first academic international Olympiads after the International Mathematical Olympiad were launched under the auspices of UNESCO in the 1960s. The first IBO was held in Olomouc, Czechoslovakia, in 1990."
    const photo={imageUri:"https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-6/462478132_962256382610795_6026693621998278038_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=75d36f&_nc_ohc=fPKL1YDDD_MQ7kNvgHk5KbD&_nc_zt=23&_nc_ht=scontent.fdac14-1.fna&_nc_gid=AmhHgsj8XfQ1P6NxvfwDgyK&oh=00_AYADKB_DGSPcQdwkqbli5FPigacUdVSpuGrGz2LY_PsbNg&oe=6752597B"}
    const isOnline=false
    const formattedDate="Monday 2 December 2024 at 09:30 +06"
    const ticketUrl="https://forms.gle/LxQDNrE8Mxbs1WN38"
    const id = "1235540631072966"
  

  return (
    <div
      className={`nc-EventCard relative w-full aspect-w-12 aspect-h-11 h-0 rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 group hover:nc-shadow-lg transition-shadow ${className}`}
    >
      <div className=" flex flex-col justify-between">
        {/* Event Image */}
        {photo?.imageUri && (
          <div className="relative w-full h-56 overflow-hidden rounded-xl">
            <Image
              src={photo.imageUri}
              alt={name}
              className="w-full h-full object-cover"
              layout="fill"
              priority
            />
          </div>
        )}

        {/* Event Information */}
        <div className="flex flex-col justify-between space-y-4 p-4">
          <div className="flex justify-between items-center">
            <span
              className={`text-xs font-medium ${
                isOnline ? "text-green-600" : "text-blue-600"
              }`}
            >
              {isOnline ? "Online Event" : "Offline Event"}
            </span>
            <span className="text-sm text-slate-700 dark:text-neutral-300 font-medium text-wrap">
              {formattedDate?.slice(0, -3)}
            </span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
              {name}
            </h2>
            {/* <p className="text-sm text-slate-500 dark:text-slate-400">{description.slice(0,100)}...</p> */}
          </div>

          <div className="flex justify-between items-center mt-4">
            {/* <Link href={`/events/${id}`} passHref>
              <a className="text-sm font-medium flex items-center text-blue-500 hover:text-blue-700">
                <span>Learn More</span>
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </a>
            </Link> */}
            <Link href={`/events/${id}`} passHref>
              <span className="text-sm font-medium flex items-center text-blue-500 hover:text-blue-700">
                <span>Learn More</span>
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </span>
            </Link>
            {ticketUrl && (
              <a
                href={ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Buy Tickets
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// export default EventCard;

export default CardCategory4;
