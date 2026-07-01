import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

const notifications = [
  {
    id: "1",
    title: "Order Placed",
    message:
      "Your order has been placed successfully.",
  },
  {
    id: "2",
    title: "New Offer",
    message:
      "Flat 20% OFF on Hoodies 🔥",
  },
];

export default function NotificationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Notifications 🔔
      </Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>
              {item.title}
            </Text>

            <Text style={styles.message}>
              {item.message}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    padding: 16,
  },

  header: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  message: {
    marginTop: 6,
    color: "#6B7280",
  },
});