import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";


const CLOUD_NAME = "YOUR_CLOUD_NAME";
const UPLOAD_PRESET = "YOUR_UPLOAD_PRESET";

export interface Settings {
  storeName: string;
  storeEmail: string;
  phone: string;
  address: string;

  logo: string;

  currency: "AED" | "INR" | "USD";

  cashOnDelivery: boolean;
  onlinePayment: boolean;

  shippingCharge: number;
  freeShippingAbove: number;
  deliveryDays: number;

  autoReduceStock: boolean;
  lowStockAlert: number;

  orderNotification: boolean;
  lowStockNotification: boolean;

  darkMode: boolean;

  version: string;
}