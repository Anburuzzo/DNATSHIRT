import React from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";


export default function AdminHome() {
  return (

    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#F9FAFB" }}
      edges={["bottom"]}
    >
    <ScrollView
    style={styles.container}
    contentContainerStyle={{
      paddingBottom: 100,
      paddingTop: 20,
    }}
    showsVerticalScrollIndicator={false}
  >
      <Text style={styles.greeting}>
        👋 Welcome Back
      </Text>

      <Text style={styles.title}>
        DNATSHIRT Admin
      </Text>

      <Text style={styles.subtitle}>
        Manage your business efficiently
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statsCard}>
          <Text style={styles.statsIcon}>📦</Text>

          <Text style={styles.statsValue}>25</Text>

          <Text style={styles.statsTitle}>
            Products
          </Text>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsIcon}>🛒</Text>

          <Text style={styles.statsValue}>8</Text>

          <Text style={styles.statsTitle}>
            Orders
          </Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsCard}>
          <Text style={styles.statsIcon}>💰</Text>

          <Text style={styles.statsValue}>
            ₹12.5K
          </Text>

          <Text style={styles.statsTitle}>
            Revenue
          </Text>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsIcon}>⚠️</Text>

          <Text style={styles.statsValue}>3</Text>

          <Text style={styles.statsTitle}>
            Low Stock
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Quick Actions
      </Text>

      <TouchableOpacity
        style={styles.actionCard}
        onPress={() =>
          router.push("/admin/manage-products")
        }
      >
        <Text style={styles.actionIcon}>📦</Text>

        <View style={styles.actionContent}>
          <Text style={styles.actionTitle}>
            Manage Products
          </Text>

          <Text style={styles.actionSubtitle}>
            Add, Edit & Delete Products
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionCard}
        onPress={() =>
          router.push("/admin/orders")
        }
      >
        <Text style={styles.actionIcon}>🛒</Text>

        <View style={styles.actionContent}>
          <Text style={styles.actionTitle}>
            Orders
          </Text>

          <Text style={styles.actionSubtitle}>
            Manage Customer Orders
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionCard}
        onPress={() =>
          router.push("/admin/analytics")
        }
      >
        <Text style={styles.actionIcon}>📈</Text>

        <View style={styles.actionContent}>
          <Text style={styles.actionTitle}>
            Analytics
          </Text>

          <Text style={styles.actionSubtitle}>
            Sales Reports
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionCard}
        onPress={() =>
          router.push("/admin/settings")
        }
      >
        <Text style={styles.actionIcon}>⚙️</Text>

        <View style={styles.actionContent}>
          <Text style={styles.actionTitle}>
            Settings
          </Text>

          <Text style={styles.actionSubtitle}>
            Store Settings
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
   paddingHorizontal: 16,
  },

  greeting: {
    fontSize: 18,
    color: "#6B7280",
    marginTop: 15,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 5,
  },

  subtitle: {
    fontSize: 15,
    color: "#9CA3AF",
    marginTop: 5,
    marginBottom: 25,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  statsCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    elevation: 4,
  },

  statsIcon: {
    fontSize: 30,
  },

  statsValue: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 8,
    color: "#111827",
  },

  statsTitle: {
    marginTop: 5,
    color: "#6B7280",
    fontSize: 14,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginVertical: 20,
  },

  actionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    elevation: 4,
  },

  actionIcon: {
    fontSize: 30,
  },

  actionContent: {
    flex: 1,
    marginLeft: 15,
  },

  actionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  actionSubtitle: {
    color: "#6B7280",
    marginTop: 3,
  },

  arrow: {
    fontSize: 28,
    color: "#9CA3AF",
  },
});