"use client";

import { useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import BackButtonHandler from "./component/BackButtonHandler";
import InternetChecker from "./component/InternetChecker";
import ProtectedRoute from "./component/protectedRoute";
import { registerPushNotifications } from "@/utils/notificationSetup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rush Arena - Play & Win",
  description: "Play and win exciting matches on Rush Arena. Join now!",
  icons: {
    icon: "/images/logo.jpg",
  },
};

export default function RootLayout({ children }) {
  useEffect(() => {
    const initPush = async () => {
      try {
        console.log("🔔 Initializing global push notifications...");
        await registerPushNotifications();
      } catch (err) {
        console.error("❌ Error initializing notifications:", err);
      }
    };

    initPush();
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BackButtonHandler />

        <InternetChecker>
          <ProtectedRoute>{children}</ProtectedRoute>
        </InternetChecker>

        <ToastContainer />
      </body>
    </html>
  );
}
