"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function useRemoteConfig() {
  const [config, setConfig] = useState({
    matchTypes: {},
    pages: {},
    videos: {},
    support: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_WEB_URL}/config.json`
        );
        setConfig(res.data);
      } catch (err) {
        console.error("Failed to fetch config:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchConfig();
  }, []);

  return { config, loading };
}
