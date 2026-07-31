import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { router } from "expo-router";

import { logoutUser } from "../../src/services/authService";
import { uploadImage } from "../../src/services/cloudinary";
export default function Profile() {

  const handleLogout = async () => {
    try {
      await logoutUser();

      router.replace("/(auth)/login");

    } catch (error: any) {
      Alert.alert(
        "Error",
        error.message
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Profile Screen
      </Text>


      <TouchableOpacity
  style={styles.menuItem}
  onPress={() => router.push("/admin")}
>
  <Text style={styles.menuIcon}>👨‍💼</Text>

  <View style={styles.menuContent}>
    <Text style={styles.menuTitle}>
      Admin Panel
    </Text>

    <Text style={styles.menuSubtitle}>
      Manage your store
    </Text>
  </View>

  <Text style={styles.arrow}>›</Text>
</TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>
          Logout
        </Text>
      </TouchableOpacity>

<TouchableOpacity
  onPress={() => router.push("/admin/manage-products")}
>
  <Text>
    Admin Panel 👨‍💼
  </Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#111827",
    padding: 15,
    borderRadius: 10,
    width: 200,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  menuItem: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  padding: 16,
  borderRadius: 16,
  marginBottom: 12,

  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.08,
  shadowRadius: 6,
  elevation: 3,
},

menuIcon: {
  fontSize: 24,
},

menuContent: {
  flex: 1,
  marginLeft: 15,
},

menuTitle: {
  fontSize: 16,
  fontWeight: "700",
  color: "#111827",
},

menuSubtitle: {
  fontSize: 13,
  color: "#6B7280",
  marginTop: 2,
},

arrow: {
  fontSize: 24,
  color: "#9CA3AF",
},
});