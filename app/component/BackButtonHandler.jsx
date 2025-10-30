"use client";

import { useEffect, useRef, useState } from "react";
import { App } from "@capacitor/app";
import { useRouter } from "next/navigation";

export default function BackButtonHandler() {
  const [backPressedOnce, setBackPressedOnce] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const timeoutRef = useRef(null);
  const router = useRouter();

  // Custom back paths (optional overrides)
  const customBackPaths = {
    "/profile/my-profile": "/profile",
    "/matches/detail": "/matches", // example
  };

  useEffect(() => {
    const listener = App.addListener("backButton", () => {
      const pathname = window.location.pathname;

      // Check for custom override
      if (customBackPaths[pathname]) {
        router.push(customBackPaths[pathname]);
        return;
      }

      // If browser history exists, go back
      if (window.history.length > 1) {
        window.history.back();
        return;
      }

      // If on home page, press again to exit
      const isHomePage = pathname === "/";
      if (isHomePage) {
        if (backPressedOnce) {
          App.exitApp();
        } else {
          setBackPressedOnce(true);
          setShowToast(true);

          timeoutRef.current = setTimeout(() => {
            setBackPressedOnce(false);
            setShowToast(false);
          }, 2000);
        }
      } else {
        // fallback: go to home page if no history
        router.push("/");
      }
    });

    return () => {
      listener.remove();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [backPressedOnce, router]);

  return (
    <>
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-xl shadow-lg z-50 transition-opacity duration-300">
          Press back again to exit
        </div>
      )}
    </>
  );
}
