import { Tabs } from "expo-router";
import BottomNavigation from "../../src/components/BottomNavigation";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "none",
        },
      }}
      tabBar={() => <BottomNavigation />}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}