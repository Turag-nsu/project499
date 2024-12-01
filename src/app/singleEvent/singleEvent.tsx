import React from "react";
import Image from "next/image";
import { EVENT_DATA_TYPE } from "../../../lib/scraper"; // Adjust the path as necessary

interface EventPageProps {
  event: EVENT_DATA_TYPE;
}

const SingleEventPage: React.FC<EventPageProps> = ({ event }) => {
  const {
    name,
    description,
    location,
    photo,
    isOnline,
    startTimestamp,
    endTimestamp,
    formatedTimestamp,
    timezone,
    onlineDetails,
    hosts,
    ticketUrl,
    url,
  } = event;

  return (
    <div className="container mx-auto p-4">
      {/* Event Banner */}
      {photo?.imageUri && (
        <div className="w-full h-64 relative overflow-hidden rounded-lg">
          <Image
            src={photo.imageUri}
            alt={name || "Event Image"}
            layout="fill"
            objectFit="cover"
            quality={80}
            placeholder="blur"
            blurDataURL="/placeholder.png" // Optional placeholder
          />
        </div>
      )}

      {/* Event Name */}
      <h1 className="text-3xl font-bold mt-4">{name}</h1>

      {/* Event Description */}
      {description && <p className="text-gray-600 mt-2">{description}</p>}

      {/* Event Timing */}
      <div className="mt-4">
        {formatedTimestamp && (
          <p className="text-sm text-gray-700">
            <strong>Date & Time:</strong> {formatedTimestamp} {timezone && `(${timezone})`}
          </p>
        )}
        {startTimestamp && (
          <p className="text-sm text-gray-700">
            <strong>Start:</strong> {new Date(startTimestamp).toLocaleString()}
          </p>
        )}
        {endTimestamp && (
          <p className="text-sm text-gray-700">
            <strong>End:</strong> {new Date(endTimestamp).toLocaleString()}
          </p>
        )}
      </div>

      {/* Event Location */}
      <div className="mt-4">
        {isOnline ? (
          <div>
            <p className="text-sm text-gray-700">
              <strong>Event Type:</strong> Online
            </p>
            {onlineDetails && (
              <p className="text-sm text-gray-500">Details: {onlineDetails}</p>
            )}
          </div>
        ) : (
          location?.name && (
            <div>
              <p className="text-sm text-gray-700">
                <strong>Location:</strong> {location.name}
              </p>
              {location.coordinates && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${location.coordinates.latitude},${location.coordinates.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View on Google Maps
                </a>
              )}
            </div>
          )
        )}
      </div>

      {/* Hosts */}
      {hosts && hosts.length > 0 && (
        <div className="mt-4">
          <strong>Hosts:</strong>
          <div className="flex mt-2 space-x-4">
            {hosts.map((host, index) => (
              <a
                key={index}
                href={host.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                {host.photo?.imageUri && (
                  <Image
                    src={host.photo.imageUri}
                    alt={host.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <span className="text-gray-700">{host.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Tickets */}
      {ticketUrl && (
        <div className="mt-4">
          <a
            href={ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Get Tickets
          </a>
        </div>
      )}

      {/* Event Source Link */}
      <div className="mt-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Original Event Page
        </a>
      </div>
    </div>
  );
};

export default SingleEventPage;
