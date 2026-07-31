import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Switch,
  Alert,
  
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Settings } from "../../src/types/Settings";
import { uploadImage } from "../../src/services/cloudinary";
import {
  getSettings,
  saveSettings,
  defaultSettings,
} from "../../src/services/settingsService";

export default function SettingsScreen() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
const [uploadProgress, setUploadProgress] = useState(0);
  const CLOUD_NAME = "ues5tn61";
const UPLOAD_PRESET = "dnatshirt_upload";

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await getSettings();
      setSettings(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };


const onSave = async () => {
  try {
    setLoading(true);

   let logoUrl = settings.logo;

if (selectedLogo) {
  const uploaded = await uploadImage(
    selectedLogo,
    (progress) => {
      setUploadProgress(progress);
    }
  );

  logoUrl = uploaded.secure_url;
}

    await saveSettings({
      ...settings,
      logo: logoUrl,
    });

    setUploadProgress(0);
    setSelectedLogo(null);

    Alert.alert("Success", "Settings saved successfully");
  } catch (error: any) {
    console.error(error);
    Alert.alert("Error", error.message);
  } finally {
    setLoading(false);
  }
};

  const update = (key: keyof Settings, value: any) => {
  setSettings(prev => ({
    ...prev,
    [key]: value,
  }));
};


 const [selectedLogo, setSelectedLogo] = useState<any>(null);

const pickLogo = async () => {
  const permission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    Alert.alert(
      "Permission Required",
      "Please allow gallery access."
    );
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: false,
    quality: 0.8,
  });

  if (result.canceled) return;

  const image = result.assets[0];

  // Show preview immediately
  setSelectedLogo(image);

  // Update UI with local image
  update("logo", image.uri);
};
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Settings</Text>

      <Text style={styles.subtitle}>
        Configure your DNATSHIRT store.
      </Text>

      {/* ========================= */}
      {/* STORE INFORMATION */}
      {/* ========================= */}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          🏪 Store Information
        </Text>

        <Text style={styles.label}>
          Store Name
        </Text>

        <TextInput
          value={settings.storeName}
          onChangeText={(v) => update("storeName", v)}
          placeholder="Store Name"
          style={styles.input}
        />

        <Text style={styles.label}>
          Email
        </Text>

        <TextInput
          value={settings.storeEmail}
          onChangeText={(v) => update("storeEmail", v)}
          placeholder="Email"
          keyboardType="email-address"
          style={styles.input}
        />

        <Text style={styles.label}>
          Phone
        </Text>

        <TextInput
          value={settings.phone}
          onChangeText={(v) => update("phone", v)}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          style={styles.input}
        />

        <Text style={styles.label}>
          Address
        </Text>

        <TextInput
          value={settings.address}
          onChangeText={(v) => update("address", v)}
          placeholder="Store Address"
          multiline
          style={[styles.input, { height: 90 }]}
        />


           
<Text style={styles.label}>Store Logo</Text>

<TouchableOpacity onPress={pickLogo} activeOpacity={0.8}>
  {settings.logo ? (
    <Image
      source={{ uri: settings.logo }}
      style={styles.logo}
      resizeMode="contain"
    />
  ) : (
    <View style={styles.emptyLogo}>
      <Text style={styles.logoIcon}>📷</Text>
      <Text style={styles.logoText}>Tap to upload logo</Text>
    </View>
  )}
