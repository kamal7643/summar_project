import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import Video from "@/models/Video";

export async function POST(req: NextRequest, res: NextResponse): Promise<any>{
    const {title, description, url} = await req.json();
    const _id = req.headers.get('_id');

    const user = await User.findById(_id);

    if(!user) return NextResponse.json({success: false, message: "User not found"});

    // create a new video
    const new_video = await Video.create({
        title,
        description,
        url,
        user: user._id,
    });

    return NextResponse.json({success: true, data: new_video});

}

export async function GET(req: NextRequest):Promise<any>{
    const videos = await Video.find().limit(20);

    return NextResponse.json({success: true, data: videos});
}