import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../config/firebase";
import { Product } from "../types/Product";

export const getProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(
    collection(db, "products")
  );

  return snapshot.docs.map((doc) => ({
  id: doc.id,
  ...(doc.data() as Omit<Product, "id">),
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

  export const getProductById =
  async (id: string): Promise<Product | null> => {

    const snapshot =
      await getDoc(
        doc(db, "products", id)
      );

    if (!snapshot.exists()) {
      return null;
    }

    return {
  id: snapshot.id,
  ...(snapshot.data() as Omit<Product, "id">),
};
  };

export const updateProduct =
  async (
    id: string,
    product: any
  ) => {

    await updateDoc(
      doc(db, "products", id),
      product
    );
  };

  export const reduceProductStock = async (
  productId: string,
  quantity: number
) => {
  const productRef = doc(db, "products", productId);

  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) {
    return;
  }

  const product = snapshot.data();

  const currentStock = Number(product.stock || 0);

  const newStock = Math.max(
    currentStock - quantity,
    0
  );

  await updateDoc(productRef, {
    stock: newStock,
  });
};