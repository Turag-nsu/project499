import React from "react";

const announcements = [
  {
    title: "Recommendation System",
    status: "Ongoing",
    description:
      "Using a GNN-based recommendation system to analyze user behavior, focusing on event attendance dates and travel patterns within the city.",
    icon: "🔍", // Customize with relevant emojis or icons
  },
  {
    title: "Advanced Data Extraction",
    status: "Ongoing",
    description:
      "Implementing NLP-based data extraction to convert unstructured text into structured JSON formats by fine-tuning advanced NLP models.",
    icon: "📝",
  },
  {
    title: "Web3 Reward System",
    status: "Upcoming",
    description:
      "Planning a Web3 reward system to monetize user engagement via ads while rewarding active participants with tokens.",
    icon: "🌐",
  },
  {
    title: "Fake Event Detection",
    status: "Upcoming",
    description:
      "Developing a fake event detection system using ML algorithms to identify and remove fake events from the platform.",
    icon: "🚫",
  },
  {
    title: "Paid Event Promotion",
    status: "Ongoing",
    description:
      "Developing a paid event promotion feature for event organizers to increase visibility and reach a larger audience.",
    icon: "💸",
  },
  {
    title: "Ticketing Integration",
    status: "Upcoming",
    description:
      "Integrating a ticketing system to allow users to book tickets directly from the platform and receive QR codes for event entry.",
    icon: "🎟️",
  },
  {
    title: "Event Live Streaming",
    status: "Upcoming",
    description:
      "Building a live streaming feature for events to increase user engagement and accessibility to global audiences.",
    icon: "📹",
  }
];

const AnnouncementPage: React.FC = () => {
  return (
    <div className="container py-12 lg:py-16 space-y-12">
      <h1 className="text-4xl lg:text-5xl font-bold text-center text-gray-800 dark:text-white">
        Research Announcements
      </h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Explore our ongoing and upcoming research projects aimed at revolutionizing event aggregation and user engagement.
      </p>

      <div className="grid gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {announcements.map((announcement, index) => (
          <div
            key={index}
            className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="text-3xl mr-4">{announcement.icon}</div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  {announcement.title}
                </h3>
                <span
                  className={`inline-block mt-1 px-3 py-1 text-sm font-medium rounded-full ${
                    announcement.status === "Ongoing"
                      ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200"
                  }`}
                >
                  {announcement.status}
                </span>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              {announcement.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementPage;
