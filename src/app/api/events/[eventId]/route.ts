import { NextResponse } from "next/server";
import { getDb } from "../../../../../lib/db";
import { EVENT_DATA_TYPE } from "../../../../../lib/scraper";

/**
 * Fetches an event by its unique identifier.
 * @param eventId - The unique ID of the event.
 * @returns The event data if found, otherwise null.
 */
async function getEventByEventId(eventId: string): Promise<EVENT_DATA_TYPE | null> {
  try {
    const db = await getDb();
    const collection = db.collection<EVENT_DATA_TYPE>("events");
    return await collection.findOne({ id: eventId });
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    throw new Error("Failed to fetch event data.");
  }
}

/**
 * API route to fetch event details by ID.
 * @param req - The incoming HTTP request.
 * @returns The HTTP response with the event data or an error message.
 */
export async function GET(req: Request): Promise<Response> {
  try {
    const url = new URL(req.url);
    const eventId = url.pathname.split("/").pop();

    if (!eventId) {
      return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
    }

    const event = await getEventByEventId(eventId);

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error in GET /api/events/[eventId]:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
