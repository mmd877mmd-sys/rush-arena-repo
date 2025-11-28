"use client";

import { useEffect, useState } from "react";
import { initPush, onToken } from "../component/push";
import { showToast } from "./application/tostify";
import axios from "axios";
import { Preferences } from "@capacitor/preferences";
// import TokenDisplay from "./TokenDisplay";

export default function AppInit() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Initialize push notifications
    initPush();

    // Subscribe to token updates
    const unsubscribe = onToken((t) => {
      if (!t) {
        showToast("error", "Failed to get notification token!");
        return;
      }
      setToken(t);
      saveToken(t);
    });

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const saveToken = async (t) => {
    try {
      const res = await axios.post("/api/saveToken", { token: t });
      // // Set cookie
      await Preferences.set({
        key: "fcm_token",
        value: token,
      });
    } catch (err) {
      console.error("Error saving token:", err);
      showToast("error", "Failed to save token to server!");
    }
  };

  return null; // <TokenDisplay token={token} />;
}
