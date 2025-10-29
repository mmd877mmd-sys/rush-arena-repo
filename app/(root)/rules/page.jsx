"use client";
import { useState, useRef, useEffect } from "react";

export default function RulesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef(null);

  const tabs = [
    "BR Match Rules",
    "Clash Squad Rules",
    "Live Rules",
    "Payment Rules",
    "Reward Rules",
    "Support Rules",
  ];

  const contents = [
    // --- BR Match Rules (example same as your image) ---
    <>
      <p className="text-red-400 mt-3">
        😡 রুম আইডি এবং পাসওয়ার্ড ম্যাচ টাইমের ০৫ থেকে ০৭ মিনিট আগে দেওয়া হবে।
        আপনি যদি না জানেন কিভাবে রুম এ জয়েন করতে হয় তাহলে আমাদের অ্যাপ থেকে
        ভিডিও দেখে নিতে পারেন।
      </p>
      <p className="text-red-400 mt-3">
        😡 রুম আইডি এবং পাসওয়ার্ড Unregistered কারো সাথে শেয়ার করবেন না।
      </p>
      <p className="text-red-400 mt-3">
        💯 কেউ যদি হ্যাক এবং টিমিং করার সময় ধরা পরে তাকে অ্যাপ থেকে ব্যান করে
        দেওয়া হবে এবং Full Map এ Heal Battle করলে কোন রিওয়ার্ড পাবেন না।
      </p>
      <p className="text-yellow-400 mt-3">
        👉 Duo এবং Squad এ আপনার টিমমেট না থাকলে তাহলে রুমে গিয়ে Random
        প্লেয়ারের সাথে খেলতে হবে। রুমের মধ্যে অন্য টিমকে বিরক্ত করলে রুম থেকে
        বের করে দেওয়া হবে এবং আপনার টাকা ফেরত দেওয়া হবে না।
      </p>
      <p className="text-yellow-400 mt-3">
        👉 প্রতিটি কিল এবং Booyah এর রিওয়ার্ড ম্যাচ শেষে ৩০ মিনিট এর মধ্যে
        দেওয়া হবে যদি কোন Server সমস্যা না থাকে।
      </p>
      <p className="text-blue-400 mt-3">
        ➡️ যেকোনো সময় টেলিগ্রাম এডমিনের সাথে যোগাযোগ করুন।
      </p>
      <p className="text-yellow-300 mt-3">
        ✨ “ADMIN” এর সিদ্ধান্তই চূড়ান্ত সিদ্ধান্ত।
      </p>
    </>,

    // --- Other tabs placeholder content ---
    <p className="text-gray-300 mt-3">⚙️ Clash Squad Rules content here...</p>,
    <p className="text-gray-300 mt-3">🎥 Live Rules content here...</p>,
    <p className="text-gray-300 mt-3">💰 Payment Rules content here...</p>,
    <p className="text-gray-300 mt-3">🏆 Reward Rules content here...</p>,
    <p className="text-gray-300 mt-3">📞 Support Rules content here...</p>,
  ];

  // Auto-center selected tab
  useEffect(() => {
    const container = scrollRef.current;
    const selected = container?.children[activeTab];
    if (container && selected) {
      const containerWidth = container.offsetWidth;
      const tabLeft = selected.offsetLeft;
      const tabWidth = selected.offsetWidth;
      const scrollLeft = tabLeft - (containerWidth / 2 - tabWidth / 2);
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white p-4">
      <h1 className="text-center text-2xl font-bold mb-4">All Rules</h1>

      {/* Tabs */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-2 mt-18 scrollbar-hide mb-6"
      >
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-200 ${
              activeTab === i
                ? "bg-yellow-400 text-black scale-105 shadow-lg"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-gray-900 p-4 rounded-2xl shadow-lg text-sm leading-relaxed">
        {contents[activeTab]}
      </div>
    </div>
  );
}
