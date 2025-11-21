import { connectDB } from "@/lib/connectDB";
import Tokens from "@/models/Tokens";

export async function POST(req) {
  const { token } = await req.json();
  await connectDB();

  await Tokens.updateOne({ token }, { token }, { upsert: true });

  return Response.json({ success: true });
}
