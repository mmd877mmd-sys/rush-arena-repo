import { google } from "googleapis";
import axios from "axios";
import { connectDB } from "@/lib/connectDB";
import Tokens from "@/models/Tokens";

export async function POST(req) {
  try {
    await connectDB();

    const { title, body } = await req.json();

    // Load service account
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: process.env.FCM_TYPE,
        project_id: process.env.FCM_PROJECT_ID,
        private_key_id: process.env.FCM_PRIVATE_KEY_ID,
        private_key: process.env.FCM_PRIVATE_KEY.replace(/\\n/g, "\n"),
        client_email: process.env.FCM_CLIENT_EMAIL,
        client_id: process.env.FCM_CLIENT_ID,
      },
      scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
    });

    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    // Fetch all tokens
    const tokens = await Tokens.find().lean();

    // Send notifications
    const results = [];
    for (let t of tokens) {
      const res = await axios.post(
        `https://fcm.googleapis.com/v1/projects/${process.env.FCM_PROJECT_ID}/messages:send`,
        {
          message: {
            token: t.token,
            notification: { title, body },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      results.push(res.data);
    }

    return Response.json({ success: true, results });
  } catch (e) {
    console.error(e);
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}
