import { connectDB } from "@/lib/connectDB";
import User from "@/models/user";
import { z } from "zod";
import { catchError, response } from "@/lib/healperFunc";
import withdrawSchema from "@/models/withdrawSchema";
import adminTokens from "@/models/Tokens";
import { fcm } from "@/lib/firebaseAdmin";

// Zod schema
const zwithdrawSchema = z.object({
  receiverPhone: z.string().regex(/^01[3-9]\d{8}$/, "Invalid phone number!"),
  amount: z.number().min(105, "Minimum withdrawal amount is 105!"),
  method: z.enum(["Bkash", "Nagad"]),
  userId: z.string().min(1, "UserId is required"),
});

// Named export for POST method
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { method, userId, receiverPhone, amount } = body;

    // Validate input
    zwithdrawSchema.safeParse({ method, userId, receiverPhone, amount });

    // Find user
    const user = await User.findById(userId);
    if (!user) return response(false, 404, "User not found");

    // Check balance
    if (user.winbalance < amount)
      return response(false, 400, "Insufficient Wining balance");

    // Create withdrawal Withdraw
    const newWithdraw = withdrawSchema.create({
      userId: user._id,
      method,
      phone: receiverPhone,
      amount,
    });

    if (!newWithdraw) return response(false, 500, "Failed to create Withdraw");

    // Deduct balance
    user.winbalance -= amount;
    await user.save();

    // send notification s to admin
    // 1. Get all stored device tokens
    const records = await adminTokens.find({});
    const tokens = records.map((item) => item.token).filter(Boolean);

    if (tokens.length === 0) {
      return NextResponse.json({ error: "No tokens found" }, { status: 404 });
    }

    // 2. Prepare the notification payload
    const payload = {
      notification: {
        title: "New Withdraw Requested",
        body: `${amount}tk Withdraw request for ${method}. Please Check and complete the Withdraw `,
      },
    };

    // 3. Send to all tokens (multicast)
    const pushresponse = await fcm.sendEachForMulticast({
      tokens,
      ...payload,
    });

    return new Response(
      JSON.stringify({
        sent: response.successCount,
        failed: response.failureCount,
        success: true,
        message: "Withdrawal request submitted!",
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return catchError(err);
  }
}
