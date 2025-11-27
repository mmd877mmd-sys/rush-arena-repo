"use client";

import { useEffect } from "react";
import FooterNav from "../component/application/footer";
import Navbar from "../component/application/menubar";
import AppInit from "./push";

export default function UserLayout({ children }) {
  return (
    <>
      <AppInit />
      <Navbar />
      <div className="my-18">{children}</div>
      <FooterNav />
    </>
  );
}
