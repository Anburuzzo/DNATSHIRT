import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";

import { db } from "../config/firebase";

export const getProducts = async () => {
  const snapshot = await getDocs(
    collection(db, "products")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
export const deleteProduct =
  async (productId: string) => {

    await deleteDoc(
      doc(
        db,
        "products",
        productId
      )
    );
  };

  export const addProduct =
  async (product: any) => {

    await addDoc(
      collection(db, "products"),
      product
    );
  };