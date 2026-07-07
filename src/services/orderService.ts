import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../config/firebase";

export const saveOrder = async (
  order: any
) => {
  return await addDoc(
    collection(db, "orders"),
    order
  );
};

export const getOrders = async () => {
  const snapshot = await getDocs(
    collection(db, "orders")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};



export const updateOrderStatus = async (
  orderId: string,
  status: string
) => {
  await updateDoc(
    doc(db, "orders", orderId),
    {
      status,
    }
  );
};