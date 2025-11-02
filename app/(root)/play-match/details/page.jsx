"use client";

import { showToast } from "@/app/component/application/tostify";
import React, { useEffect, useState } from "react";

const dummyData = {
  entryType: "Solo Time",
  platform: "Mobile",
  map: "barmuda",
  positions: [
    { emoji: "👑", label: "Winner", amount: 50 },
    { emoji: "🥈", label: "2nd Position", amount: 40 },
    { emoji: "🥉", label: "3rd Position", amount: 30 },
    { emoji: "🏅", label: "4th Position", amount: 20 },
    { emoji: "🎖️", label: "5th Position", amount: 10 },
  ],
  perKill: 5,
  totalPrize: 405,
  allPrize: true,
  roomId: "123-456-789",
  password: "RUSH2024",
};

export default function PrizePopup({ matchId, popUpType, onClose }) {
  const [loading, setLoading] = useState(true);
  const [prizeData, setPrizeData] = useState(null);

  // Change this dynamically from API
  const roomIds = false;

  useEffect(() => {
    async function fetchPrizeData() {
      try {
        setPrizeData(dummyData);
      } catch (error) {
        console.error("Error fetching prize data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPrizeData();
  }, [matchId]);

  const copyToClipboard = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      showToast("success", "Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  if (!prizeData) return null;

  return (
    <div
      className="fixed inset-0 mb-20 bg-black/30 backdrop-blur-sm flex items-end justify-center z-50"
      onClick={onClose}
    >
      <div
        className="w-full sm:w-[400px] p-5 mb-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-gray-900 text-gray-100 rounded-t-3xl shadow-lg border border-gray-700 animate-fadeInUp">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-9 right-1/2 translate-x-1/2 bg-gray-800 hover:bg-gray-700 rounded-full p-3 shadow-md z-50"
          >
            ✖
          </button>

          {/* Header */}
          <div className="text-center">
            <div className="bg-yellow-500 text-black rounded-t-xl py-2 font-bold">
              {popUpType === "room" ? "Room Details" : "TOTAL WIN PRIZE"}
            </div>
            <p className="mt-2 text-sm text-gray-400">
              {prizeData.mode || prizeData.entryType} | {prizeData.platform} |{" "}
              {prizeData.type || prizeData.entryType}
            </p>
          </div>

          {/* Content */}
          {loading ? (
            <p className="text-center text-gray-400 mt-4">Loading...</p>
          ) : (
            <div className="mt-4 space-y-2 pb-8 text-center text-sm">
              {popUpType === "room" && (
                <>
                  {!roomIds ? (
                    <p className="font-bold my-4 text-yellow-400">
                      ম্যাচ শুরু হওয়ার ৫-১০ মিনিট আগে Room Id শেয়ার করা হবে।
                    </p>
                  ) : (
                    <>
                      <div className="flex justify-center items-center gap-2 my-2">
                        <p>🔥 Room ID: {prizeData.roomId}</p>
                        <button
                          onClick={() => copyToClipboard(prizeData.roomId)}
                          className="bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                        >
                          Copy
                        </button>
                      </div>
                      <div className="flex justify-center items-center gap-2 my-2">
                        <p>🔑 Password: {prizeData.password}</p>
                        <button
                          onClick={() => copyToClipboard(prizeData.password)}
                          className="bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                        >
                          Copy
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}

              {popUpType === "prize" && (
                <>
                  {prizeData.allPrize &&
                    prizeData.positions.map((pos, i) => (
                      <p key={i}>
                        {pos.emoji} {pos.label} - {pos.amount} Taka
                      </p>
                    ))}
                  <p>🔥 Per Kill: {prizeData.perKill} Taka</p>
                  <p className="font-bold my-4 text-yellow-400">
                    🏆 Total Prize Pool: {prizeData.totalPrize} Taka
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
