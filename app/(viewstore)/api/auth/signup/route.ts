import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
const bcrypt = require("bcrypt");
import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";


export async function POST(req: NextRequest): Promise<any> {
    try{
        await dbConnect();

        const { name, email, password } = await req.json();
        const existing_user = await User.findOne({ email });

        if (existing_user) throw new Error("Email already in use by another user!");

        const hashed_password = await bcrypt.hash(password, 10);

        const new_user = await User.create({
            name,
            email,
            password:  hashed_password,
        });

        return NextResponse.json({
            success: true,
            data : {
                token: await new SignJWT({ _id: new_user._id })
                  .setProtectedHeader({ alg: "HS256" })
                  .setExpirationTime('24h')
                  .sign(new TextEncoder().encode(process.env.JWT_SECRET)),
              },
        });
    }
    catch (e:any) {
        return NextResponse.json({
            status: "error",
            message: e.message,
        });
    }
}