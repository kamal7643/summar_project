import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;
import User from "@/models/User";
import Video from "@/models/Video";
import Blog from "@/models/Blog";

if (!MONGODB_URI){
    throw new Error('MONGODB_URI is not defined');
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn: null, promise: null};
}

async function dbConnect(){
    User;
    Video;
    Blog;
    if(cached.conn){
        return cached.conn;
    }
    if(!cached.promise){
        const opts = {
            bufferCommands: true,
        };
        cached.promise = mongoose.connect(MONGODB_URI!, opts);
    }

    cached.conn = await cached.promise;

    console.log("Connected to MongoDB");

    return cached.conn;
}

export default dbConnect;