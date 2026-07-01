import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

import {
  getOrders,
} from "../../src/services/orderService";

import {
  useContext,
} from "react";

import {
  OrderContext,
} from "../../src/context/OrderContext";

export default function Orders() {

  const [orders, setOrders] =
  useState<any[]>([]);

  // const { orders } =
  //   useContext(OrderContext);

  useEffect(() => {
  loadOrders();
}, []);

const loadOrders = async () => {

  const data =
    await getOrders();

  console.log(data);

  setOrders(data);
};

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        My Orders 📦
      </Text>

      <FlatList
        data={orders}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text style={styles.orderId}>
              Order ID:
              {item.id}
            </Text>

            <Text style={styles.total}>
              ₹{item.total}
            </Text>

            <Text style={styles.status}>
              {item.status}
            </Text>

          </View>

        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#F3F4F6",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  orderId: {
    fontSize: 16,
    fontWeight: "bold",
  },

  total: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
  },

  status: {
    marginTop: 10,
    color: "green",
    fontWeight: "bold",
  },
});