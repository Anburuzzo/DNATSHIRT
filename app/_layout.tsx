import { Stack } from "expo-router";

import AuthProvider from "../src/context/AuthContext";
import CartProvider from "../src/context/CartContext";
import OrderProvider from "../src/context/OrderContext";
import WishlistProvider from "../src/context/WishlistContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>

        <OrderProvider>

           <WishlistProvider>

            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />

          </WishlistProvider>

        </OrderProvider>

      </CartProvider>
    </AuthProvider>
  );
}