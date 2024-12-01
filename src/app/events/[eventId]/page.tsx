
import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Map from "@/components/Map";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import { EVENT_DATA_TYPE } from "../../../../lib/scraper";
import Button from "@/shared/Button/Button";
import Badge from "@/shared/Badge/Badge";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

// Fetch event data
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

export default async function SingleEventPage({
  params,
}: {
  params: { eventId: string };
}) {
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
    formattedDate,
    timezone,
    hosts,
    ticketUrl,
  } = eventData;

  return (
    <div className="container mx-auto px-6 py-10 space-y-10">
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          
          {photo?.imageUri && (
            <Image
              src={photo.imageUri}
              alt={name}
              width={800}
              height={600}
              className="rounded-xl shadow-lg object-cover"
              priority
            />
          )}
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            {name} 
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {formattedDate?.slice(0, -3)} {formattedDate  && `(${timezone})`} <Badge color={isOnline ? "green" : "blue"} name={isOnline ? "Online Event" : "Offline Event"} />
          </p>
          {/* <Badge type={isOnline ? "success" : "info"} label={isOnline ? "Online Event" : "Offline Event"} /> */}
          
          {ticketUrl && (
            <a href={ticketUrl} target="_blank" rel="noopener noreferrer">
              <ButtonPrimary className="mt-4">
                Buy Tickets
              </ButtonPrimary>
            </a>
          )}
          {/* Location Section */}
      {location?.coordinates?.latitude && location?.coordinates?.longitude && (
        <div className="space-y-4 mt-4">
          {/* <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
            Location
          </h2> */}
          {/* <p className="text-gray-600 dark:text-gray-300">{location.name}</p> */}
          {/* <div className="rounded-xl overflow-hidden shadow-md">
            <Map
              latitude={location.coordinates.latitude}
              longitude={location.coordinates.longitude}
            />
          </div> */}
          {/* button to go to google map using latitude and longitude*/}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${location.coordinates.latitude},${location.coordinates.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <Button>View on Map</Button> */}
            <ButtonPrimary>Location: {location.name}</ButtonPrimary>
          </a>
        </div>
      )}
        </div>
      </div>

      {/* Description Section */}
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
          Description
        </h2>
        <p className="text-gray-600 dark:text-gray-300  whitespace-pre-wrap">{description}</p>
      </div>

      

      {/* Hosts Section */}
      {hosts && hosts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
            Hosts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hosts.map((host, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4"
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
                  <p className="font-medium text-gray-800 dark:text-white">
                    {host.name}
                  </p>
                  <a
                    href={host.url}
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
      )}
    </div>
  );
}
