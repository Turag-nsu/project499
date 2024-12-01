import { MongoClient } from 'mongodb';

// Declare client variable
let client: MongoClient | null = null;

// Get the MongoDB client
const getClient = async (): Promise<MongoClient> => {
  if (client) {
    console.log('Reusing existing MongoClient instance');
    return client;
  }

  // console.log('Checking for MongoDB connection URI');
  if (!process.env.EHUB_MONGO_URI) {
    throw new Error('Missing MongoDB connection URI in environment variables.');
  }

  try {
    // Initialize the MongoClient with the URI
    // console.log('Initializing MongoClient');
    client = new MongoClient(process.env.EHUB_MONGO_URI);
    // console.log('MongoClient initialized');
    
    // Attempt to connect to the database
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    client = null; // Reset client to avoid reuse of a faulty instance
    throw error; // Rethrow to propagate the error
  }

  return client;
};

// Helper function to get the database
export const getDb = async () => {
  // console.log('Getting database');
  if (!process.env.EHUB_MONGO_URI) {
    throw new Error('Missing MongoDB database name in environment variables.');
  }

  console.log('Getting client');
  const client = await getClient();
  console.log('Returning database');
  return client.db("eventhub");
};

// Optional: Clean up MongoClient instance
export const closeClient = async (): Promise<void> => {
  if (client) {
    // console.log('Closing MongoDB connection');
    await client.close();
    client = null; // Reset client
    // console.log('MongoDB connection closed');
  }
};

// Export the client for other parts of the app to use
export default client;
