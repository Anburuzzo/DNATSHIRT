import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { router, usePathname } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function BottomNavigation() {
  const pathname = usePathname();

  const tabs = [
  {
    route: "/home",
    icon: "home",
    match: ["/home", "/product"],
  },
  {
    route: "/wishlist",
    icon: "heart",
    match: ["/wishlist"],
  },
  {
    route: "/cart",
    icon: "cart",
    match: ["/cart"],
  },
  {
    route: "/orders",
    icon: "receipt",
    match: ["/orders", "/tracking"],
  },
  {
    route: "/profile",
    icon: "person",
    match: ["/profile", "/address", "/notification"],
  },
];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.route}
          onPress={() => router.push(tab.route as any)}
        >
          <Ionicons
            name={tab.icon as any}
            size={26}
            color={
  tab.match.some((route) => pathname.startsWith(route))
    ? "#111827"
    : "gray"
}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     height: 70,
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     borderTopWidth: 1,
//     borderColor: "#ddd",
//     backgroundColor: "#fff",
//   },
// });


const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    height: 70,
    backgroundColor: "#fff",

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    borderTopWidth: 1,
    borderColor: "#ddd",

    elevation: 10,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});