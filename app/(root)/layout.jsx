"use client";

import { useEffect } from "react";
import FooterNav from "../component/application/footer";
import Navbar from "../component/application/menubar";

import {
  requestNotificationPermission,
  listenForMessages,
} from "../lib/notifications";

export default function UserLayout({ children }) {
  useEffect(() => {
    // Ask permission and get token
    requestNotificationPermission().then((token) => {
      console.log("Device token saved in backend:", token);
      // Send token to your backend to store in DB
    });

    // Listen for foreground messages
    listenForMessages((payload) => {
      alert(
        `New notification: ${payload.notification.title} - ${payload.notification.body}`
      );
    });
  }, []);
  return (
    <>
      <Navbar />
      <div className="my-18">{children}</div>
      <FooterNav />
    </>
  );
}
