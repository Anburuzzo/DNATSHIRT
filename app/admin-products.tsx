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
} from "../src/services/productService";

import { router } from "expo-router";

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

<View style={styles.badge}>
  <Text style={styles.badgeText}>
    {item.category}
  </Text>
</View>

<Text style={styles.price}>
  ₹ {item.price}
</Text>


            <View style={styles.actionRow}>

  <TouchableOpacity
    style={styles.iconButton}
    onPress={() =>
      router.push({
        pathname: "/edit-product/[id]",
        params: {
          id: String(item.id),
        },
      })
    }
  >
    <Text style={styles.icon}>
      ✏️
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.iconButton}
    onPress={() =>
      handleDelete(item.id)
    }
  >
    <Text style={styles.icon}>
      🗑️
    </Text>
  </TouchableOpacity>

</View>

          </View>

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
  borderRadius: 24,
  padding: 14,
  marginBottom: 20,

  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 8,
  },
  shadowOpacity: 0.08,
  shadowRadius: 15,

  elevation: 6,
},

   image: {
  width: "100%",
  height: 220,
  borderRadius: 20,
  resizeMode: "cover",
},

   name: {
  fontSize: 22,
  fontWeight: "800",
  color: "#111827",
  marginTop: 15,
},

   price: {
  fontSize: 20,
  color: "#111827",
  fontWeight: "700",
  marginTop: 12,
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
  backgroundColor: "#EEF2FF",
  paddingHorizontal: 12,
  paddingVertical: 5,
  borderRadius: 20,
  marginTop: 8,
},

badgeText: {
  color: "#4338CA",
  fontWeight: "700",
  fontSize: 13,
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


  });