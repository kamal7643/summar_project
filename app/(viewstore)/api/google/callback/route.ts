import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, createRemoteJWKSet, SignJWT } from "jose";
import User from "@/models/User";

async function verifyGoogleIdToken(idToken:string | null) {
    try {
      const key = await createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));
    //   const { payload, protectedHeader } = await jwtVerify(idToken!, key, {
    //     issuer: 'accounts.google.com',
    //     audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    //   });
    const {payload} = await jwtVerify(idToken!, key);


  
      // The token is verified, and you can access the decoded payload
      // console.log('Decoded Token:', payload);
  
      return payload;
    } catch (error:any) {
      console.error('Token verification failed:', error.message);
      throw new Error('Token verification failed');
    }
  }

  export async function GET(req: NextRequest){
    dbConnect();
    const googleJwt = new URL(req.url!).searchParams.get("token");
    const linkToken = new URL(req.url!).searchParams.get("link");

    const {email, sub} = await verifyGoogleIdToken(googleJwt);

    if(!(email || sub))return NextResponse.json( {success: false, data: "Invalid Google JWT",});
    let user = (email && await User.findOne({email})) || (await User.findOne({google_sub:sub}));
    if(!user){
        user = await new User({email, google_sub:sub}).save();
    }
    const user_token = await new SignJWT({_id: user._id}).setProtectedHeader({alg:"HS256"}).setExpirationTime('24h').sign(new TextEncoder().encode(process.env.JWT_SECRET));


    return NextResponse.redirect(process.env.NEXT_PUBLIC_DOMAIN+"/signin?token="+user_token);

}