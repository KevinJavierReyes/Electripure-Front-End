import { Messaging, getToken, isSupported } from "firebase/messaging";
import environment from "./../config/env";

export async function generateToken(messagingInstance: Messaging): Promise<string | null> {
  const supported = await isSupported();
  if (!supported) {
    console.log("Messaging not support.");
    return null;
  }
  const token: string = await getToken(messagingInstance, { "vapidKey": environment.VAPID_KEY });
  return token;
}