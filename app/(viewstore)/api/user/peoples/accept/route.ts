import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    try {
        await dbConnect();
        const { email } = await req.json();
        const _id = req.headers.get('_id');

        // Find the user who is accepting the friend request by their _id
        const acceptingUser = await User.findById(_id);
        if (!acceptingUser) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        // Find the user who sent the friend request by their email
        const sendingUser = await User.findOne({ email });
        if (!sendingUser) {
            return NextResponse.json({ success: false, message: 'User with the provided email not found' }, { status: 404 });
        }

        // Update both users' friend lists to add each other as friends
        acceptingUser.friends.push(sendingUser._id);
        sendingUser.friends.push(acceptingUser._id);

        // Remove the friend request from the accepting user's friend_requests array
        acceptingUser.friend_requests = acceptingUser.friend_requests.filter((request:any) => !request.user.equals(sendingUser._id));
        
        // Save the changes to both users
        await Promise.all([acceptingUser.save(), sendingUser.save()]);

        return NextResponse.json({ success: true, message: 'Friend request accepted successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
