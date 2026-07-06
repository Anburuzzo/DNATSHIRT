import {
  ActivityIndicator,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { db } from "../../src/config/firebase";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  doc,
  onSnapshot,
} from "firebase/firestore";

const steps = [
  "Placed",
  "Packed",
  "Shipped",
  "Out For Delivery",
  "Delivered",
];



export default function OrderTracking() {

  const { id } =
    useLocalSearchParams();

  const [currentStatus,
    setCurrentStatus] =
    useState("Placed");

  const [loading, setLoading] =
    useState(true);

  const [orderFound, setOrderFound] =
    useState(true);

  useEffect(() => {

  if (!id) {
    setOrderFound(false);
    setLoading(false);
    return;
  }

  const unsubscribe =
    onSnapshot(
      doc(
        db,
        "orders",
        id as string
      ),
      (snapshot) => {

        if (snapshot.exists()) {

          const data =
            snapshot.data();

          setCurrentStatus(
            data.status || "Placed"
          );

          setOrderFound(true);

        } else {

          setOrderFound(false);

        }

        setLoading(false);
      }
    );

  return () => unsubscribe();

}, [id]);

  const activeStepIndex =
    steps.indexOf(currentStatus) === -1
      ? 0
      : steps.indexOf(currentStatus);

  if (loading) {
    return (
      <SafeAreaView
        style={styles.centerContainer}
      >
        <ActivityIndicator
          size="large"
          color="#111827"
        />

        <Text style={styles.loadingText}>
          Loading tracking details...
        </Text>
      </SafeAreaView>
    );
  }

  if (!orderFound) {
    return (
      <SafeAreaView
        style={styles.centerContainer}
      >
        <Text style={styles.emptyTitle}>
          Order not found
        </Text>

        <Text style={styles.emptyText}>
          We could not find tracking details for this order.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Order Tracking
      </Text>

      <Text style={styles.orderId}>
        Order ID: {id}
      </Text>

      <Text style={styles.status}>
        Current Status: {currentStatus}
      </Text>

      {steps.map((step, index) => {

        const completed =
          activeStepIndex >= index;

        return (
          <View
            key={step}
            style={styles.row}
          >
            <View
              style={[
                styles.circle,
                completed &&
                  styles.activeCircle,
              ]}
            />

            <Text
              style={[
                styles.text,
                completed &&
                  styles.activeText,
              ]}
            >
              {step}
            </Text>
          </View>
        );
      })}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },

  orderId: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },

  status: {
    color: "#16A34A",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 30,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#D1D5DB",
    marginRight: 15,
  },

  activeCircle: {
    backgroundColor: "#22C55E",
  },

  text: {
    fontSize: 16,
    color: "#6B7280",
  },

  activeText: {
    color: "#111827",
    fontWeight: "700",
  },

  centerContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },

  loadingText: {
    color: "#6B7280",
    fontSize: 14,
    marginTop: 12,
  },

  emptyTitle: {
    color: "#111827",
    fontSize: 22,
    fontWeight: "bold",
  },

  emptyText: {
    color: "#6B7280",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});
