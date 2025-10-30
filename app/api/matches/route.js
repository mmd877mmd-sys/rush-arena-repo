// import { connectDB } from "@/lib/connectDB";
// import Matches from "@/models/matches";

// export async function GET(request) {
//   try {
//     await connectDB();

//     // Extract query parameter (?type=...)
//     const { searchParams } = new URL(request.url);
//     const matchType = searchParams.get("type");

//     // Validate query
//     if (!matchType) {
//       return Response.json(
//         { message: "Match type is required" },
//         { status: 400 }
//       );
//     }

//     // Fetch matches dynamically by matchType
//     const matches = await Matches.find({ matchType });

//     // If no matches found
//     if (!matches || matches.length === 0) {
//       return Response.json(
//         { message: "No matches found", data: [] },
//         { status: 404 }
//       );
//     }

//     // Success
//     return Response.json(
//       { message: "Success", data: matches },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("API error:", error);
//     return Response.json(
//       {
//         message: "Failed to fetch matches",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }
