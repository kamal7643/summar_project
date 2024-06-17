import { NextRequest, NextResponse } from "next/server";
import mongoose from 'mongoose';
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    try {
        await dbConnect();
        const { email } = await req.json();
        const senderId = req.headers.get('_id');

        // Check if sender ID is provided
        if (!senderId) {
            return NextResponse.json({ success: false, message: 'Sender ID is required' }, { status: 400 });
        }

        // Find the recipient by email
        const recipient = await User.findOne({ email });
        if (!recipient) {
            return NextResponse.json({ success: false, message: 'Recipient not found' }, { status: 404 });
        }

        // Find the sender by ID
        const sender = await User.findById(senderId);
        if (!sender) {
            return NextResponse.json({ success: false, message: 'Sender not found' }, { status: 404 });
        }

        // Check if the friend request already exists
        const existingRequest = sender.friend_requests.find(
            (request:any) => request.user.toString() === recipient._id.toString()
        );
        if (existingRequest) {
            return NextResponse.json({ success: false, message: 'Friend request already sent' }, { status: 400 });
        }

        // Add the friend request
        // sender.friend_requests.push({ user: recipient._id });
        // await sender.save();

        const data = await User.findByIdAndUpdate(recipient._id, {friend_requests:[{user:sender._id}]});

        return NextResponse.json({ success: true, message: 'Friend request sent successfully', data });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
