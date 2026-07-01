import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

import BannerSlider from "../../src/components/BannerSlider";
import ProductCard from "../../src/components/ProductCard";
import { getProducts } from "../../src/services/productService";

type Product = {
  id: string;
  name?: string;
  category?: string;
  price?: number;
  image?: string;
};

const categories = ["All", "Oversized", "Casual", "Streetwear", "Hoodie"];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data as Product[]);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return products.filter((item) => {
      const name = item.name?.toLowerCase() ?? "";
      const category = item.category?.toLowerCase() ?? name;
      const matchSearch = searchTerm.length === 0 || name.includes(searchTerm);
      const matchCategory =
        selectedCategory === "All" ||
        category.includes(selectedCategory.toLowerCase());

      return matchSearch && matchCategory;
    });
  }, [products, search, selectedCategory]);

  const renderHeader = () => (
    <View style={styles.headerContent}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.welcome}>Welcome back</Text>
          <Text style={styles.title}>DNATSHIRT</Text>
        </View>

        <Pressable
          accessibilityLabel="Open notifications"
          style={styles.iconButton}
          onPress={() => router.push("/notification")}
        >
          <Ionicons name="notifications-outline" size={22} color="#111827" />
        </Pressable>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={20} color="#6B7280" />
        <TextInput
          placeholder="Search t-shirts, hoodies..."
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
        {search.length > 0 && (
          <Pressable
            accessibilityLabel="Clear search"
            hitSlop={10}
            onPress={() => setSearch("")}
          >
            <Ionicons name="close-circle" size={19} color="#9CA3AF" />
          </Pressable>
        )}
      </View>

      <BannerSlider />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Trending Products</Text>
        <Text style={styles.productCount}>{filteredProducts.length} items</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category;

          return (
            <Pressable
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.categoryChip,
                isSelected && styles.categoryChipSelected,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  isSelected && styles.categoryTextSelected,
                ]}
              >
                {category}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#111827" />
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          numColumns={2}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="shirt-outline" size={34} color="#9CA3AF" />
              <Text style={styles.emptyTitle}>No products found</Text>
              <Text style={styles.emptyText}>
                Try another search or switch categories.
              </Text>
            </View>
          }
          columnWrapperStyle={styles.productRow}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <ProductCard item={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  listContent: {
    padding: 16,
    paddingBottom: 28,
  },

  headerContent: {
    gap: 16,
  },

  topBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
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
    marginTop: 2,
  },

  iconButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    elevation: 2,
    height: 44,
    justifyContent: "center",
    shadowColor: "#111827",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    width: 44,
  },

  searchBox: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    elevation: 2,
    flexDirection: "row",
    minHeight: 52,
    paddingHorizontal: 14,
    shadowColor: "#111827",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
  },

  searchInput: {
    color: "#111827",
    flex: 1,
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },

  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  sectionTitle: {
    color: "#111827",
    fontSize: 20,
    fontWeight: "800",
  },

  productCount: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "600",
  },

  categoryList: {
    gap: 10,
    paddingBottom: 6,
  },

  categoryChip: {
    backgroundColor: "#ECEFF3",
    borderRadius: 22,
    paddingHorizontal: 17,
    paddingVertical: 10,
  },

  categoryChipSelected: {
    backgroundColor: "#111827",
  },

  categoryText: {
    color: "#4B5563",
    fontSize: 14,
    fontWeight: "700",
  },

  categoryTextSelected: {
    color: "#FFFFFF",
  },

  productRow: {
    justifyContent: "space-between",
  },

  emptyState: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginTop: 10,
    padding: 28,
  },

  emptyTitle: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "800",
    marginTop: 10,
  },

  emptyText: {
    color: "#6B7280",
    fontSize: 14,
    marginTop: 6,
    textAlign: "center",
  },

  loader: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});