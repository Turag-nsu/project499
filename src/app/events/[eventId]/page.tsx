import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { EVENT_DATA_TYPE } from "../../../../lib/scraper";
import Map from "@/components/Map";

// Function to fetch data from the API
async function fetchEventData(eventId: string): Promise<EVENT_DATA_TYPE | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/events/${eventId}`);
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching event data:", error);
    return null;
  }
}

export default async function SingleEventPage({ params }: { params: { eventId: string } }) {
  const { eventId } = params;
  const eventData = await fetchEventData(eventId);

  if (!eventData) {
    notFound();
  }

  const {
    name,
    description,
    location,
    photo,
    isOnline,
    formatedTimestamp,
    timezone,
    hosts,
    ticketUrl,
  } = eventData;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Event Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {photo?.imageUri && (
          <Image
            src={photo.imageUri}
            alt={name}
            width={800}
            height={600}
            className="rounded-lg object-cover"
            priority
          />
        )}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          {formatedTimestamp && (
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {formatedTimestamp} {timezone && `(${timezone})`}
            </p>
          )}
          <p
            className={`text-lg font-medium ${
              isOnline ? "text-green-600" : "text-blue-600"
            }`}
          >
            {isOnline ? "Online Event" : "Offline Event"}
          </p>
          {ticketUrl && (
            <a
              href={ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Buy Tickets
            </a>
          )}
        </div>
      </div>

      {/* Event Description */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Description</h2>
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
      </div>

      {/* Location */}
      {location?.coordinates?.latitude && location?.coordinates?.longitude && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Location</h2>
          <p className="text-gray-700 dark:text-gray-300">{location.name}</p>
          <Map
            latitude={location.coordinates.latitude}
            longitude={location.coordinates.longitude}
          />
        </div>
      )}

      {/* Hosts */}
      {hosts && hosts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Hosts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hosts.map((host, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"
              >
                {host.photo?.imageUri && (
                  <Image
                    src={host.photo.imageUri}
                    alt={host.name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold">{host.name}</p>
                  <a
                    href={host.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline text-sm"
                  >
                    Visit Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
