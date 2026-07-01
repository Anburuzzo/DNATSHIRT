import {
  collection,
  addDoc,
  getDocs,
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

  const snapshot =
    await getDocs(
      collection(db, "orders")
    );

  return snapshot.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  );
};