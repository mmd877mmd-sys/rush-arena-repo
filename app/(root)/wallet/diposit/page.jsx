"use client";

import { paymentNumber } from "@/config";
import { useState } from "react";

export default function DepositPage() {
  const [method, setMethod] = useState("Bkash");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [transectionId, setTransectionId] = useState("");
  const [success, setSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState("");

  const paymentOptions = [
    { name: "Bkash", img: "/images/assets/bkash.jpg" },
    { name: "Nagad", img: "/images/assets/nagad.jpg" },
  ];

  const validatePhone = (phone) => /^01[3-9]\d{8}$/.test(phone);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);

    if (!value) {
      setError("");
    } else if (!validatePhone(value)) {
      setError("Invalid phone number!");
    } else {
      setError("");
    }
  };

  const handleTransectionChange = (e) => setTransectionId(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePhone(phone)) {
      setError("Invalid phone number!");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError("Enter a valid amount!");
      return;
    }
    if (!transectionId) {
      setError("Enter transaction ID!");
      return;
    }

    console.log({ method, phone, amount, transectionId });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);

    // Clear form
    setPhone("");
    setAmount("");
    setTransectionId("");
    setError("");
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(paymentNumber);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1500);
  };

  const isSubmitDisabled = !!error || !phone || !amount || !transectionId;

  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-start p-4 pt-12">
      <div className="bg-gray-900 text-white rounded-2xl shadow-lg w-full max-w-md p-6 space-y-6">
        <h2 className="text-lg font-bold text-center">Deposit</h2>

        {/* Admin Deposit Info */}
        <div className="bg-gray-800 p-4 rounded-lg flex justify-center items-center">
          <p className="text-gray-300 text-lg font-semibold">{paymentNumber}</p>
          <button
            type="button"
            onClick={handleCopyNumber}
            className="ml-2 bg-gray-700 hover:bg-blue-400 px-3 py-1 rounded text-sm"
          >
            {copySuccess ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="text-gray-400 text-sm text-center mt-1">
          We only receive send money via this number.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Payment Method */}
          <div>
            <p className="text-gray-400 mb-2">Select Payment Method</p>
            <div className="flex space-x-4">
              {paymentOptions.map((option) => (
                <div
                  key={option.name}
                  onClick={() => setMethod(option.name)}
                  className={`flex-1 p-4 rounded-lg cursor-pointer border flex flex-col items-center transition
                    ${
                      method === option.name
                        ? "border-blue-500"
                        : "border-gray-700 bg-gray-800"
                    }`}
                >
                  <img
                    src={option.img}
                    alt={option.name}
                    className="w-full h-full object-contain mb-2"
                  />
                  {method === option.name && (
                    <span className="text-white font-bold mt-1">✔</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div>
            <p className="text-gray-400 mb-1">Amount</p>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="100"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-400 mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Enter your phone number"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              required
            />
            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}
          </div>

          {/* Transaction ID */}
          <div>
            <label className="block text-gray-400 mb-1">Transaction ID</label>
            <input
              type="text"
              value={transectionId}
              onChange={handleTransectionChange}
              placeholder="Enter your transaction ID"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-medium transition ${
              isSubmitDisabled
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Deposit
          </button>
        </form>

        {/* Success Toast */}
        {success && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-xl shadow-lg z-50">
            Deposit request submitted!
          </div>
        )}
      </div>
    </div>
  );
}
