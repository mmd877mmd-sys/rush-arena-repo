"use client";

import { useEffect } from "react";
import FooterNav from "../component/application/footer";
import Navbar from "../component/application/menubar";
import {
  listenForMessages,
  registerForPushNotifications,
} from "@/lib/notifications";

export default function UserLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="my-18">{children}</div>
      <FooterNav />
    </>
  );
}
