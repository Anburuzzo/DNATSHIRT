import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";

import {
  getOrders,
  updateOrderStatus,
} from "../../src/services/orderService";

type Order = {
  id: string;
  customerName?: string;
  total?: number;
  status?: string;
  createdAt?: any;
  items?: any[];
};

const FILTERS = [
  "All",
  "Placed",
  "Packed",
  "Shipped",
  "Out For Delivery",
  "Delivered",
];

export default function OrdersScreen() {

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [selectedFilter, setSelectedFilter] =
    useState("All");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {

    try {

      setLoading(true);

      const data =
        await getOrders();

      setOrders(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

      setRefreshing(false);

    }

  };

  const onRefresh = async () => {

    setRefreshing(true);

    await loadOrders();

  };

  const changeStatus = async (
  orderId: string,
  status: string
) => {

  try {

    await updateOrderStatus(
      orderId,
      status
    );

    loadOrders();

  } catch (error) {

    console.log(error);

  }

};

  const filteredOrders =
    useMemo(() => {

      return orders.filter((order) => {

        const matchSearch =

          (order.customerName || "")
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          order.id
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchFilter =

          selectedFilter === "All"

            ? true

            : order.status ===
              selectedFilter;

        return (
          matchSearch &&
          matchFilter
        );

      });

    }, [
      orders,
      search,
      selectedFilter,
    ]);

  if (loading) {

    return (

      <View
        style={styles.loader}
      >

        <ActivityIndicator
          size="large"
          color="#111827"
        />

      </View>

    );

  }

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Orders
      </Text>

      <View style={styles.summaryContainer}>

  <View style={styles.summaryCard}>
    <Text style={styles.summaryValue}>
      {orders.length}
    </Text>

    <Text style={styles.summaryTitle}>
      Total Orders
    </Text>
  </View>

  <View style={styles.summaryCard}>
    <Text style={styles.summaryValue}>
      {
        orders.filter(
          o => o.status === "Delivered"
        ).length
      }
    </Text>

    <Text style={styles.summaryTitle}>
      Delivered
    </Text>
  </View>

</View>

      <TextInput
        placeholder="Search Orders..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={FILTERS}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (

          <TouchableOpacity
            style={[
              styles.filterButton,

              selectedFilter === item &&

                styles.activeFilter,
            ]}
            onPress={() =>
              setSelectedFilter(item)
            }
          >

            <Text
              style={[
                styles.filterText,

                selectedFilter ===
                  item &&

                  styles.activeFilterText,
              ]}
            >
              {item}
            </Text>

          </TouchableOpacity>

        )}
      />

      {/* PART 2 STARTS HERE */}

      <FlatList
  data={filteredOrders}
  keyExtractor={(item) => item.id}
  refreshing={refreshing}
  onRefresh={onRefresh}
  showsVerticalScrollIndicator={false}
  ListEmptyComponent={() => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        No Orders Found
      </Text>
    </View>
  )}
  renderItem={({ item }) => (
    <View style={styles.orderCard}>

      <View style={styles.rowBetween}>
        <Text style={styles.customerName}>
          {item.customerName || "Customer"}
        </Text>

       <View
  style={[
    styles.statusBadge,

    item.status === "Delivered" &&
      styles.deliveredBadge,

    item.status === "Shipped" &&
      styles.shippedBadge,

    item.status === "Packed" &&
      styles.packedBadge,

    item.status === "Placed" &&
      styles.placedBadge,
  ]}
>

<Text style={styles.statusText}>
  {item.status}
</Text>

</View>
      </View>

      <Text style={styles.orderId}>
        Order ID: {item.id}
      </Text>

      <Text style={styles.total}>
        ₹ {item.total || 0}
      </Text>

      <Text style={styles.items}>
        Items :
        {" "}
        {item.items?.length || 0}
      </Text>

      <Text style={styles.date}>
        {item.createdAt?.toDate
          ? item.createdAt
              .toDate()
              .toLocaleDateString()
          : "-"}
      </Text>

      {/* Status Buttons Part 3 */}


      <View style={styles.statusRow}>

  {FILTERS.slice(1).map((status) => (

    <TouchableOpacity
      key={status}
      style={[
        styles.statusButton,

        item.status === status &&
          styles.activeStatusButton,
      ]}
      onPress={() =>
        changeStatus(
          item.id,
          status
        )
      }
    >

      <Text
        style={[
          styles.statusButtonText,

          item.status === status &&
            styles.activeStatusText,
        ]}
      >
        {status}
      </Text>

    </TouchableOpacity>

  ))}

</View>

    </View>
  )}
/>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 18,
  },

  searchInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    elevation: 3,
  },

  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    marginRight: 10,
    marginBottom: 15,
  },

  activeFilter: {
    backgroundColor: "#111827",
  },

  filterText: {
    color: "#111827",
    fontWeight: "600",
  },

  activeFilterText: {
    color: "#FFFFFF",
  },

  orderCard: {
  backgroundColor: "#FFFFFF",
  borderRadius: 18,
  padding: 18,
  marginBottom: 16,
  elevation: 4,
},

rowBetween: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

customerName: {
  fontSize: 18,
  fontWeight: "700",
  color: "#111827",
},

statusBadge: {
  backgroundColor: "#111827",
  borderRadius: 20,
  paddingHorizontal: 12,
  paddingVertical: 6,
},

statusText: {
  color: "#FFFFFF",
  fontWeight: "700",
  fontSize: 12,
},

orderId: {
  marginTop: 12,
  color: "#6B7280",
},

total: {
  marginTop: 8,
  fontSize: 20,
  fontWeight: "bold",
  color: "#16A34A",
},

items: {
  marginTop: 5,
  color: "#374151",
},

date: {
  marginTop: 5,
  color: "#9CA3AF",
},

emptyContainer: {
  marginTop: 80,
  alignItems: "center",
},

emptyText: {
  fontSize: 18,
  color: "#9CA3AF",
},

statusRow: {
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 15,
},

statusButton: {
  backgroundColor: "#E5E7EB",
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 20,
  marginRight: 8,
  marginBottom: 8,
},

activeStatusButton: {
  backgroundColor: "#111827",
},

statusButtonText: {
  color: "#111827",
  fontWeight: "600",
  fontSize: 12,
},

activeStatusText: {
  color: "#FFFFFF",
},

summaryContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 18,
},

summaryCard: {
  width: "48%",
  backgroundColor: "#FFFFFF",
  borderRadius: 18,
  padding: 20,
  alignItems: "center",
  elevation: 4,
},

summaryValue: {
  fontSize: 30,
  fontWeight: "bold",
  color: "#111827",
},

summaryTitle: {
  marginTop: 5,
  color: "#6B7280",
},

placedBadge: {
  backgroundColor: "#2563EB",
},

packedBadge: {
  backgroundColor: "#F59E0B",
},

shippedBadge: {
  backgroundColor: "#7C3AED",
},

deliveredBadge: {
  backgroundColor: "#16A34A",
},

});