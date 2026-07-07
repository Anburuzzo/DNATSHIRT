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
  Alert,
  Image,
} from "react-native";

import {
  getProducts,
  deleteProduct,
} from "../src/services/productService";

import { router } from "expo-router";

export default function AdminProducts() {

  const [products, setProducts] =
    useState<any[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data =
      await getProducts();

    setProducts(data);
  };

  const handleDelete =
    async (id: string) => {

      Alert.alert(
        "Delete Product",
        "Are you sure?",
        [
          {
            text: "Cancel",
          },
          {
            text: "Delete",
            onPress: async () => {

              await deleteProduct(id);

              loadProducts();
            },
          },
        ]
      );
    };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Manage Products 👕
      </Text>

      <TouchableOpacity
  style={styles.addButton}
  onPress={() =>
    router.push("/add-product")
  }
>
  <Text style={styles.addButtonText}>
    ➕ Add Product
  </Text>
</TouchableOpacity>

      <FlatList
        data={products}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={({ item }) => (

          <View style={styles.card}>

            <Image
              source={{
                uri: item.image,
              }}
              style={styles.image}
            />

            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text style={styles.price}>
              ₹{item.price}
            </Text>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() =>
                handleDelete(
                  item.id
                )
              }
            >
              <Text
                style={styles.deleteText}
              >
                Delete 🗑️
              </Text>
            </TouchableOpacity>

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
      backgroundColor: "#F9FAFB",
    },

    title: {
      fontSize: 26,
      fontWeight: "bold",
      marginBottom: 20,
    },

    card: {
      backgroundColor: "#fff",
      padding: 15,
      borderRadius: 12,
      marginBottom: 15,
    },

    image: {
      width: "100%",
      height: 180,
      borderRadius: 12,
    },

    name: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 10,
    },

    price: {
      fontSize: 16,
      marginTop: 5,
    },

    deleteBtn: {
      backgroundColor: "#DC2626",
      padding: 12,
      borderRadius: 10,
      marginTop: 12,
    },

    deleteText: {
      color: "#fff",
      textAlign: "center",
      fontWeight: "bold",
    },

    addButton: {
  backgroundColor: "#16A34A",
  padding: 14,
  borderRadius: 12,
  marginBottom: 15,
},

addButtonText: {
  color: "#fff",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: 16,
},

  });