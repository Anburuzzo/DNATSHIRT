import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,Alert,
} from "react-native";

import {
  router,
} from "expo-router";

import {
  useContext,
} from "react";

import {
  CartContext,
} from "../../src/context/CartContext";


import { saveOrder } from "../../src/services/orderService";
import { reduceProductStock, getProductById, } from "../../src/services/productService";
export default function Checkout() {

  const { cartItems } =
    useContext(CartContext);

  const totalAmount =
    cartItems.reduce(
      (
        total: number,
        item: any
      ) =>
        total +
        item.price * item.quantity,
      0
    );



const { clearCart } =
  useContext(CartContext);


const handlePlaceOrder = async () => {
  try {

    const orderData = {
      items: cartItems.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      total: totalAmount,
      status: "Placed",
      createdAt: new Date().toISOString(),
    };

    // 1️⃣ Check stock BEFORE saving the order
    for (const item of orderData.items) {
      const product = await getProductById(item.id);

      if (!product) {
        Alert.alert("Error", "Product not found.");
        return;
      }

      if (item.quantity > product.stock) {
        Alert.alert(
          "Out of Stock",
          `Only ${product.stock} item(s) available for ${product.name}`
        );
        return;
      }
    }
console.log(orderData.items);
    // 2️⃣ Save the order
    await saveOrder(orderData);

    // 3️⃣ Reduce stock
    for (const item of orderData.items) {
      await reduceProductStock(
        item.id,
        item.quantity
      );
    }

    // 4️⃣ Clear cart
    clearCart();

    Alert.alert(
      "Success",
      "Order Placed Successfully"
    );

    router.replace("/(tabs)/orders");

  } catch (error) {
    console.log(error);

    Alert.alert(
      "Error",
      "Order failed"
    );
  }
};


  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Checkout 💳
      </Text>

      {/* ADDRESS */}
      <View style={styles.section}>
        <Text style={styles.label}>
          Delivery Address
        </Text>

        <Text style={styles.value}>
          Dubai, UAE
        </Text>
      </View>

      {/* ORDER SUMMARY */}
      <View style={styles.section}>
        <Text style={styles.label}>
          Order Summary
        </Text>

        <Text style={styles.value}>
          Items: {cartItems.length}
        </Text>

        <Text style={styles.value}>
          Total: ₹{totalAmount}
        </Text>
      </View>

      {/* PAYMENT BUTTON */}
      <TouchableOpacity
  style={styles.button}
  onPress={handlePlaceOrder}
>
  <Text style={styles.buttonText}>
    Place Order
  </Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },

  section: {
    backgroundColor: "#F3F4F6",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },

  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  value: {
    fontSize: 16,
    marginBottom: 5,
  },

  button: {
    backgroundColor: "#111827",
    padding: 18,
    borderRadius: 12,
    marginTop: 20,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});