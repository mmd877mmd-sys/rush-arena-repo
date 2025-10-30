const matches = [
  {
    id: 1,
    title: "BR Match - Bermuda",
    time: "28 Oct 2025, 10:30 PM",
    kills: 6,
    win: "Yes",
  },
  {
    id: 2,
    title: "Clash Squad - Kalahari",
    time: "27 Oct 2025, 09:00 PM",
    kills: 3,
    win: "No",
  },
  {
    id: 3,
    title: "Solo Match - Alpine",
    time: "25 Oct 2025, 08:15 PM",
    kills: 8,
    win: "Yes",
  },
  {
    id: 1,
    title: "BR Match - Bermuda",
    time: "28 Oct 2025, 10:30 PM",
    kills: 6,
    win: "Yes",
  },
  {
    id: 2,
    title: "Clash Squad - Kalahari",
    time: "27 Oct 2025, 09:00 PM",
    kills: 3,
    win: "No",
  },
  {
    id: 3,
    title: "Solo Match - Alpine",
    time: "25 Oct 2025, 08:15 PM",
    kills: 8,
    win: "Yes",
  },
  {
    id: 1,
    title: "BR Match - Bermuda",
    time: "28 Oct 2025, 10:30 PM",
    kills: 6,
    win: "Yes",
  },
  {
    id: 2,
    title: "Clash Squad - Kalahari",
    time: "27 Oct 2025, 09:00 PM",
    kills: 3,
    win: "No",
  },
  {
    id: 3,
    title: "Solo Match - Alpine",
    time: "25 Oct 2025, 08:15 PM",
    kills: 8,
    win: "Yes",
  },
];

export default function MyMatches() {
  return (
    <div className="min-h-screen  bg-[#0a0a1a] my-20 text-white p-4">
      <h1 className="text-center text-2xl font-bold  mb-6">My Matches</h1>

      <div className="space-y-3">
        {matches.map((match, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-2xl border shadow-md p-4 flex justify-between items-center hover:bg-gray-800 transition-all"
          >
            {/* Left section: title + time */}
            <div className="w-fit">
              <h2 className="text-base font-semibold">{match.title}</h2>
              <p className="text-sm text-gray-400 mt-1">{match.time}</p>
            </div>

            {/* Right section: My Kills + My Win */}
            <div className="flex  items-center justify-around text-center gap-6 w-fit ">
              <div className="  flex flex-col items-center justify-center ">
                <strong className="text-yellow-400 font-semibold">
                  My Kills
                </strong>
                <span>{match.kills}</span>
              </div>
              <div className="flex flex-col items-center justify-center ">
                <strong className="text-gray-200 font-semibold">My Win</strong>
                <span>{match.kills}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
