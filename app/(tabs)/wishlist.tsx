import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

import {
  useContext,
} from "react";

import ProductCard from
"../../src/components/ProductCard";

import {
  WishlistContext,
} from "../../src/context/WishlistContext";
import { uploadImage } from "../../src/services/cloudinary";
export default function Wishlist() {

  const { wishlistItems } =
    useContext(WishlistContext);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Wishlist ❤️
      </Text>

      <FlatList
        data={wishlistItems}
        numColumns={2}
        keyExtractor={(item) =>
          item.id
        }
        columnWrapperStyle={{
          justifyContent:
            "space-between",
        }}
        renderItem={({ item }) => (
          <ProductCard item={item} />
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
});