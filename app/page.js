"use client";
import Navbar from "./component/application/menubar";
import FooterNav from "./component/application/footer";
import BannerSlider from "./component/application/banner";
import MatchCards from "./component/application/match-card";
import MarqueeText from "./component/application/marqueeText";
import PopupNotice from "./component/application/PopupNotice";
import { PushNotifications } from "@capacitor/push-notifications";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const initPushNotifications = async () => {
      try {
        // 1️⃣ Request permission
        const permission = await PushNotifications.requestPermissions();
        if (permission.receive !== "granted") {
          console.log("Push notifications permission denied ❌");
          return;
        }

        // 2️⃣ Register device with FCM
        await PushNotifications.register();

        // 3️⃣ Listen for registration to get FCM token
        PushNotifications.addListener("registration", (token) => {
          console.log("Device token:", token.value);

          // 4️⃣ Subscribe to 'all_users' topic
          fetch(
            `https://iid.googleapis.com/iid/v1/${token.value}/rel/topics/all_users`,
            {
              method: "POST",
              headers: {
                Authorization: process.env.FIREBASE_Authorization,
              },
            }
          )
            .then(() => console.log("Subscribed to topic: all_users ✅"))
            .catch((err) => console.error("Topic subscription error:", err));
        });

        // 5️⃣ Handle registration errors
        PushNotifications.addListener("registrationError", (err) => {
          console.error("Push registration error:", err);
        });

        // 6️⃣ Foreground notification received
        PushNotifications.addListener(
          "pushNotificationReceived",
          (notification) => {
            console.log("Notification received (foreground):", notification);
            alert(`Notification: ${notification.title} - ${notification.body}`);
          }
        );

        // 7️⃣ Notification tapped (background)
        PushNotifications.addListener(
          "pushNotificationActionPerformed",
          (notification) => {
            console.log("User tapped notification:", notification);
            alert(`Opened notification: ${notification.notification?.title}`);
          }
        );
      } catch (error) {
        console.error("Push notification init error:", error);
      }
    };

    initPushNotifications();
  }, []);
  return (
    <div className="w-full font-sans min-h-screen flex flex-col items-center ">
      <Navbar />
      <main className="w-full flex flex-col gap-6 items-center sm:items-center my-24   ">
        <PopupNotice />
        <MarqueeText />

        <BannerSlider />
        <MatchCards />
      </main>
      <FooterNav />
    </div>
  );
}
