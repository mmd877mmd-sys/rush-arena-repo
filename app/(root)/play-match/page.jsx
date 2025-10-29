"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import axios from "axios";
import { showToast } from "@/app/component/application/tostify";
import Countdown from "@/app/component/countdown";
import FooterNav from "@/app/component/application/footer";
import { useSearchParams } from "next/navigation";

const MatchCards = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const matchType = searchParams.get("type");

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/api/matches?type=${matchType}`);
        setMatches(response.data.data || []);
        console.log(response.data.data);
      } catch (err) {
        // Axios error handling
        if (err.response) {
          if (err.response.status === 404) {
            showToast("info", "No matches found");
            setMatches([]);
          } else {
            showToast("error", err.response.data?.message || "Server error");
          }
        } else if (err.request) {
          showToast("error", "No response from server. Please try again.");
        } else {
          showToast("error", "Error: " + err.message);
        }

        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (matchType) {
      fetchMatches();
    }
  }, [matchType]);

  if (loading) return <p>Loading matches...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!matches.length) return <p>No matches available</p>;

  function formetDate(date) {
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
    <>
      <div className="space-y-4 bg-gray-400 min-h-screen my-16 p-4 sm:flex gap-2">
        {matches.map((match, idx) => (
          <Card
            key={idx}
            className="bg-gray-800 text-white border border-gray-700 h-fit sm:w-full"
          >
            <CardHeader>
              <div className="flex gap-4 justify-start">
                <div className="w-15 h-15 rounded-full overflow-hidden relative">
                  <Image
                    src="https://res.cloudinary.com/dnvlk6ubg/image/upload/v1761068487/free-match_k9jszq.jpg"
                    alt={match.title}
                    fill
                    className="object-fill "
                  />
                </div>

                <CardTitle className="flex flex-col justify-center gap-3">
                  {" "}
                  <strong>{match.title} </strong>{" "}
                  <p className="text-sm text-gray-300">
                    {formetDate(match.startTime)}
                  </p>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-around ">
                <div className="text-green-500 font-bold flex flex-col items-center justify-center">
                  <strong> + WIN PRIZE</strong> <span>{match.winPrize} TK</span>
                </div>
                <div className="text-blue-500 font-bold flex flex-col items-center justify-center">
                  <strong> + PER KILL</strong> <span>{match.perKill} TK</span>
                </div>
                <div className="text-red-500 font-bold flex flex-col items-center justify-center">
                  <strong> + ENTRY FEE</strong> <span>{match.entryFee} TK</span>
                </div>
              </div>

              <div className="flex justify-between text-gray-300">
                <div className="flex flex-col items-center justify-center w-full">
                  {" "}
                  <strong>ENTRY TYPE </strong> <span>{match.entryType} </span>
                </div>
                <div className="flex flex-col items-center justify-center border-x-4  border-amber-600 w-full">
                  {" "}
                  <strong>MAP </strong> <span>{match.map} </span>
                </div>
                <div className="flex flex-col items-center justify-center   w-full">
                  {" "}
                  <strong> VERSION </strong> <span>{match.version} </span>
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
                Only {match.spotsLeft} spots are left ({match.joined}/
                {match.totalSpots})
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
      <FooterNav />
    </>
  );
};

export default MatchCards;
