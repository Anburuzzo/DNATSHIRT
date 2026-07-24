import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../src/config/firebase";
import { Settings } from "../types/Settings";

const SETTINGS_DOC = "store";

export const defaultSettings: Settings = {
  storeName: "DNATSHIRT",
  storeEmail: "admin@dnatshirt.com",
  phone: "",
  address: "",
  logo: "",

  currency: "AED",

  cashOnDelivery: true,
  onlinePayment: false,

  shippingCharge: 0,
  freeShippingAbove: 0,
  deliveryDays: 3,

  autoReduceStock: true,
  lowStockAlert: 5,

  orderNotification: true,
  lowStockNotification: true,

  darkMode: false,

  version: "1.0.0",
};

export const getSettings = async (): Promise<Settings> => {
  try {
    const ref = doc(db, "settings", SETTINGS_DOC);

    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      await setDoc(ref, defaultSettings);
      return defaultSettings;
    }

    return snapshot.data() as Settings;
  } catch (error) {
    console.log("Get Settings Error :", error);
    return defaultSettings;
  }
};

export const saveSettings = async (
  settings: Settings
): Promise<boolean> => {
  try {
    const ref = doc(db, "settings", SETTINGS_DOC);

    await setDoc(ref, settings, { merge: true });

    return true;
  } catch (error) {
    console.log("Save Settings Error :", error);
    return false;
  }
};

export const updateSettings = async (
  data: Partial<Settings>
): Promise<boolean> => {
  try {
    const ref = doc(db, "settings", SETTINGS_DOC);

    await updateDoc(ref, data);

    return true;
  } catch (error) {
    console.log("Update Settings Error :", error);
    return false;
  }
};

export const resetSettings = async (): Promise<boolean> => {
  try {
    const ref = doc(db, "settings", SETTINGS_DOC);

    await setDoc(ref, defaultSettings);

    return true;
  } catch (error) {
    console.log("Reset Settings Error :", error);
    return false;
  }
};


