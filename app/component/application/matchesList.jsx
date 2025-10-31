"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Countdown from "@/app/component/countdown";

const PlayMatch = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const matchType = "BR Match";

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://rush-arena-repo.vercel.app/api/matches?type=${encodeURIComponent(
            matchType
          )}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch matches");
        }

        const data = await res.json();
        setMatches(data.data || []);
      } catch (err) {
        console.error("Error fetching matches:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [matchType]);

  if (loading) return <p>Loading matches...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!matches.length) return <p>No matches available</p>;

  function formatDate(date) {
    return new Date(date).toLocaleString("en-US", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  return (
    <Suspense fallback={<p>Loading matches...</p>}>
      <div className="space-y-4 bg-gray-400 min-h-screen p-4 sm:flex gap-2">
        <h1 className="text-center text-2xl font-bold mb-6">{matchType}</h1>

        {matches.map((match, idx) => (
          <Card
            key={idx}
            className="bg-gray-800 text-white border h-1/3 border-gray-700 sm:w-full"
          >
            <CardHeader>
              <div className="flex gap-4 justify-start">
                <div className="w-15 h-15 rounded-full overflow-hidden relative">
                  <Image
                    src="https://res.cloudinary.com/dnvlk6ubg/image/upload/v1761068487/free-match_k9jszq.jpg"
                    alt={match.title}
                    fill
                    className="object-fill"
                  />
                </div>

                <CardTitle className="flex flex-col justify-center gap-3">
                  <strong>{match.title}</strong>
                  <p className="text-sm text-gray-300">
                    {formatDate(match.startTime)}
                  </p>
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex justify-around">
                <div className="text-green-500 whitespace-nowrap font-bold flex flex-col items-center justify-center">
                  <strong>+ WIN PRIZE</strong>
                  <span>{match.winPrize} TK</span>
                </div>
                <div className="text-blue-500 whitespace-nowrap font-bold flex flex-col items-center justify-center">
                  <strong>+ PER KILL</strong>
                  <span>{match.perKill} TK</span>
                </div>
                <div className="text-red-500 font-bold flex flex-col items-center whitespace-nowrap justify-center">
                  <strong>ENTRY FEE</strong>
                  <span>{match.entryFee} TK</span>
                </div>
              </div>

              <div className="flex justify-between text-gray-300">
                <div className="flex flex-col items-center whitespace-nowrap justify-center w-full">
                  <strong>ENTRY TYPE</strong>
                  <span>{match.entryType}</span>
                </div>
                <div className="flex flex-col items-center justify-center border-x-4 border-amber-600 w-full">
                  <strong>MAP</strong>
                  <span>{match.map}</span>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                  <strong>VERSION</strong>
                  <span>MOBILE</span>
                </div>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-3 mt-2 overflow-hidden">
                <div
                  className="bg-green-500 h-3"
                  style={{
                    width: `${(match.joined / match.totalSpots) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-sm text-gray-400">
                Only {match.totalSpots - match.joined} spots left (
                {match.joined}/{match.totalSpots})
              </p>

              <div className="flex justify-between mt-2">
                <Button
                  variant="outline"
                  className="border-gray-600 text-black"
                >
                  Room Details
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-black"
                >
                  Total Prize Details
                </Button>
              </div>

              <div className="mt-2 p-2 bg-green-600 rounded text-center font-bold">
                <Countdown targetDate={match.startTime} />
              </div>

              <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700">
                Join
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Suspense>
  );
};

export default PlayMatch;
