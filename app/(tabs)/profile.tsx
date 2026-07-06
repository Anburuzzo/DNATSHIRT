import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { router } from "expo-router";

import { logoutUser } from "../../src/services/authService";

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
        style={styles.button}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>
          Logout
        </Text>
      </TouchableOpacity>

<TouchableOpacity
  onPress={() => router.push("/admin/index")}
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
});