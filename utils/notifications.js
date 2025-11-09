import { PushNotifications } from "@capacitor/push-notifications";

export const setupPushNotifications = async () => {
  try {
    // Request permission
    const permStatus = await PushNotifications.requestPermissions();

    if (permStatus.receive === "granted") {
      // Register with FCM
      await PushNotifications.register();
    } else {
      console.warn("Push notification permission not granted");
      return;
    }

    // On registration success
    PushNotifications.addListener("registration", (token) => {
      console.log("Device token:", token.value);
      // You can send this token to your backend
    });

    // On notification received
    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification) => {
        console.log("Notification received:", notification);
      }
    );

    // On notification action (tap)
    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (notification) => {
        console.log("Notification action:", notification);
      }
    );
  } catch (err) {
    console.error("Push setup error:", err);
  }
};
