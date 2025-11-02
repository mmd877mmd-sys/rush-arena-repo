"use client";
import FooterNav from "../component/application/footer";
import Navbar from "../component/application/menubar";

export default function UserLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="my-18 ">{children}</div>
      <FooterNav />
    </>
  );
}
