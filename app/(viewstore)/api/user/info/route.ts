import {NextRequest, NextResponse} from 'next/server';
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    await dbConnect();
    const _id = req.headers.get('_id');
    if(!_id){
        return NextResponse.json({success: false, message: "User not found"});
    }
    const {id} = await req.json();

    const user = await User.findById(id).select("name email");

    return NextResponse.json({success: true, data: user});
}