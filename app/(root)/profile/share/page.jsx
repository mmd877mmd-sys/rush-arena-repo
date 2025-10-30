"use client";

import { appLink } from "@/config";
import { useState } from "react";

export default function SharePage() {
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Check out this App!",
          text: "Hey! I found this awesome app, check it out:",
          url: appLink, // replace with your app URL
        });
        setShareSuccess(true);
      } else {
        // fallback: copy link to clipboard
        await navigator.clipboard.writeText({ appLink });
        setShareSuccess(true);
      }

      setTimeout(() => setShareSuccess(false), 2000); // hide message after 2s
    } catch (error) {
      console.error("Share failed:", error);
    }
  };
  const valueToCopy = appLink;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(valueToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };
  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-center p-4">
      <div className="bg-gray-900 text-white rounded-2xl shadow-lg w-full max-w-md p-6 space-y-6">
        {/* Header */}
        <h2 className="text-lg font-bold text-center">Share This App</h2>

        {/* Description */}
        <p className="text-gray-400 text-center">
          Invite your friends to use this app and enjoy together!
        </p>
        <div className="flex items-center w-full max-w-md bg-gray-800 rounded-lg p-2 space-x-2">
          {/* Value Display */}
          <span className="flex-1 text-gray-200 truncate px-3 py-2 bg-gray-700 rounded-lg">
            {valueToCopy}
          </span>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        {/* Share Button */}
        <button
          onClick={handleShare}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
        >
          Share Now
        </button>

        {/* Success Toast */}
        {shareSuccess && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-xl shadow-lg z-50">
            Link copied or shared successfully!
          </div>
        )}
      </div>
    </div>
  );
}
