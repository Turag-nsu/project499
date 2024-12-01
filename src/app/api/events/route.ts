import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '../../../../lib/db';
import { EVENT_DATA_TYPE } from '../../../../lib/scraper';


//inster event to the database if id is same then update the event
async function insertEvent(event: EVENT_DATA_TYPE): Promise<void> {
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

//get all the latest events from the database with limit and offset or pagination
async function getEvents(limit: number, offset: number): Promise<EVENT_DATA_TYPE[]> {
    const db = await getDb();
    const collection = db.collection<EVENT_DATA_TYPE>('events');
    return await collection.find().sort({$natural:-1}).limit(limit).skip(offset).toArray();
}

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const limit = parseInt(url.searchParams.get('limit') || '10', 10);
        const offset = parseInt(url.searchParams.get('offset') || '0', 10);

        const events = await getEvents(limit, offset);
        return NextResponse.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

//example of how to use the api to get the data
// fetch('http://localhost:3000/api/events?limit=5&offset=0')