import {
  howtoaddtaka,
  howtogetroomid,
  howtojoin,
  howtojoinmatch,
} from "@/config";

export default function CashBalanceCard() {
  return (
    <div className="min-h-screen bg-gray-950 flex mt-18 p-4">
      <div className="bg-gray-900 text-white rounded-2xl shadow-lg w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-bold">TOTAL CASH BALANCE</h2>
          <button className="text-blue-400 text-sm hover:underline">
            View Transaction History
          </button>
        </div>

        {/* Balances */}
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-3xl font-extrabold">৳0</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">🏆 WINNING CASH BALANCE</p>
              <p className="text-xl font-bold">৳0</p>
            </div>
            <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white font-medium">
              WITHDRAW
            </button>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">🏦 DEPOSIT CASH</p>
              <p className="text-xl font-bold">৳0</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium">
              + ADD MORE
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-gray-800 border-t border-gray-700 p-4 space-y-3">
          {/* Item 1 */}
          <div className="flex py-6 justify-between items-center">
            <div>
              <p className="text-red-400 font-semibold">🔴 HOW TO ADD MONEY?</p>
              <p className="text-sm text-gray-200">কিভাবে টাকা অ্যাড করবেন</p>
            </div>
            <a
              href={howtoaddtaka}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm"
            >
              ভিডিওটি দেখুন
            </a>
          </div>

          {/* Item 2 */}
          <div className="flex py-6  justify-between items-center">
            <div>
              <p className="text-red-400 font-semibold">
                🔴 HOW TO COLLECT ROOM ID?
              </p>
              <p className="text-sm text-gray-200">কিভাবে রুম আইডি পাবেন</p>
            </div>
            <a
              href={howtogetroomid}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm"
            >
              ভিডিওটি দেখুন
            </a>
          </div>

          {/* Item 3 */}
          <div className="flex py-6  justify-between items-center">
            <div>
              <p className="text-red-400 font-semibold">
                🔴 HOW TO JOIN IN A MATCH?
              </p>
              <p className="text-sm text-gray-200">কিভাবে ম্যাচে জয়েন করবেন</p>
            </div>
            <a
              href={howtojoinmatch}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm"
            >
              ভিডিওটি দেখুন
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
