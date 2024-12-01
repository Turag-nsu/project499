import React from "react";

interface MapProps {
  latitude: number;
  longitude: number;
  className?: string;
}

const Map: React.FC<MapProps> = ({ latitude, longitude, className }) => {
  if (!latitude || !longitude) {
    return <p>Location data is not available.</p>;
  }

  // Generate the Google Maps embed link using latitude and longitude
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10000!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1`;

  return (
    <iframe
      src={mapSrc}
      className={`w-full h-64 rounded-lg ${className}`}
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

export default Map;
