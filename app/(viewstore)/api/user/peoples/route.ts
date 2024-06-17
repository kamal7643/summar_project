import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export async function GET(req: NextRequest): Promise<any> {
    await dbConnect();
    const _id = req.headers.get('_id');
    const user = await User.findById(_id)
    .populate({
        path: 'friend_requests',
        populate: {
            path: 'user',
            select: 'name email -_id', 
        }
    })
    .populate({ 
        path: 'friends',
        select: 'name email _id',
    });

    if(!user) return NextResponse.json({success: false});


    return NextResponse.json({success: true, data:{name:user.name, email:user.email, friends:user.friends, friend_request:user.friend_requests} });
}