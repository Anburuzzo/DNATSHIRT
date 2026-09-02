import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";

import {
  useContext,
} from "react";

import {
  CartContext,
} from "../../src/context/CartContext";
import { uploadImage } from "../../src/services/cloudinary";
//import BottomNavigation from "../../src/components/BottomNavigation";

import {TouchableOpacity,} from "react-native";

import { router } from "expo-router";

export default function Cart() {

  const {
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} = useContext(CartContext);

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


 if (cartItems.length === 0) {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        Your Cart is Empty 🛒
      </Text>

      
    </View>
  );
}

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        My Cart 🛒
      </Text>

      <FlatList
  data={cartItems}
  keyExtractor={(item, index) =>
    index.toString()
  }
  contentContainerStyle={{
    paddingBottom: 20,
  }}
        renderItem={({ item }) => (
           <View style={styles.card}>

    <Image
      source={{ uri: item.image }}
      style={styles.image}
    />

    <View>

      <Text style={styles.name}>
        {item.name}
      </Text>

      <Text style={styles.price}>
        ₹{item.price}
      </Text>

      {/* QUANTITY UI */}
      <View style={styles.quantityContainer}>

        <TouchableOpacity
          style={styles.qtyButton}
          onPress={() =>
            decreaseQuantity(item.id)
          }
        >
          <Text style={styles.qtyText}>
            -
          </Text>
        </TouchableOpacity>

        <Text style={styles.quantity}>
          {item.quantity}
        </Text>

        <TouchableOpacity
          style={styles.qtyButton}
          onPress={() =>
            increaseQuantity(item.id)
          }
        >
          <Text style={styles.qtyText}>
            +
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
  style={styles.removeButton}
  onPress={() =>
    removeItem(item.id)
  }
>
  <Text style={styles.removeText}>
    Remove
  </Text>
</TouchableOpacity>

      </View>

    </View>

  </View>
        )}
      />



<View style={styles.totalContainer}>
  <Text style={styles.totalText}>
    Total:
  </Text>

  <Text style={styles.totalPrice}>
    ₹{totalAmount}
  </Text>
</View>

<TouchableOpacity
  style={styles.checkoutButton}
  onPress={() =>
    router.push("/checkout")
  }
>
  <Text style={styles.checkoutText}>
    Proceed To Checkout
  </Text>
</TouchableOpacity>



 

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
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#F3F4F6",
    padding: 10,
    borderRadius: 12,
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 15,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    width: 200,
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },

  quantityContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 10,
},

qtyButton: {
  backgroundColor: "#111827",
  width: 30,
  height: 30,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 5,
},

qtyText: {
  color: "#fff",
  fontSize: 18,
  fontWeight: "bold",
},

quantity: {
  marginHorizontal: 15,
  fontSize: 18,
  fontWeight: "bold",
  
},

removeButton: {
  backgroundColor: "#EF4444",
  padding: 8,
  borderRadius: 8,
  marginTop: 10,
  width: 90,
  marginBottom:10,
  marginLeft:20,
  

},

removeText: {
  color: "#fff",
  textAlign: "center",
  fontWeight: "bold",
},

totalContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 10,
  marginBottom: 10,
  padding: 15,
  backgroundColor: "#111827",
  borderRadius: 12,
},

totalText: {
  color: "#fff",
  fontSize: 20,
  fontWeight: "bold",
},

totalPrice: {
  color: "#fff",
  fontSize: 22,
  fontWeight: "bold",
},

emptyContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},

emptyText: {
  fontSize: 22,
  fontWeight: "bold",
  color: "gray",
},

// checkoutButton: {
//   backgroundColor: "#F59E0B",
//   padding: 18,
//   borderRadius: 12,
//   marginTop: 20,
// },

checkoutButton: {
  backgroundColor: "#F59E0B",
  padding: 18,
  borderRadius: 12,
  marginTop: 10,
  marginBottom: 90,
},

checkoutText: {
  color: "#fff",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: 18,
},
});