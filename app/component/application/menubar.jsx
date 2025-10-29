"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const BalanceAmount = 0;

  return (
    <nav className="fixed top-0 left-0 right-0 min-h-[38px] bg-[#0A0020] flex justify-between py-3 px-6 shadow-[0_-1px_10px_rgba(0,0,0,0.4)] z-99">
      {/* Left side: Logo and company name */}
      <div className="flex items-center space-x-2">
        <Image
          src="/images/logo.jpg"
          alt="Logo"
          width={52}
          height={52}
          className="rounded-full"
        />
        <h1 className="font-semibold text-lg text-white">Rush Arena</h1>
      </div>

      {/* Right side: Profile section */}
      <div className="flex items-center ">
        <Image
          src="/images/assets/wallet.jpg"
          alt=""
          width={56}
          height={56}
          className="rounded p-0 m-0 mr-[-10]"
        />
        <span className="font-medium text-white">৳ {BalanceAmount}</span>
      </div>
    </nav>
  );
}
