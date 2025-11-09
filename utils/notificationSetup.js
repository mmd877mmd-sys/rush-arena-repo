"use client";

import { PushNotifications } from "@capacitor/push-notifications";
import axios from "axios";

export const registerPushNotifications = async () => {
  try {
    const permission = await PushNotifications.requestPermissions();
    if (permission.receive !== "granted") return;

    await PushNotifications.register();

    PushNotifications.addListener("registration", async (token) => {
      console.log("Push token:", token.value);

      // Optionally, send token to backend (to keep a list)
      await axios.post("/api/savePushToken", { token: token.value });

      // Or subscribe token to a topic for broadcast
      await axios.post("/api/subscribeTopic", {
        token: token.value,
        topic: "allUsers",
      });
    });

    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification) => {
        console.log("Notification received:", notification);
      }
    );

    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (notification) => {
        console.log("Notification clicked:", notification);
      }
    );
  } catch (err) {
    console.error("Error registering push notifications:", err);
  }
};
