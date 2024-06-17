import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: NextRequest, res: NextResponse): Promise<any>{
    await dbConnect();
    const {query} = await req.json();
    const _id = req.headers.get('_id');

    const regex = new RegExp(query,'i');

    const users = await User.find({ name: { $regex: regex }, _id : {$ne : _id} }).select('name email -_id');

    return NextResponse.json({success: true, data: users});
}