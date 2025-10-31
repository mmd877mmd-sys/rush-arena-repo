"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";

export default function TransactionHistoryPage() {
  // Example transaction data with more dummy history
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "Deposit",
      method: "Bkash",
      amount: 500,
      phone: "01712345678",
      transectionId: "TRX12345",
      date: "2025-10-30 12:45",
      status: "Pending",
    },
    {
      id: 2,
      type: "Withdraw",
      method: "Nagad",
      amount: 200,
      phone: "01898765432",
      transectionId: "TRX12346",
      date: "2025-10-29 16:20",
      status: "Completed",
    },
    {
      id: 3,
      type: "Deposit",
      method: "Bkash",
      amount: 1000,
      phone: "01911223344",
      transectionId: "TRX12347",
      date: "2025-10-28 10:15",
      status: "Completed",
    },
    {
      id: 4,
      type: "Withdraw",
      method: "Bkash",
      amount: 300,
      phone: "01755555555",
      transectionId: "TRX12348",
      date: "2025-10-27 09:50",
      status: "Failed",
    },
    {
      id: 5,
      type: "Deposit",
      method: "Nagad",
      amount: 700,
      phone: "01811112222",
      transectionId: "TRX12349",
      date: "2025-10-26 14:30",
      status: "Completed",
    },
    {
      id: 6,
      type: "Withdraw",
      method: "Bkash",
      amount: 150,
      phone: "01933334444",
      transectionId: "TRX12350",
      date: "2025-10-25 11:20",
      status: "Pending",
    },
    {
      id: 7,
      type: "Deposit",
      method: "Bkash",
      amount: 1200,
      phone: "01766667777",
      transectionId: "TRX12351",
      date: "2025-10-24 08:10",
      status: "Completed",
    },
  ]);

  // Sort latest first
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Function to get card bg color based on status
  const getStatusBgColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-700";
      case "Pending":
        return "bg-yellow-700";
      case "Failed":
        return "bg-red-700";
      default:
        return "bg-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-4 pt-12 my-18 flex justify-center">
      <div className="bg-gray-900 text-white w-full max-w-3xl rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-lg font-bold text-center mb-4">
          Transaction History
        </h2>

        {sortedTransactions.length === 0 ? (
          <p className="text-gray-400 text-center">No transactions found.</p>
        ) : (
          <div className="space-y-4">
            {sortedTransactions.map((txn, index) => (
              <div
                key={index}
                className={`rounded-lg p-4 flex justify-between md:flex-row md:items-center ${getStatusBgColor(
                  txn.status
                )}`}
              >
                <div className="flex flex-col space-y-1">
                  <span className="font-semibold">
                    {txn.type} - {txn.method}
                  </span>
                  <span className="text-gray-200 text-sm">
                    Phone: {txn.phone}
                  </span>
                  {txn.transectionId && (
                    <span className="text-gray-200 text-sm">
                      Transaction ID: {txn.transectionId}
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-end mt-2 md:mt-0">
                  <span
                    className={`font-bold ${
                      txn.type === "Deposit" ? "text-green-300" : "text-red-300"
                    }`}
                  >
                    {txn.type === "Deposit" ? "+" : "-"}
                    {txn.amount} ৳
                  </span>
                  <span className="mt-1 text-xs font-medium px-2 py-1 rounded-full bg-white text-black">
                    {txn.status}
                  </span>
                  <span className="text-gray-200 text-sm mt-1">{txn.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
