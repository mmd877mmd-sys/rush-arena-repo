"use client";

import { useState } from "react";

export default function WithdrawPage() {
  const [method, setMethod] = useState("Bkash");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const balance = 1000; // Example user balance

  const paymentOptions = [
    { name: "Bkash", img: "/images/assets/bkash.jpg" },
    { name: "Nagad", img: "/images/assets/nagad.jpg" },
  ];

  // Phone validation
  const validatePhone = (phone) => {
    const phoneRegex = /^01[3-9]\d{8}$/; // Only 11-digit numbers starting with 01
    return phoneRegex.test(phone);
  };

  // Handle phone input changes
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setReceiverPhone(value);

    if (value === "") {
      setError("");
    } else if (!validatePhone(value)) {
      setError("Invalid phone number!");
    } else if (amount && parseFloat(amount) > balance) {
      setError("Insufficient balance!");
    } else {
      setError("");
    }
  };

  // Handle amount changes
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);

    if (value && parseFloat(value) > balance) {
      setError("Insufficient balance!");
    } else if (receiverPhone && !validatePhone(receiverPhone)) {
      setError("Invalid phone number!");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (error) return;

    console.log({ method, receiverPhone, amount });
    setSuccess(true);

    setTimeout(() => setSuccess(false), 2000);

    // Clear form
    setReceiverPhone("");
    setAmount("");
  };

  const isSubmitDisabled =
    !receiverPhone || !amount || !!error || parseFloat(amount) > balance;

  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-start p-4 pt-12">
      <div className="bg-gray-900 text-white rounded-2xl shadow-lg w-full max-w-md p-6 space-y-6">
        {/* Header */}
        <h2 className="text-lg font-bold text-center">Withdraw</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Payment Method as selectable image boxes */}
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

          {/* Receiver Phone */}
          <div>
            <label className="block text-gray-400 mb-1">Receiver Number</label>
            <input
              type="text"
              value={receiverPhone}
              onChange={handlePhoneChange}
              placeholder="Enter receiver phone number"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`w-full py-3 rounded-lg font-medium transition ${
              isSubmitDisabled
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Withdraw
          </button>
        </form>

        {/* Success Toast */}
        {success && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-xl shadow-lg z-50">
            Withdrawal request submitted!
          </div>
        )}
      </div>
    </div>
  );
}
