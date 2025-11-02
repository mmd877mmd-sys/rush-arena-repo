import { connectDB } from "@/lib/connectDB";
import Matches from "@/models/matches"; // use capital M for convention

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const data = body.data;

    // Create the match document
    const createMatch = await Matches.create(data);

    if (!createMatch) {
      return Response.json(
        { message: "Failed to create Match", data },
        { status: 400 }
      );
    }

    return Response.json(
      { message: "Match created", data: createMatch },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /matches error:", error);
    return Response.json(
      { message: "Failed to create Match", error: error.message },
      { status: 500 }
    );
  }
}
