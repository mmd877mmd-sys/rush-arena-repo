import { messaging } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";

const VAPID_KEY =
  "BExB14xK93DMa6dx8UiNwmTzUf6Py_50tDLUqE24QHhIuRc9kzLJCxxYpbnikE3XmphfILB4Gf5EUYgnSQ22WNo	"; // replace with your key

export const registerForPushNotifications = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted");

      const token = await getToken(messaging, { vapidKey: VAPID_KEY });
      console.log("Device token:", token);

      // Send the token to your backend to subscribe to topic
      await fetch("/api/subscribe-topic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, topic: "all-users" }),
      });

      return token;
    } else {
      console.log("Notification permission denied");
    }
  } catch (err) {
    console.error("Error registering for notifications:", err);
  }
};

// Listen for foreground messages
export const listenForMessages = (callback) => {
  onMessage(messaging, (payload) => {
    console.log("Foreground message received:", payload);
    callback(payload);
  });
};
