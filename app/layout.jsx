import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import BackButtonHandler from "./component/BackButtonHandler";
import InternetChecker from "./component/InternetChecker";
import ProtectedRoute from "./component/protectedRoute";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rush Arena - Play & Win",
  description: "Play and win exciting matches on Rush Arena. Join now!",
  icons: {
    icon: "/images/logo.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="w-full m-auto md:w-2/3 lg:w-1/3 ">
          <BackButtonHandler />

          <InternetChecker>
            <ProtectedRoute>{children}</ProtectedRoute>
          </InternetChecker>

          <ToastContainer />
        </div>
      </body>
    </html>
  );
}
