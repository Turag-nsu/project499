import React, { FC } from "react";

import CardCategory4 from "@/components/CardCategories/CardCategory4";
import Heading from "@/components/Heading/Heading";

import { EVENT_DATA_TYPE } from "../../../lib/scraper";
export interface SectionGridMoreExploreProps {
  className?: string;
  gridClassName?: string;
  boxCard?: "box1" | "box4" | "box6";
}
const limit = 6;
const offset = 0;
// Fetch event data
async function fetchEventsData(): Promise<EVENT_DATA_TYPE[] | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/events/?limit=${limit}&offset=${offset}`);
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching event data:", error);
    return null;
  }
}
const SectionGridMoreExplore: FC<SectionGridMoreExploreProps> = async ({
  className = "",
  boxCard = "box4",
  gridClassName = "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  
}) => {
  // const [tabActive, setTabActive] = useState("Man");
  const data = await fetchEventsData();
  

  const renderHeading = () => {
    return (
      <div>
        <Heading
          className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50"
          fontClass="text-3xl md:text-4xl 2xl:text-5xl font-semibold"
          isCenter
          desc=""
        >
          Upcomming
        </Heading>
        
      </div>
    );
  };

  return (
    <div className={`nc-SectionGridMoreExplore relative ${className}`}>
      {renderHeading()}
      <div className={`grid gap-4 md:gap-7 ${gridClassName}`}>
        {data && data.map((item) => <CardCategory4 key={item.id} event={item} className={boxCard} />)}
      </div>
    </div>
  );
};

export default SectionGridMoreExplore;