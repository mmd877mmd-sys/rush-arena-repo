"use client";

import { useState } from "react";

export default function WithdrawPage() {
  const [method, setMethod] = useState("Bkash");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);

  // Separate error states
  const [phoneError, setPhoneError] = useState("");
  const [amountError, setAmountError] = useState("");

  const balance = 1000; // Example user balance

  const paymentOptions = [
    { name: "Bkash", img: "/images/assets/bkash.jpg" },
    { name: "Nagad", img: "/images/assets/nagad.jpg" },
  ];

  // Phone validation
  const validatePhone = (phone) => /^01[3-9]\d{8}$/.test(phone);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setReceiverPhone(value);

    if (!value) {
      setPhoneError("");
    } else if (!validatePhone(value)) {
      setPhoneError("Invalid phone number!");
    } else if (amount && parseFloat(amount) > balance) {
      setPhoneError(""); // keep phone valid even if balance insufficient
    } else {
      setPhoneError("");
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);

    if (!value) {
      setAmountError("");
    } else if (parseFloat(value) < 105) {
      setAmountError("Minimum withdrawal amount is 105!");
    } else if (parseFloat(value) > balance) {
      setAmountError("Insufficient balance!");
    } else {
      setAmountError("");
    }

    // Revalidate phone error if needed
    if (receiverPhone && !validatePhone(receiverPhone)) {
      setPhoneError("Invalid phone number!");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (!validatePhone(receiverPhone)) {
      setPhoneError("Invalid phone number!");
      valid = false;
    }

    if (!amount || parseFloat(amount) < 105 || parseFloat(amount) > balance) {
      setAmountError(
        parseFloat(amount) < 105
          ? "Minimum withdrawal amount is 105!"
          : "Insufficient balance!"
      );
      valid = false;
    }

    if (!valid) return;

    console.log({ method, receiverPhone, amount });
    setSuccess(true);

    setTimeout(() => setSuccess(false), 2000);

    // Clear form
    setReceiverPhone("");
    setAmount("");
    setPhoneError("");
    setAmountError("");
  };

  const isSubmitDisabled =
    !receiverPhone || !amount || !!phoneError || !!amountError;

  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-start p-4 pt-12">
      <div className="bg-gray-900 text-white rounded-2xl shadow-lg w-full max-w-md p-6 space-y-6">
        <h2 className="text-lg font-bold text-center">Withdraw</h2>

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
              placeholder="105-25,000"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              required
            />
            {amountError && (
              <p className="text-red-500 text-sm font-medium mt-1">
                {amountError}
              </p>
            )}
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
            {phoneError && (
              <p className="text-red-500 text-sm font-medium mt-1">
                {phoneError}
              </p>
            )}
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
