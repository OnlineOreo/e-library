import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("LTI Launch Data:", body);

    const { registration_token } = body;

    console.log("launch api : ",body);
    

    if (!registration_token) {
      return NextResponse.json({ error: "No registration token found." }, { status: 400 });
    }

    // 🔒 Replace this with your public key or fetch from a path
    const publicKey = `-----BEGIN PUBLIC KEY-----
    YOUR_PUBLIC_KEY_HERE
    -----END PUBLIC KEY-----`;

    // 🔍 **Verify JWT**
    const decoded = jwt.verify(registration_token, publicKey, { algorithms: ["RS256"] });

    console.log("LTI User Verified:", decoded);

    // 📝 **Save LTI user to session or DB (if needed)**

    // 🌐 **Redirect user to the main page bypassing login**
    return NextResponse.redirect("/dashboard");
  } catch (error) {
    console.error("LTI Launch Error:", error.message);
    return NextResponse.json({ error: "LTI Launch Failed" }, { status: 500 });
  }
}