import {
  createContext,
  useState,
} from "react";

export const WishlistContext =
  createContext<any>(null);

export default function WishlistProvider({
  children,
}: any) {

  const [wishlistItems,
    setWishlistItems] =
    useState<any[]>([]);

  // ADD / REMOVE
  const toggleWishlist = (
    product: any
  ) => {

    const exists =
      wishlistItems.find(
        (item) =>
          item.id === product.id
      );

    if (exists) {

      const filtered =
        wishlistItems.filter(
          (item) =>
            item.id !== product.id
        );

      setWishlistItems(filtered);

    } else {

      setWishlistItems([
        ...wishlistItems,
        product,
      ]);
    }
  };

    // WISHLIST BADGE COUNT
  const wishlistCount = wishlistItems.length;

  

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}