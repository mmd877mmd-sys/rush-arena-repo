import { connectDB } from "@/lib/connectDB";
import Tokens from "@/models/token";

export async function POST(request) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return new Response(
        JSON.stringify({ success: false, message: "Token is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await connectDB();

    // Save token or update timestamp if it already exists
    await Tokens.updateOne(
      { token },
      { token, createdAt: new Date() },
      { upsert: true }
    );
    // Set cookie
    const headers = {
      "Set-Cookie": cookie.serialize("notification_token", token, {
        httpOnly: false, // frontend/Capacitor can read it
        path: "/",
        sameSite: "lax",
      }),
    };

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
      data: token,
    });
  } catch (err) {
    console.error("Error saving token:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
