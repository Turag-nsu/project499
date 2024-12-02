//src/app/events/page.tsx to show all events
import CardCategory4 from '@/components/CardCategories/CardCategory4';
import React, {FC} from 'react';
import { EVENT_DATA_TYPE } from '../../../lib/scraper';

export const dynamic = 'force-dynamic'
export const revalidate = 1
export default async function PageEvents() {
    const limit = 300;
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
    const data = await fetchEventsData();
  return (
    <div className="container py-12 lg:py-16 space-y-12 lg:space-y-16">
      <div className="grid gap-4 md:gap-7 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {data && data.map((item) => <CardCategory4 key={item.id} event={item} className={`box-4`} />)}
      </div>
    </div>
  );
}