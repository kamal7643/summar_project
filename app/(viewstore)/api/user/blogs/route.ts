import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import User from "@/models/User";

export async function GET(req: NextRequest): Promise<any> {
    const _id = req.headers.get('_id');
    const user = await User.findById(_id);

    if(!user) return NextResponse.json({success: false, message: "User not found"});

    const blogs = await Blog.find({user: _id});

    return NextResponse.json({success: true, data: blogs});
}

export async function POST(req: NextRequest): Promise<any> {
    const _id = req.headers.get('_id');
    const user = await User.findById(_id);

    if(!user) return NextResponse.json({success: false, message: "User not found"});

    const {title, description} = await req.json();

    const new_blog = await Blog.create({
        title,
        description,
        user: user._id,
    });

    return NextResponse.json({success: true, data: new_blog});
}