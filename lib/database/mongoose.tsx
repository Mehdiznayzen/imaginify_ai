// Importing mongoose library and Mongoose type from mongoose
import mongoose, { Mongoose } from 'mongoose';

// Fetching the MongoDB connection URL from environment variables
const MONGODB_URL = process.env.MONGODB_URL;

// Defining an interface for the mongoose connection object
interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

// Creating a cached object for storing the mongoose connection and promise
let cached: MongooseConnection = (global as any).mongoose;

// If no cached object exists, create one
if (!cached) {
    cached = (global as any).mongoose = {
        conn: null,
        promise: null,
    };
}

// Exporting a function named ConnectToDatabase
export const ConnectToDatabase = async () => {
    // If a connection already exists, return it
    if (cached.conn) {
        return cached.conn;
    }

    // Throw an error if the MongoDB URL is missing
    if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

    // Create a new connection promise if it doesn't exist
    cached.promise =
        cached.promise ||
        mongoose.connect(MONGODB_URL, {
            dbName: 'imaginify',
            bufferCommands: false,
        });

    // Wait for the promise to resolve, then assign the connection to the cached object
    cached.conn = await cached.promise;

    // Return the MongoDB connection
    return cached.conn;
};
