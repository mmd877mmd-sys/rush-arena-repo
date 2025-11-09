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
        // Retrieve the saved auth ID (token) from Preferences
        const { value } = await Preferences.get({ key: "access_token" });

        if (value) {
          // Register push notifications with the backend
          await registerPushNotifications(value);
        } else {
          console.log("No access_token found in Preferences");
        }
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
