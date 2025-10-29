"use client";

import React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { admin_add_tournament } from "@/routes/websiteRoute";
import { Home, FilePlus, Settings2, HelpCircle } from "lucide-react";

// Menu Data
const menuData = [
  { label: "Add Tournament", link: admin_add_tournament, icon: FilePlus },
  { label: "Create New Match", link: "/admin/add-match", icon: Home },
  {
    label: "Services",
    icon: Settings2,
    subMenu: [
      { label: "Web Design", link: "/services/web-design", icon: Home },
      { label: "SEO", link: "/services/seo", icon: Home },
    ],
  },
  { label: "Portfolio", link: "/portfolio", icon: Home },
  { label: "Blog", link: "/blog", icon: Home },
  {
    label: "Support",
    icon: HelpCircle,
    subMenu: [
      { label: "FAQ", link: "/faq", icon: HelpCircle },
      { label: "Contact", link: "/contact", icon: HelpCircle },
    ],
  },
];

export default function FullScreenMobileMenu() {
  return (
    <div className="h-screen w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-y-auto px-4 py-6 ">
      {/* Header / Logo */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My App</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Navigation</p>
      </div>

      {/* Menu */}
      <nav className="space-y-3">
        {menuData.map((item, idx) =>
          item.subMenu ? (
            <Accordion key={idx} type="single" collapsible>
              <AccordionItem value={item.label}>
                <AccordionTrigger className="flex items-center justify-between w-full px-4 py-3 text-base font-medium bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                  <div className="flex items-center gap-3">
                    {item.icon && <item.icon className="w-5 h-5" />}
                    <span>{item.label}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-10 space-y-2 pt-2">
                  {item.subMenu.map((sub, sidx) => (
                    <Link
                      key={sidx}
                      href={sub.link}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition"
                    >
                      {sub.icon && <sub.icon className="w-4 h-4" />}
                      <span>{sub.label}</span>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <Link
              key={idx}
              href={item.link}
              className="flex items-center gap-3 px-4 py-3 text-base font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
            >
              {item.icon && <item.icon className="w-5 h-5" />}
              <span>{item.label}</span>
            </Link>
          )
        )}
      </nav>
    </div>
  );
}
