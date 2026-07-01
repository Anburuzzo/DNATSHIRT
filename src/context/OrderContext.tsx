import {
  createContext,
  useState,
} from "react";

export const OrderContext =
  createContext<any>(null);

export default function OrderProvider({
  children,
}: any) {

  const [orders, setOrders] =
    useState<any[]>([]);

  const placeOrder = (
    items: any[],
    total: number
  ) => {

    const newOrder = {
      id: Date.now().toString(),
      items,
      total,
      createdAt: new Date(),
      status: "Placed",
    };

    setOrders((prev) => [
      newOrder,
      ...prev,
    ]);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}