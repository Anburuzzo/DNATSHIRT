import {
  createContext,
  useState,
} from "react";

export const CartContext =
  createContext<any>(null);

export default function CartProvider({
  children,
}: any) {

  const [cartItems, setCartItems] =
    useState<any[]>([]);

  // ADD TO CART
  const addToCart = (product: any) => {

    const existingItem =
      cartItems.find(
        (item) => item.id === product.id
      );

    if (existingItem) {

      const updatedCart =
        cartItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        );

      setCartItems(updatedCart);

    } else {

      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  // INCREASE
  const increaseQuantity = (
    id: string
  ) => {

    const updatedCart =
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      );

    setCartItems(updatedCart);
  };

  // DECREASE
  const decreaseQuantity = (
    id: string
  ) => {

    const updatedCart =
      cartItems.map((item) =>
        item.id === id &&
        item.quantity > 1
          ? {
              ...item,
              quantity:
                item.quantity - 1,
            }
          : item
      );

    setCartItems(updatedCart);
  };

  // REMOVE
  const removeItem = (
    id: string
  ) => {

    const filteredCart =
      cartItems.filter(
        (item) => item.id !== id
      );

    setCartItems(filteredCart);
  };

  // CLEAR CART
  const clearCart = () => {
    setCartItems([]);
  };

  // CART BADGE COUNT
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}