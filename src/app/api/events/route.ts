import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '../../../../lib/db';
import { EVENT_DATA_TYPE } from '../../../../lib/scraper';

//get event by id
export async function getEventById(id: string): Promise<EVENT_DATA_TYPE | null> {
    const db = await getDb();
    const collection = db.collection('events');
    const data = await collection.findOne({ id });
    if (!data) {
        return null;
    }
    return data as unknown as EVENT_DATA_TYPE;
}

//inster event to the database if id is same then update the event
export async function insertEvent(event: EVENT_DATA_TYPE): Promise<void> {
    // console.log('Start: Inserting event to database:');
    const db = await getDb();
    // console.log('db connected');
    const collection = db.collection('events');
    // console.log('collection connected');
    await collection.updateOne({ id: event.id }, { $set: event }, { upsert: true });
    // console.log('End: Inserting event to database:');
}

export async function POST(req: NextRequest) {
    try {
        const event = await req.json();
        await insertEvent(event);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error inserting event to database:', error);
        return NextResponse.json({ success: false });
    }
}