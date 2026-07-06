import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

import { WishlistContext } from "../context/WishlistContext";

export default function ProductCard({
  item,
}: any) {
  const { wishlistItems, toggleWishlist } = useContext(WishlistContext);
  const isFavorite = wishlistItems.some(
    (wishlistItem: any) => wishlistItem.id === item.id
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
            price: item.price,
            image: item.image,
          },
        })
      }
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.heart}
        onPress={(event) => {
          event.stopPropagation();
          toggleWishlist(item);
        }}
      >
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={20}
          color={isFavorite ? "#EF4444" : "#111827"}
        />
      </TouchableOpacity>

      <Image
        source={{
          uri: item.image,
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text
          numberOfLines={1}
          style={styles.name}
        >
          {item.name}
        </Text>

        <Text style={styles.category}>
          {item.category || "Streetwear"}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>
            Rs. {item.price}
          </Text>

          <Ionicons
            name="arrow-forward-circle"
            size={24}
            color="#111827"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F3F4F6",
    borderRadius: 22,
    marginBottom: 16,
    overflow: "hidden",
    width: "48%",
  },

  heart: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
    backgroundColor: "#FFFFFF",
    padding: 6,
    borderRadius: 20,
  },

  image: {
    width: "100%",
    height: 220,
  },

  content: {
    padding: 12,
  },

  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  category: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  price: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },
});
