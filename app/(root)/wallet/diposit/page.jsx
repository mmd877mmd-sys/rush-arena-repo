"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { showToast } from "@/app/component/application/tostify";
import { Preferences } from "@capacitor/preferences";
import { appLink, paymentNumber } from "@/config";
import ButtonLoading from "@/app/component/buttonLoading";

// Zod Schema
const depositSchema = z.object({
  method: z.enum(["Bkash", "Nagad"]),
  phone: z.string().regex(/^01[3-9]\d{8}$/, "Invalid phone number!"),
  trxId: z.string().min(4, "Enter a valid transaction ID!"),
});

export default function DepositPage() {
  const [method, setMethod] = useState("Bkash");
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [success, setSuccess] = useState(false);

  const paymentOptions = [
    { name: "Bkash", img: "/images/assets/bkash.jpg" },
    { name: "Nagad", img: "/images/assets/nagad.jpg" },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      method: "Bkash",
      phone: "",

      trxId: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const { value: userId } = await Preferences.get({ key: "access_token" });
      if (!userId) {
        showToast("error", "You are not logged in!");
        return;
      }

      setLoading(true);

      const res = await axios.post(`${appLink}/api/wallets/diposit`, {
        ...data,
        method,
        userId,
      });

      if (res.data.success) {
        showToast("success", "Deposit request sent successfully!");
        setSuccess(true);
        reset();
      } else {
        showToast("error", res.data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to process deposit request!");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(paymentNumber);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1500);
  };

  const watchFields = watch();
  const isSubmitDisabled =
    loading || !watchFields.phone || !watchFields.amount || !watchFields.trxId;

  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-start p-4 pt-12">
      <div className="bg-gray-900 text-white rounded-2xl shadow-lg w-full mb-6 max-w-md p-6 space-y-6">
        <h2 className="text-lg font-bold text-center">Deposit</h2>

        {/* Success Alert */}
        {success && (
          <div className="p-3 rounded-lg bg-green-600 text-center text-white font-medium">
            Deposit request sent successfully!
          </div>
        )}

        {/* Admin Deposit Info */}
        <div className="bg-gray-800 p-4 rounded-lg flex justify-center items-center">
          <p className="text-gray-300 text-lg font-semibold">{paymentNumber}</p>
          <button
            type="button"
            onClick={handleCopyNumber}
            className="ml-2 bg-gray-700 hover:bg-blue-500 px-3 py-1 rounded text-sm"
          >
            {copySuccess ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="text-gray-400 text-sm text-center mt-1">
          We only receive send money via this number.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Payment Method */}
          <div>
            <p className="text-gray-400 mb-2">Select Payment Method</p>
            <div className="flex space-x-4">
              {paymentOptions.map((option) => (
                <div
                  key={option.name}
                  onClick={() => setMethod(option.name)}
                  className={`flex-1 p-4 rounded-lg cursor-pointer border flex flex-col items-center transition duration-200 ${
                    method === option.name
                      ? "border-blue-500 bg-gray-800"
                      : "border-gray-700 bg-gray-900 hover:border-blue-400"
                  }`}
                >
                  <img
                    src={option.img}
                    alt={option.name}
                    className="w-full h-14 object-contain mb-2"
                  />
                  {method === option.name && (
                    <span className="text-blue-400 font-bold mt-1">✔</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-400 mb-1">Phone Number</label>
            <input
              type="text"
              placeholder="Enter your phone number"
              {...register("phone")}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm font-medium mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Transaction ID */}
          <div>
            <label className="block text-gray-400 mb-1">Transaction ID</label>
            <input
              type="text"
              placeholder="Enter your transaction ID"
              {...register("trxId")}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
            />
            {errors.trxId && (
              <p className="text-red-500 text-sm font-medium mt-1">
                {errors.trxId.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <ButtonLoading
            type="submit"
            loading={loading}
            text={loading ? "Processing..." : "Deposit"}
            disabled={isSubmitDisabled}
            className="w-full py-3 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition"
          />
        </form>
      </div>
    </div>
  );
}
