"use client";

import { useEffect, useState } from "react";
import { initPush, onToken } from "../component/push";
import { showToast } from "./application/tostify";
import axios from "axios";

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
      const res = await axios.post("/api/save-token", { token: t });

      if (!res.data?.success) {
        showToast("error", "Failed to save token to server!");
      }
    } catch (err) {
      console.error("Error saving token:", err);
      showToast("error", "Failed to save token to server!");
    }
  };

  return null; // no UI needed here
}
