"use client";

import { useEffect, useState } from "react";
import { Preferences } from "@capacitor/preferences";
import { appLink } from "@/config";

export default function TransactionHistoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError("");

        // Get token (userId) from Capacitor Preferences
        const { value: userId } = await Preferences.get({
          key: "access_token",
        });

        if (!userId) {
          setError("You are not logged in!");
          setLoading(false);
          return;
        }

        const res = await fetch(
          `${appLink}/api/wallets/transections?userId=${userId}`
        );
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch transactions");
        }

        setTransactions(data.transactions || []);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <>
      {/* Loading State */}
      {loading && (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      <div className="min-h-screen bg-gray-950 p-4 pt-12 flex justify-center">
        <div className="bg-gray-900 text-white w-full max-w-3xl rounded-2xl shadow-lg p-6 space-y-6">
          <h2 className="text-lg font-bold text-center mb-4">
            Transaction History
          </h2>

          {/* Error State */}
          {!loading && error && (
            <div className="text-center text-red-400 py-8 font-medium">
              {error}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && sortedTransactions.length === 0 && (
            <p className="text-gray-400 text-center py-8">
              No transactions found.
            </p>
          )}

          {/* Transaction List */}
          {!loading && !error && sortedTransactions.length > 0 && (
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
                    {txn.id && (
                      <span className="text-gray-200 text-sm">
                        Transaction ID: {txn.id}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-end mt-2 md:mt-0">
                    <span
                      className={`font-bold ${
                        txn.type === "Deposit"
                          ? "text-green-300"
                          : "text-red-300"
                      }`}
                    >
                      {txn.type === "Deposit" ? "+" : "-"}
                      {txn.amount} ৳
                    </span>
                    <span className="mt-1 text-xs font-medium px-2 py-1 rounded-full bg-white text-black">
                      {txn.status}
                    </span>
                    <span className="text-gray-200 text-sm mt-1">
                      {new Date(txn.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>{" "}
    </>
  );
}
