import { PushNotifications } from "@capacitor/push-notifications";
import { FirebaseMessaging } from "@capacitor-firebase/messaging";

export async function registerPushNotifications(authId) {
  try {
    // Request permission to use notifications
    const permStatus = await PushNotifications.requestPermissions();
    if (permStatus.receive !== "granted") {
      console.log("Notification permission not granted");
      return;
    }

    // Register with FCM
    await PushNotifications.register();

    // Get the token
    const tokenData = await FirebaseMessaging.getToken();
    const token = tokenData.token;
    console.log("FCM Token:", token);

    // Send the token to your backend
    await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/save-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ authId, token }),
    });

    console.log("Token sent to backend successfully");

    // Optional: listen for foreground messages
    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification) => {
        console.log("Notification received:", notification);
      }
    );
  } catch (err) {
    console.error("Push registration error:", err);
  }
}
