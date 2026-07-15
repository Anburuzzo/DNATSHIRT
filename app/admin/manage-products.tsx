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
  TextInput,
} from "react-native";

import {
  getProducts,
  deleteProduct,
} from "../../src/services/productService";

import { router } from "expo-router";
import AdminProductCard from "../../src/components/AdminProductCard";
export default function AdminProducts() {

  const [products, setProducts] =
    useState<any[]>([]);

    const [search, setSearch] =
  useState("");



  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data =
      await getProducts();

    setProducts(data);
  };


  const filteredProducts =
  products.filter((item) =>
    item.name
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )
  );

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

      <Text style={styles.welcome}>
      Welcome Back 👋
    </Text>

    <Text style={styles.title}>
      Manage Products
    </Text>

    
     <TextInput
  placeholder="🔍 Search Products..."
  placeholderTextColor="#9CA3AF"
  value={search}
  onChangeText={setSearch}
  style={styles.searchInput}
/>


      {/* <TouchableOpacity
  style={styles.addButton}
  onPress={() =>
    router.push("/add-product")
  }
>
  <Text style={styles.addButtonIcon}>
    +
  </Text>

  <Text style={styles.addButtonText}>
    Add New Product
  </Text>
</TouchableOpacity> */}


  <FlatList
  data={filteredProducts}
  numColumns={2}
  keyExtractor={(item) => item.id}
  columnWrapperStyle={{
    justifyContent: "space-between",
  }}
  renderItem={({ item }) => (
    <AdminProductCard
      item={item}
      onEdit={() =>
        router.push({
          pathname: "/edit-product/[id]",
          params: {
            id: String(item.id),
          },
        })
      }
      onDelete={() =>
        handleDelete(item.id)
      }
    />
  )}
/>


   

       <TouchableOpacity
  style={styles.fab}
  onPress={() =>
    router.push("/add-product")
  }
>
  <Text style={styles.fabText}>
    +
  </Text>
</TouchableOpacity>

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

    header: {
  marginBottom: 20,
},

    welcome: {
  color: "#6B7280",
  fontSize: 15,
  fontWeight: "500",
},

    title: {
      color: "#111827",
  fontSize: 30,
  fontWeight: "800",
  marginTop: 4,
    },

   card: {
  backgroundColor: "#FFFFFF",

  width: "48%",

  borderRadius: 22,

  padding: 10,

  marginBottom: 18,

  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.08,
  shadowRadius: 10,

  elevation: 5,
},

   image: {
  width: "100%",
  height: 150,
  borderRadius: 16,
},

   name: {
  fontSize: 16,
  fontWeight: "700",
  color: "#111827",
  marginTop: 10,
},

   price: {
  color: "#111827",
  fontWeight: "800",
  fontSize: 18,
  marginTop: 8,
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
  backgroundColor: "#111827",
  borderRadius: 18,
  paddingVertical: 16,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 20,
  elevation: 4,
},

addButtonText: {
  color: "#FFFFFF",
  fontSize: 17,
  fontWeight: "700",
},
 addButtonIcon: {
  color: "#FFFFFF",
  fontSize: 24,
  fontWeight: "bold",
  marginRight: 8,
},

editBtn: {
  backgroundColor: "#2563EB",
  padding: 12,
  borderRadius: 10,
  marginTop: 12,
},

editText: {
  color: "#fff",
  textAlign: "center",
  fontWeight: "bold",
},

badge: {
  alignSelf: "flex-start",
  backgroundColor: "#F3F4F6",
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 12,
  marginTop: 8,
},

badgeText: {
  color: "#374151",
  fontSize: 12,
  fontWeight: "700",
},
actionRow: {
  flexDirection: "row",
  justifyContent: "flex-end",
  marginTop: 15,
},

iconButton: {
  width: 42,
  height: 42,
  borderRadius: 21,
  backgroundColor: "#F3F4F6",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: 10,
},
icon: {
  fontSize: 18,
},


searchInput: {
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  paddingHorizontal: 18,
  paddingVertical: 15,
  fontSize: 16,
  marginBottom: 20,

  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.05,
  shadowRadius: 10,

  elevation: 3,
},


fab: {
  position: "absolute",
  bottom: 30,
  right: 20,
  width: 70,
  height: 70,
  borderRadius: 35,
  backgroundColor: "red",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
  elevation: 20,
},

fabText: {
  color: "#fff",
  fontSize: 34,
  fontWeight: "bold",
},
imageContainer: {
  position: "relative",
},

priceTag: {
  position: "absolute",
  bottom: 10,
  right: 10,

  backgroundColor: "#111827",

  paddingHorizontal: 10,
  paddingVertical: 5,

  borderRadius: 15,
},

priceTagText: {
  color: "#FFFFFF",
  fontWeight: "700",
  fontSize: 13,
},

  });