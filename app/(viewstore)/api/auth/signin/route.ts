import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
const bcrypt = require("bcrypt");
import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";

export async function POST(req: NextRequest): Promise<any> {
    try {
        await dbConnect();
        const { email, password } = await req.json();

        const existing_user = await User.findOne({ email });

        if (!existing_user) throw new Error("user do not exists");

        const isPasswordValid = await bcrypt.compare(
            password,
            existing_user.password
        );

        if (!isPasswordValid) {
            throw new Error("invalid password");
        }

        return NextResponse.json({
            success: true,
            data : {
                token: await new SignJWT({ _id: existing_user._id })
                  .setProtectedHeader({ alg: "HS256" })
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