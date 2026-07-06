import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  getOrders,
  updateOrderStatus,
} from "../../src/services/orderService";

const statuses = [
  "Placed",
  "Packed",
  "Shipped",
  "Out For Delivery",
  "Delivered",
];

export default function AdminScreen() {

  const [orders, setOrders] =
    useState<any[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders =
    async () => {

      const data =
        await getOrders();

      setOrders(data);
    };

  const changeStatus =
    async (
      orderId: string,
      status: string
    ) => {

      await updateOrderStatus(
        orderId,
        status
      );

      loadOrders();
    };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Admin Panel 👨‍💼
      </Text>

      <FlatList
        data={orders}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text>
              Order:
              {item.id}
            </Text>

            <Text>
              Status:
              {item.status}
            </Text>

            <View
              style={styles.row}
            >

              {statuses.map(
                (status) => (

                  <TouchableOpacity
                    key={status}
                    style={
                      styles.button
                    }
                    onPress={() =>
                      changeStatus(
                        item.id,
                        status
                      )
                    }
                  >

                    <Text
                      style={{
                        color:
                          "#fff",
                      }}
                    >
                      {status}
                    </Text>

                  </TouchableOpacity>

                )
              )}

            </View>

          </View>

        )}
      />

    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
    },

    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },

    card: {
      backgroundColor:
        "#fff",
      padding: 15,
      borderRadius: 12,
      marginBottom: 15,
    },

    row: {
      flexDirection:
        "row",
      flexWrap: "wrap",
      marginTop: 10,
      gap: 8,
    },

    button: {
      backgroundColor:
        "#111827",
      padding: 8,
      borderRadius: 8,
    },
  });