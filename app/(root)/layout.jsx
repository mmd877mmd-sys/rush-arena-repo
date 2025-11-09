"use client";

import { useEffect } from "react";
import FooterNav from "../component/application/footer";
import Navbar from "../component/application/menubar";
import { registerPushNotifications } from "@/utils/notificationSetup";
import { Preferences } from "@capacitor/preferences";

export default function UserLayout({ children }) {
  useEffect(() => {
    const initPush = async () => {
      try {
        // Check if notifications are already registered
        const { value: isRegistered } = await Preferences.get({
          key: "push_registered",
        });

        if (isRegistered === "true") {
          console.log("Push notifications already registered");
          return;
        }

        // Register push notifications
        await registerPushNotifications();

        // Mark as registered so we don't register again
        await Preferences.set({ key: "push_registered", value: "true" });

        console.log("Push notifications initialized");
      } catch (err) {
        console.error("Error initializing notifications:", err);
      }
    };

    initPush();
  }, []);

  return (
    <>
      <Navbar />
      <div className="my-18">{children}</div>
      <FooterNav />
    </>
  );
}