</TouchableOpacity>
</View>
        

      {/* ========================= */}
      {/* PAYMENT */}
      {/* ========================= */}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          💳 Payment Settings
        </Text>

        <Text style={styles.label}>
          Currency
        </Text>

        <TextInput
          value={settings.currency}
          onChangeText={(v) =>
            update("currency", v)
          }
          placeholder="AED"
          style={styles.input}
        />

        <View style={styles.switchRow}>
          <View>
            <Text style={styles.switchTitle}>
              Cash On Delivery
            </Text>

            <Text style={styles.switchSub}>
              Enable COD orders
            </Text>
          </View>

          <Switch
            value={settings.cashOnDelivery}
            onValueChange={(v) =>
              update("cashOnDelivery", v)
            }
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.switchRow}>
          <View>
            <Text style={styles.switchTitle}>
              Online Payment
            </Text>

            <Text style={styles.switchSub}>
              Stripe / Razorpay
            </Text>
          </View>

          <Switch
            value={settings.onlinePayment}
            onValueChange={(v) =>
              update("onlinePayment", v)
            }
          />
        </View>
      </View>

      {/* ========================= */}
      {/* DELIVERY */}
      {/* ========================= */}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          🚚 Delivery Settings
        </Text>

        <Text style={styles.label}>
          Shipping Charge
        </Text>

        <TextInput
          value={String(settings.shippingCharge)}
          keyboardType="numeric"
          onChangeText={(v) =>
            update(
              "shippingCharge",
              Number(v)
            )
          }
          style={styles.input}
        />

        <Text style={styles.label}>
          Free Shipping Above
        </Text>

        <TextInput
          value={String(
            settings.freeShippingAbove
          )}
          keyboardType="numeric"
          onChangeText={(v) =>
            update(
              "freeShippingAbove",
              Number(v)
            )
          }
          style={styles.input}
        />

        <Text style={styles.label}>
          Delivery Days
        </Text>

        <TextInput
          value={String(settings.deliveryDays)}
          keyboardType="numeric"
          onChangeText={(v) =>
            update(
              "deliveryDays",
              Number(v)
            )
          }
          style={styles.input}
        />
      </View>

      {/* ========================= */}
      {/* INVENTORY */}
      {/* ========================= */}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          📦 Inventory Settings
        </Text>

        <View style={styles.switchRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.switchTitle}>
              Auto Reduce Stock
            </Text>

            <Text style={styles.switchSub}>
              Reduce inventory after every order
            </Text>
          </View>

          <Switch
            value={settings.autoReduceStock}
            onValueChange={(v) =>
              update("autoReduceStock", v)
            }
          />
        </View>

        <View style={styles.divider} />

        <Text style={styles.label}>
          Low Stock Alert
        </Text>

        <TextInput
          value={String(settings.lowStockAlert)}
          keyboardType="numeric"
          style={styles.input}
          onChangeText={(v) =>
            update(
              "lowStockAlert",
              Number(v)
            )
          }
        />
      </View>

      {/* ========================= */}
      {/* NOTIFICATIONS */}
      {/* ========================= */}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          🔔 Notification Settings
        </Text>

        <View style={styles.switchRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.switchTitle}>
              Order Notifications
            </Text>

            <Text style={styles.switchSub}>
              Receive notification for every order
            </Text>
          </View>

          <Switch
            value={settings.orderNotification}
            onValueChange={(v) =>
              update(
                "orderNotification",
                v
              )
            }
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.switchRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.switchTitle}>
              Low Stock Notifications
            </Text>

            <Text style={styles.switchSub}>
              Notify when stock reaches limit
            </Text>
          </View>

          <Switch
            value={settings.lowStockNotification}
            onValueChange={(v) =>
              update(
                "lowStockNotification",
                v
              )
            }
          />
        </View>
      </View>

      {/* ========================= */}
      {/* APPEARANCE */}
      {/* ========================= */}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          🎨 Appearance
        </Text>

        <View style={styles.switchRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.switchTitle}>
              Dark Mode
            </Text>

            <Text style={styles.switchSub}>
              Enable dark appearance
            </Text>
          </View>

          <Switch
            value={settings.darkMode}
            onValueChange={(v) =>
              update("darkMode", v)
            }
          />
        </View>
      </View>

      {/* ========================= */}
      {/* ABOUT */}
      {/* ========================= */}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          ℹ️ About
        </Text>

        <View style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>
            App Version
          </Text>

          <Text style={styles.version}>
            {settings.version}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>
            Store
          </Text>

          <Text style={styles.version}>
            DNATSHIRT
          </Text>
        </View>
      </View>

      {/* ========================= */}
      {/* SAVE BUTTON */}
      {/* ========================= */}

      <TouchableOpacity
        style={styles.saveButton}
        activeOpacity={0.9}
        disabled={saving}
        onPress={onSave}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveText}>
            SAVE SETTINGS
          </Text>
        )}
      </TouchableOpacity>

      <View style={{ height: 40 }} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 18,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111",
    marginTop: 20,
  },

  subtitle: {
    fontSize: 15,
    color: "#777",
    marginTop: 6,
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 5,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    marginBottom: 8,
    marginTop: 8,
  },

  input: {
    backgroundColor: "#f7f7f7",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#111",

    borderWidth: 1,
    borderColor: "#ececec",

    marginBottom: 15,
  },

  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },

  switchTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },

  switchSub: {
    marginTop: 5,
    color: "#777",
    fontSize: 13,
  },

  divider: {
    height: 1,
    backgroundColor: "#efefef",
    marginVertical: 15,
  },

  aboutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },

  aboutLabel: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },

  version: {
    fontSize: 15,
    color: "#888",
    fontWeight: "600",
  },

  saveButton: {
    backgroundColor: "#111",
    borderRadius: 18,
    height: 60,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 10,
    marginBottom: 30,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 8,
  },

  saveText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1,
  },

  logoContainer: {
  alignItems: "center",
  marginBottom: 20,
},





uploadButton: {
  backgroundColor: "#111",
  paddingHorizontal: 20,
  paddingVertical: 12,
  borderRadius: 12,
  marginBottom: 10,
},

uploadText: {
  color: "#fff",
  fontWeight: "700",
},

removeButton: {
  backgroundColor: "#ff4444",
  paddingHorizontal: 20,
  paddingVertical: 12,
  borderRadius: 12,
},

removeText: {
  color: "#fff",
  fontWeight: "700",
},



logoPlaceholder: {
  fontSize: 10,
  color: "#777",
  fontWeight: "600",
},

logo: {
  width: 120,
  height: 120,
  borderRadius: 12,
  alignSelf: "center",
  marginVertical: 15,
  borderWidth: 1,
  borderColor: "#ddd",
},

emptyLogo: {
  width: 120,
  height: 120,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#ddd",
  borderStyle: "dashed",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  marginVertical: 15,
},

logoIcon: {
  fontSize: 36,
},

logoText: {
  marginTop: 8,
  color: "#666",
  fontSize: 14,
},
});
