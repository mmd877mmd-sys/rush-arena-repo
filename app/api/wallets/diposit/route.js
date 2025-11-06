import { connectDB } from "@/lib/connectDB";
import User from "@/models/user";
import { z } from "zod";
import { catchError, response } from "@/lib/healperFunc";
import dipositScema from "@/models/dipositScema";

// Validation schema
const depositSchema = z.object({
  phone: z.string().regex(/^01[3-9]\d{8}$/, "Invalid phone number!"),
  trxId: z.string().min(2, "Transaction ID is required"),
  method: z.enum(["Bkash", "Nagad"]),
  userId: z.string().min(1, "UserId Not found"),
});

// POST method
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { method, userId, trxId, phone } = body;

    // Validate input
    depositSchema.safeParse({ method, userId, trxId });

    // ✅ Check if user exists
    const user = await User.findById(userId);
    if (!user) return response(false, 404, "User not found");

    // ✅ Create transaction
    const newTransaction = await dipositScema.create({
      userId: user._id,
      method,
      phone,
      trxId,
    });

    if (!newTransaction)
      return response(false, 500, "Failed to create transaction");

    // ✅ Success
    return response(true, 200, "Deposit request submitted successfully!");
  } catch (err) {
    console.error("Deposit route error:", err);

    return catchError(err);
  }
}
