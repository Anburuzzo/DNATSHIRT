import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useLocalSearchParams } from "expo-router";

import { useContext } from "react";

import { CartContext } from "../../src/context/CartContext";
import BottomNavigation from "../../src/components/BottomNavigation";
//import products from "../../src/data/products";

export default function ProductDetails() {
  const { id, name, price, image } = useLocalSearchParams();

  // const product = products.find(
  //   (item) => item.id === id
  // );

  // if (!product) {
  //   return (
  //     <Text>
  //       Product Not Found
  //     </Text>
  //   );
  // }

  const { addToCart } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <Image source={{ uri: image as string }} style={styles.image} />

      <Text style={styles.name}>{name}</Text>

      <Text style={styles.price}>₹{price}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          addToCart({
            id,
            name,
            price: Number(price),
            image,
          })
        }
      >
        <Text style={styles.buttonText}>Add To Cart</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  image: {
    width: "100%",
    height: 400,
    borderRadius: 20,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },

  price: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    color: "#111827",
  },

  button: {
    backgroundColor: "#111827",
    padding: 18,
    borderRadius: 12,
    marginTop: 30,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
