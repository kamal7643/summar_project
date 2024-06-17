import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export async function GET(req: NextRequest): Promise<any> {
    await dbConnect();
    const _id = req.headers.get('_id');
    const user = await User.findById(_id);

    if(!user) return NextResponse.json({success: false});

    return NextResponse.json({success: true, data: {email: user.email, name: user.name}});

}