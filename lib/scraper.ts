import { scrapeFbEvent } from 'facebook-event-scraper'
import { scrapeFacebookEventLinks } from './crawler';
/**
 {
    "id": "1235540631072966",
    "name": "Opening- Rinaz Outlet",
    "description": "Grand opening of Rinaz Outlet.\nAddress: Shop# E7 (4th floor/ level 5), Pink City Shopping Complex, Gulshan-2, Dhaka\n20% flat discount on all products at the store only. Offer valid from 3 to 7 December 2024.\nExclusive designer clothing and wedding collections available.\nYou are cordially invited to grace the grand occasion. ",
    "location": {
        "id": "649015517886333",
        "name": "Pink City",
        "description": null,
        "url": null,
        "coordinates": {
            "latitude": 23.792302782231,
            "longitude": 90.415663148809
        },
        "countryCode": "BD",
        "type": "TEXT",
        "address": null,
        "city": null
    },
    "photo": {
        "url": "https://www.facebook.com/photo/?fbid=647112924743259&set=gm.1235540691072960",
        "id": "647112924743259",
        "imageUri": "https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-6/468550937_647112928076592_5467264910451504749_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=75d36f&_nc_ohc=Wh-ZB8-usWoQ7kNvgHu700z&_nc_zt=23&_nc_ht=scontent.fdac14-1.fna&_nc_gid=AmhKzVuhOyLgy0wqaZ8lc3M&oh=00_AYAXCyvSgCVnSi1F10bUvgiWIN50_r_Vcsgc4B96b64txw&oe=67516358"
    },
    "video": null,
    "isOnline": false,
    "url": "https://www.facebook.com/events/1235540631072966/",
    "startTimestamp": 1733220000,
    "endTimestamp": null,
    "formattedDate": "Tuesday 3 December 2024 at 16:00 +06",
    "timezone": "UTC+06",
    "onlineDetails": null,
    "hosts": [
        {
            "id": "100083336709352",
            "name": "Rinaz",
            "url": "https://www.facebook.com/rinazapparel",
            "type": "User",
            "photo": {
                "imageUri": "https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-1/461081548_596154753172410_4557720340426999648_n.jpg?stp=cp0_dst-jpg_s74x74&_nc_cat=105&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=zsnum0cZOUEQ7kNvgF9SCds&_nc_zt=24&_nc_ht=scontent.fdac14-1.fna&_nc_gid=AzC4nA7rkMLtOHPZeM8iDBg&oh=00_AYDOTw76CxUqBsDEYG_eNi-fF1gl-UdvaJblVEz4Ag3HPQ&oe=6751643A"
            }
        }
    ],
    "ticketUrl": null,
    "siblingEvents": [],
    "parentEvent": null,
    "usersResponded": 411
}
 */

export type EVENT_DATA_TYPE = {
  id: string;
  name: string;
  description: string;
  location?: {
    name?: string;
    coordinates?: {
      latitude?: number;
      longitude?: number;
    };
  };
  photo?: {
    imageUri?: string;
  };
  isOnline?: boolean;
  url: string;
  startTimestamp?: number;
  endTimestamp?: number; // Updated type to match expected `undefined`
  formatedTimestamp?: string;
  formattedDate?: string; // Updated type to match expected `undefined`
  timezone?: string;
  onlineDetails?: any;
  hosts?: {
    url: string;
    name: string;
    photo: {
      imageUri: string;
    };
  }[];
  ticketUrl?: string;
};

export async function scrapMultiEvents(): Promise<EVENT_DATA_TYPE[]> {
  const links = await scrapeFacebookEventLinks();
  const events: EVENT_DATA_TYPE[] = [];

  try {
    const eventPromises = links.map(async (link) => {
      try {
        const eventData = await scrapeFbEvent(link);

        // Normalize the event data, replacing `null` with `undefined`
        return {
          id: eventData.id,
          name: eventData.name,
          description: eventData.description,
          location: {
            name: eventData.location?.name,
            coordinates: {
              latitude: eventData.location?.coordinates?.latitude,
              longitude: eventData.location?.coordinates?.longitude,
            },
          },
          photo: {
            imageUri: eventData.photo?.imageUri,
          },
          isOnline: eventData.isOnline,
          url: eventData.url,
          startTimestamp: eventData.startTimestamp,
          endTimestamp: eventData.endTimestamp ?? undefined, // Convert null to undefined
          formattedDate: eventData.formattedDate ?? undefined, // Convert null to undefined
          timezone: eventData.timezone,
          onlineDetails: eventData.onlineDetails,
          hosts: eventData.hosts,
          ticketUrl: eventData.ticketUrl ?? undefined, // Convert null to undefined
        } as EVENT_DATA_TYPE; // Ensure the structure matches EventData
      } catch (err) {
        console.error(`Error scraping event at ${link}:`, err);
        return null; // Return null for failed scrapes
      }
    });

    // Wait for all event promises and filter out null results
    const results = await Promise.all(eventPromises);
    events.push(...results.filter((event): event is EVENT_DATA_TYPE => event !== null));
  } catch (err) {
    console.error('Error during multi-event scraping:', err);
  }

  return events;
}
