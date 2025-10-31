"use client";

import { useEffect, useState } from "react";
import { Network } from "@capacitor/network";

export default function InternetChecker({ children }) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Check initial connection
    const checkStatus = async () => {
      try {
        const status = await Network.getStatus();
        setIsOnline(status.connected);
      } catch (err) {
        // Fallback for web
        setIsOnline(navigator.onLine);
      }
    };

    // Listen for connection changes
    const listener = Network.addListener("networkStatusChange", (status) => {
      setIsOnline(status.connected);
    });

    // Web fallback listeners
    const updateStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    checkStatus();

    return () => {
      listener.remove();
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-xl">
        <p>No Internet Connection</p>
        <p className="text-sm text-gray-400 mt-2">
          Please check your Wi-Fi or mobile data.
        </p>
      </div>
    );
  }

  return children;
}
