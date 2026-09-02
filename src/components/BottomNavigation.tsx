import React, {
  useEffect,
  useRef,
  useContext,
} from "react";

import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Text,
} from "react-native";

import {
  router,
  usePathname,
} from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

export default function BottomNavigation() {
  const pathname = usePathname();

  const { cartCount } = useContext(CartContext);
  const { wishlistCount } = useContext(WishlistContext);

  const tabs = [
    {
      route: "/home",
      icon: "home",
      label: "Home",
      match: ["/home", "/product"],
    },
    {
      route: "/wishlist",
      icon: "heart",
      label: "Wishlist",
      match: ["/wishlist"],
    },
    {
      route: "/cart",
      icon: "cart",
      label: "Cart",
      match: ["/cart"],
    },
    {
      route: "/orders",
      icon: "receipt",
      label: "Orders",
      match: ["/orders", "/tracking"],
    },
    {
      route: "/profile",
      icon: "person",
      label: "Profile",
      match: ["/profile", "/address", "/notification"],
    },
  ];

  return (
    <View style={styles.outerWrapper}>

      {/* ONE OUTER BORDER */}
      {/* <AnimatedBorder />*/}

      {/* WHITE BAR */}
      <View style={styles.bar}>

        {tabs.map((tab) => {
          const isActive = tab.match.some((route) =>
            pathname.startsWith(route)
          );

          return (
            <TabButton
              key={tab.route}
              tab={tab}
              isActive={isActive}
              cartCount={cartCount}
              wishlistCount={wishlistCount}
            />
          );
        })}

      </View>
    </View>
  );
}

/* =====================================================
   OUTER ANIMATED BORDER
   ===================================================== */

// function AnimatedBorder() {
//   const rotation = useRef(
//     new Animated.Value(0)
//   ).current;

//   useEffect(() => {
//     Animated.loop(
//       Animated.timing(rotation, {
//         toValue: 1,
//         duration: 4000,
//         useNativeDriver: true,
//       })
//     ).start();
//   }, []);

//   const rotate = rotation.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["0deg", "360deg"],
//   });

//   return (
//     <Animated.View
//       pointerEvents="none"
//       style={[
//         styles.gradientBorder,
//         {
//           transform: [{ rotate }],
//         },
//       ]}
//     >
//       <View style={styles.borderInner} />
//     </Animated.View>
//   );
// }

/* =====================================================
   TAB BUTTON
   ===================================================== */

function TabButton({
  tab,
  isActive,
  cartCount,
  wishlistCount,
}: {
  tab: {
    route: string;
    icon: string;
    label: string;
    match: string[];
  };

  isActive: boolean;

  cartCount: number;

  wishlistCount: number;
}) {
  const scale = useRef(
    new Animated.Value(1)
  ).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: isActive ? 1.05 : 1,
      friction: 6,
      tension: 100,
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.92,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: isActive ? 1.05 : 1,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start();

    router.push(tab.route as any);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={styles.touchable}
    >
      <Animated.View
        style={[
          styles.tabButton,
          isActive && styles.activeTab,
          {
            transform: [{ scale }],
          },
        ]}
      >

        <View style={styles.iconContainer}>

          <Ionicons
            name={tab.icon as any}
            size={24}
            color={
              isActive
                ? "#FFFFFF"
                : "#6B7280"
            }
          />

          {/* WISHLIST BADGE */}

          {tab.route === "/wishlist" &&
            wishlistCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {wishlistCount > 99
                    ? "99+"
                    : wishlistCount}
                </Text>
              </View>
            )}

          {/* CART BADGE */}

          {tab.route === "/cart" &&
            cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {cartCount > 99
                    ? "99+"
                    : cartCount}
                </Text>
              </View>
            )}

        </View>

        <Text
          style={[
            styles.label,
            isActive && styles.activeLabel,
          ]}
        >
          {tab.label}
        </Text>

      </Animated.View>
    </TouchableOpacity>
  );
}

/* =====================================================
   STYLES
   ===================================================== */

const styles = StyleSheet.create({

  /* ONE OUTER CONTAINER */

  outerWrapper: {
    position: "absolute",

    left: 15,
    right: 15,
    bottom: 15,

    height: 68,

    borderRadius: 22,

    zIndex: 999,

    elevation: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,

    overflow: "hidden",
  },

  /* GRADIENT BORDER */

  gradientBorder: {
    position: "absolute",

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    borderRadius: 22,

    borderWidth: 2,

    borderColor: "#FF4D8D",

    zIndex: 1,
  },

  /* HIDES BORDER INSIDE */

  borderInner: {
    position: "absolute",

    top: 2,
    left: 2,
    right: 2,
    bottom: 2,

    borderRadius: 20,

    backgroundColor: "#FFFFFF",
  },

  /* WHITE BAR */

  bar: {
    position: "absolute",

    top: 2,
    left: 2,
    right: 2,
    bottom: 2,

    borderRadius: 20,

    backgroundColor: "#FFFFFF",

    flexDirection: "row",

    justifyContent: "space-around",

    alignItems: "center",

    zIndex: 2,
  },

  touchable: {
    alignItems: "center",
    justifyContent: "center",
  },

  tabButton: {
    width: 58,
    height: 58,

    borderRadius: 16,

    justifyContent: "center",
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#111827",
  },

  iconContainer: {
    position: "relative",

    width: 26,
    height: 26,

    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    marginTop: 2,

    fontSize: 9,

    fontWeight: "500",

    color: "#6B7280",
  },

  activeLabel: {
    color: "#FFFFFF",

    fontWeight: "700",
  },

  badge: {
    position: "absolute",

    right: -9,
    top: -9,

    minWidth: 18,
    height: 18,

    paddingHorizontal: 4,

    borderRadius: 10,

    backgroundColor: "#EF4444",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  badgeText: {
    color: "#FFFFFF",

    fontSize: 9,

    fontWeight: "800",
  },
});