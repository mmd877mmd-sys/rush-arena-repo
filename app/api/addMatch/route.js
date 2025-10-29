import { connectDB } from "@/lib/connectDB";
import matches from "@/models/matches";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const data = body.data;
    const createMatch = matches.insertOne(data);
    if (!createMatch) {
      return Response.json(
        { message: "Failed to create Match", data },
        { status: 400 }
      );
    }

    return Response.json({ message: "sended", data }, { status: 200 });
  } catch (error) {
    console.error(" POST /products error:", error);
    return Response.json(
      { message: "Failed to create product", error: error.message },
      { status: 500 }
    );
  }
}
