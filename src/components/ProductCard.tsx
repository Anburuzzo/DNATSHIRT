import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { router } from "expo-router";

import {
  useContext,
} from "react";

import Ionicons from
"@expo/vector-icons/Ionicons";

import {
  WishlistContext,
} from "../context/WishlistContext";


export default function ProductCard({
  item,
}: any) {

const {
  wishlistItems,
  toggleWishlist,
} = useContext(WishlistContext);

const isFavorite =
  wishlistItems.some(
    (wishlist: any) =>
      wishlist.id === item.id
  );


  return (
    <TouchableOpacity
  style={styles.card}
  onPress={() =>
    router.push({
      pathname: "/product/[id]",
      params: {
        id: item.id,
        name: item.name,
        price: item.price.toString(),
        image: item.image,
      },
    })
  }
>



     <TouchableOpacity
  style={styles.heartIcon}
  onPress={() =>
    toggleWishlist(item)
  }
>

  <Ionicons
    name={
      isFavorite
        ? "heart"
        : "heart-outline"
    }
    size={24}
    color="red"
  />

</TouchableOpacity>


      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />

      <Text style={styles.name}>
        {item.name}
      </Text>

      <Text style={styles.price}>
        ₹{item.price}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    width: "48%",
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    color: "#111827",
  },

  heartIcon: {
  position: "absolute",
  top: 15,
  right: 15,
  zIndex: 1,
  backgroundColor: "#fff",
  padding: 5,
  borderRadius: 20,
},
});