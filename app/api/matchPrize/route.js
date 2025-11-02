export async function GET() {
  const { searchParams } = new URL(request.url);
  const matchId = searchParams.get("matchId");

  const data = {
    matchId,
    mode: "Solo Time",
    platform: "Mobile",
    type: "Regular",
    positions: [
      { emoji: "👑", label: "Winner", amount: 50 },
      { emoji: "🥈", label: "2nd Position", amount: 40 },
      { emoji: "🥉", label: "3rd Position", amount: 30 },
      { emoji: "🏅", label: "4th Position", amount: 20 },
      { emoji: "🎖️", label: "5th Position", amount: 10 },
    ],
    perKill: 5,
    totalPrize: 405,
  };

  return Response.json(data);
}
