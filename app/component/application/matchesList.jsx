"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Countdown from "@/app/component/countdown";
import { useSearchParams } from "next/navigation";

const PlayMatch = () => {
  const searchParams = useSearchParams();
  const matchType = searchParams.get("type"); // get type from URL

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!matchType) return;

    const fetchMatches = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/matches?type=${encodeURIComponent(matchType)}`
        );

        if (!res.ok) throw new Error("No Matches found!");

        const data = await res.json();
        const filtered = (data.data || []).filter(
          (m) => m.matchType === matchType
        );
        setMatches(filtered);
      } catch (err) {
        console.error("Error fetching matches:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [matchType]);

  const formatDate = (date) => {
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
  };

  // Full-page loader
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Full-page error display
  if (error || !matchType) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white p-4">
        <h1 className="text-3xl font-extrabold mb-4 text-center">
          {error ? error : "Something went wrong!"}
        </h1>
      </div>
    );
  }

  // Full-page no matches display
  if (!matches.length) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-800 text-white p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">
          No Matches Found
        </h1>
        <p className="text-lg text-center">
          Sorry, there are no matches available for <strong>{matchType}</strong>
          .
        </p>
      </div>
    );
  }

  // Normal match display
  return (
    <div className="space-y-4 bg-gray-400 min-h-screen p-4 sm:flex sm:flex-col gap-4">
      <h1 className="text-center text-2xl font-bold mb-6">{matchType}</h1>

      {matches.map((match) => (
        <Card
          key={match._id}
          className="bg-gray-800 text-white border border-gray-700 sm:w-full"
        >
          <CardHeader>
            <div className="flex gap-4 justify-start">
              <div className="w-16 h-16 rounded-full overflow-hidden relative">
                <Image
                  src="https://res.cloudinary.com/dnvlk6ubg/image/upload/v1761068487/free-match_k9jszq.jpg"
                  alt={match.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardTitle className="flex flex-col justify-center gap-1">
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

            <div className="flex justify-between text-gray-300 mt-2">
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
                  width: `${
                    match.totalSpots
                      ? (match.joined / match.totalSpots) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
            <p className="text-sm text-gray-400">
              Only {match.totalSpots - match.joined} spots left ({match.joined}/
              {match.totalSpots})
            </p>

            <div className="flex justify-between mt-2">
              <Button variant="outline" className="border-gray-600 text-black">
                Room Details
              </Button>
              <Button variant="outline" className="border-gray-600 text-black">
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
  );
};

export default PlayMatch;
